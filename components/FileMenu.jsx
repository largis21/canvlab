import Dropdown from "./Dropdown";
import Resizer from "./Resizer";

import { createContext, useContext, useEffect, useState } from "react";
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext";
import { DialogCtxt } from "../lib/contexts/dialogContext";

export const EditFileNameCtxt = createContext( "", () => {} );

export default function FileMenu() {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  const [editFileName, setEditFileName] = useState("")
  const [newFileNameText, setNewFileNameText] = useState("")
  const editFileNameValue = { editFileName, setEditFileName, newFileNameText, setNewFileNameText }

  var userFiles = dataManager.userFiles
  
  return (
    <EditFileNameCtxt.Provider value={editFileNameValue} >
      <div className="file-menu">
        <Resizer minWidth="145"/>
        <div className="file-menu-top">
          {
            userFiles ? userFiles.map((folder, index) => 
              <Dropdown key={index} options=
                {{
                  title: folder["folderName"], 
                  items: folder["files"]
                }}
              />)
              :
              ""
          }
        </div>
        <div className="file-menu-bottom">
          <NewFolderButton />
        </div>
      </div>
    </EditFileNameCtxt.Provider>
  )
}

function NewFolderButton() {
  const { dialogState, setDialogState } = useContext(DialogCtxt)

  function newFolderDialog() {
    setDialogState(1)
  }

  return(
    <div className="new-folder" onClick={() => newFolderDialog()}>
      <img src="icon-plus.svg" alt="" />
      <h4>New Folder</h4>
    </div>
  )
}