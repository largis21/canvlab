/* DROPDOWN dropdownOptions EXAMPLE
const dropdownOptions = {
  title: "Hei",
  items: 
  [{
    name: "index.js",
    type: "document",
    location: ""
  },
  {
    name: "indexnr2.js",
    type: "document",
    location: ""
  },
  {
    name: "indexnr3.js",
    type: "document",
    location: ""
  },
  {
    name: "indexnr4.js",
    type: "document",
    location: ""
  }
]}
*/
import { useState, useEffect, useContext, useRef } from "react"
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { EditFileNameCtxt } from "./FileMenu"
import { DialogCtxt } from "../lib/contexts/dialogContext"
import { clone } from "../lib/clone"

export default function Dropdown( props ) {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)
  const { editFileName, setEditFileName, newFileNameText, setNewFileNameText } = useContext(EditFileNameCtxt)
  const { dialogState, setDialogState, 
          fileToDelete, setFileToDelete,
          folderToDelete, setFolderToDelete } = useContext(DialogCtxt)
  
  const [isActive, setIsActive] = useState(true)
  const [activeFile, setActiveFile] = useState("")
  
  const dropdownOptions = props.options

  //used for highlighting current file
  useEffect(() => {
    dataManager.userFiles.forEach((folder) => {
      folder.files.forEach((file) => {
        if (file.isCurrentFile) setActiveFile(file.name)
      })
    })
  },[dataManager])


  function dropdownHeadClicked(event) {
    if (isActive) setIsActive(false)
    if (!isActive) setIsActive(true)
  }

  function fileClicked(fileName) {
    const dataManagerTemp = clone(dataManager)

    dataManagerTemp.userFiles.forEach((folder) => {
      folder.files.forEach((file) => {
        if (file.isCurrentFile) file.isCurrentFile = false
      })
    })

    dataManagerTemp.userFiles.forEach((folder) => {
      folder.files.forEach((file) => {
        if (file.name == fileName) file.isCurrentFile = true
      })
    })

    setDataManager(dataManagerTemp)
  }

  function fileDoubleClicked(fileName) {
    setNewFileNameText("")
    setEditFileName(fileName)
    const elem = document.getElementById("edit-filename-input")
  }

  function setNewFileName(oldFileName, newFileName) {
    var foundName = false;

    dataManager.userFiles.forEach((folder) => {
      folder.files.forEach((file) => {
        if (file.name == newFileName) foundName = true 
      })
    })

    if (!foundName) {
      const dataManagerTemp = clone(dataManager)
  
      dataManagerTemp.userFiles.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.name == oldFileName) file.name = newFileName
        })
      })
  
      setDataManager(dataManagerTemp)
    }
  }

  function makeNewFile(newFileLoc) {
    setNewFileNameText(null)
    setEditFileName(null)

    const dataManagerTemp = clone(dataManager)

    function checkName(name) {
      var foundName = false
      dataManager.userFiles.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.name == name) foundName = true 
        })
      })
      return foundName
    }

    var newName = "new_file"
    var i = 0
    while (checkName(newName) == true) {
      if (newName == "new_file") newName = "new_file("+0+")"
      newName = "new_file("+i+")"
      i++
    }

    dataManagerTemp.userFiles.forEach((folder) => {
      if (folder.folderName == newFileLoc) {
        folder.files.push(
          {
            name: newName,
            content: "",
            fileLanguage: dataManager.preferences.language,
            isCurrentFile: false
          }
        )
      }
    })

    setDataManager(dataManagerTemp)
  }

  function deleteFile(fileName) {
    setFileToDelete(fileName)
    setDialogState(2) 
  }

  function deleteFolder(folderName) {
    setFolderToDelete(folderName)
    setDialogState(3) 
  }

  return (
    <div className="dropdown">
      <div className={isActive ? "dropdown-head dropdown-active" : "dropdown-head"}>
        <div onClick={dropdownHeadClicked} className="dropdown-head-left">
          <span>
            <img 
              className={isActive ? "dropdown-icon dropdown-active-icon " : "dropdown-icon "} 
              src="/icon-dropdown.svg" 
            />
          </span>
          <h4>{dropdownOptions.title}</h4>
        </div>
        <span 
          className="filemenu-right-icon" 
          onClick={() => makeNewFile(dropdownOptions.title)}
        >
          <img 
            src="/icon-new-file.svg" 
          />
        </span>
        <span 
          className="filemenu-right-icon" 
          onClick={() => deleteFolder(dropdownOptions.title)}
        >
          <img 
            src="/icon-close.svg"
            style={{height: "50%"}}
          />
        </span>
      </div>
      <ul className={isActive ? "dropdown-list-active dropdown-list" : "dropdown-list "}>  
        {
          dropdownOptions.items.map((item, index) => 
            <li 
              key={index} 
              className={item.name == activeFile ? "dropdown-item active-file" : "dropdown-item"}
              
              onDoubleClick={() => {
                fileDoubleClicked(item.name)
              }}
              onBlur={() => {
                setNewFileNameText("")
                setEditFileName("")
              }}
            >
              <div className="dropdown-item-left" onClick={() => {fileClicked(item.name)}}>
                <img className="dropdown-file-icon" src={`/icon-${item.fileLanguage}.svg`}/>

                {
                  (editFileName == item.name) ?
                    <input 
                      autoFocus 
                      id="edit-filename-input" 
                      value={newFileNameText} 
                      onChange={
                        (e) => setNewFileNameText(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if(e.key === "Enter") {
                          setNewFileName(item.name, newFileNameText)
                        }
                      }}
                      autoComplete="off"
                    />
                  :
                    <h4>{item.name}</h4>
                }
              </div>
              <span 
                className="filemenu-right-icon" 
                onClick={() => 
                  deleteFile(item.name)
                }
              >
                <img 
                  src="/icon-close.svg"
                  style={{height: "50%"}}
                />
              </span>
            </li>
          )
        }
      </ul>
    </div>
  )
}