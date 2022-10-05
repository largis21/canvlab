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
import { clone } from "../lib/clone"

export default function Dropdown( props ) {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)
  
  const [isActive, setIsActive] = useState(true)

  const [activeFile, setActiveFile] = useState("")

  useEffect(() => {
    dataManager.userFiles.forEach((folder) => {
      folder.files.forEach((file) => {
        if (file.isCurrentFile) setActiveFile(file.name)
      })
    })
  },[dataManager])

  const dropdownOptions = props.options

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

  return (
    <div className="dropdown">
      <div onClick={dropdownHeadClicked} className={isActive ? "dropdown-head dropdown-active" : "dropdown-head"}>
        <span>
          <img 
            className={isActive ? "dropdown-icon dropdown-active-icon " : "dropdown-icon "} 
            src="/icon-dropdown.svg" 
          />
        </span>
        <h4>{dropdownOptions.title}</h4>
      </div>
      <ul className={isActive ? "dropdown-list-active dropdown-list" : "dropdown-list "}>  
        {
          dropdownOptions.items.map((item, index) => 
            <li 
            key={index} 
            className={item.name == activeFile ? "dropdown-item active-file" : "dropdown-item"}
            onClick={() => {
              fileClicked(item.name)
            }}>
              <img src={`/icon-${item.fileLanguage}.svg`}/>

              <h4>{item.name}</h4>
            </li>
          )
        }
      </ul>
    </div>
  )
}