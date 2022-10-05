import Dropdown from "./Dropdown";
import Resizer from "./Resizer";

import { useContext, useEffect, useState } from "react";
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext";
import { DialogCtxt } from "../lib/contexts/dialogContext";

export default function FileMenu() {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  var userFiles = dataManager.userFiles
  
  return (
    <div className="file-menu">
      <Resizer minWidth="145"/>
      <div className="file-menu-top">
        {
          userFiles.map((folder, index) => 
            <Dropdown key={index} options=
            {{
              title: folder["folderName"], 
              items: folder["files"]
            }}/>)
        }
      </div>
      <div className="file-menu-bottom">
        <NewFolderButton />
      </div>
    </div>
  )
}

function NewFolderButton() {
  const { dialogState, setDialogState } = useContext(DialogCtxt)

  function newFolderDialog() {
    setDialogState({
      dialogType: 1
    })
  }

  return(
    <div className="new-folder" onClick={() => newFolderDialog()}>
      <img src="icon-plus.svg" alt="" />
      <h4>New Folder</h4>
    </div>
  )
}