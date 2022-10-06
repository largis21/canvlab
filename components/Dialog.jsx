import { useContext, useEffect, useState } from "react"
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { DialogCtxt } from "../lib/contexts/dialogContext"
import { clone } from "../lib/clone"

export default function Dialog( props ) {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)
  const { dialogState, setDialogState, 
          fileToDelete, setFileToDelete,
          folderToDelete, setFolderToDelete } = useContext(DialogCtxt)

  const [errorMsg, setErrorMsg] = useState("")
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    if (dialogState == 0) {
      try {
        document.removeEventListener("keydown", keyDown)
      } catch {}
    } else (
      document.addEventListener("keydown", keyDown)
    )
  }, [dialogState])

  function keyDown(e) {
    if (e.key == "Escape") {
      closeDialog()
    }
  }

  function closeDialog() {
    setDialogState(0)
    setErrorMsg("")
    setInputText("")
    setFileToDelete("")
    setFolderToDelete("")
  }

  function validateNewFolder(newFolderName) {

    var foundFileWithName = false 
    dataManager.userFiles.forEach((folder) => {
        if (folder.folderName == newFolderName) foundFileWithName = true
    })

    if (!foundFileWithName) {
      const dataManagerTemp = clone(dataManager)

      dataManagerTemp.userFiles.push(
        {
          folderName: newFolderName,
          files: []
        }
      )

      setDataManager(dataManagerTemp)
      closeDialog()
      return
    } else {
      setErrorMsg("Already a folder with that name")
    }
  }

  function deleteFile(fileToDelete) {
    const dataManagerTemp = clone(dataManager)

    dataManagerTemp.userFiles.forEach((folder, folderIndex) => {
      folder.files.forEach((file, fileIndex) => {
        if (file.name == fileToDelete) {
          dataManagerTemp.userFiles[folderIndex].files.splice(fileIndex, 1)
        }
      })
    })

    setDataManager(dataManagerTemp)
    closeDialog()
  }

  function deleteFolder(folderToDelete) {
    const dataManagerTemp = clone(dataManager)

    dataManagerTemp.userFiles.forEach((folder, folderIndex) => {
      if (folder.folderName == folderToDelete) {
        dataManagerTemp.userFiles.splice(folderIndex, 1)
      }
    })

    setDataManager(dataManagerTemp)
    closeDialog()
  }

  const dialogType1 = 
  <div className="dialog-card">
    <div className="dialog-top">
      <h3 className="dialog-title">Create New Folder</h3>
      <div className="dialog-body">
        <input 
          placeholder="Folder Name" 
          type="text" 
          id="new_folder_input"
          autoFocus
          value={inputText} 
          onChange={event => { 
            setInputText(event.target.value); setErrorMsg("") 
          }} 
          onKeyDown={event => {
            if (event.key === "Enter") validateNewFolder(inputText)
            if (event.key === "Escape") closeDialog()
          }}
        />
        <p id="dialog-error-text">{errorMsg}</p>
      </div>
    </div>
    <div className="dialog-footer"> 
      <button onClick={closeDialog}>
        Close
      </button> 
      <button 
        id="new-folder-button" 
        className="dialog-button-highlight" 
        onClick={() => validateNewFolder(inputText)}
      >
        New Folder
      </button> 
    </div>
  </div>

  const dialogType2 = 
  <div className="dialog-card">
    <div className="dialog-top">
      <h3 className="dialog-title">Do you want to delete this file?</h3>
      <div className="dialog-body">
        <p id="dialog-error-text">This action cannot be undone</p>
      </div>
    </div>
    <div className="dialog-footer"> 
      <button 
        className="dialog-button-highlight" 
        onClick={closeDialog}
        autoFocus
      >
        Close
      </button> 
      <button 
        id="new-folder-button" 
        className="dialog-button-red" 
        onClick={() => deleteFile(fileToDelete)}
      >
        Delete File
      </button> 
    </div>
  </div>

  const dialogType3 = 
  <div className="dialog-card">
    <div className="dialog-top">
      <h3 className="dialog-title">Do you want to delete this folder?</h3>
      <div className="dialog-body">
        <p id="dialog-error-text">This action cannot be undone</p>
      </div>
    </div>
    <div className="dialog-footer"> 
      <button 
        className="dialog-button-highlight" 
        onClick={closeDialog}
        autoFocus
      >
        Close
      </button> 
      <button 
        id="new-folder-button" 
        className="dialog-button-red" 
        onClick={() => deleteFolder(folderToDelete)}
      >
        Delete Folder
      </button> 
    </div>
  </div>

  return (
    <>
      {
        dialogState ?
        <div className="dialog">
          {
            dialogState == 1 ? 
              dialogType1
            : dialogState == 2 ?
              dialogType2
            : dialogState == 3 ?
              dialogType3
            :
            ""
          }
        </div>
        :
        ""
      }
    </>
  )
}
