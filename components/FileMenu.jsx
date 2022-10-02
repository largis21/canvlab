import Dropdown from "./Dropdown";
import Resizer from "./Resizer";

import { useState } from "react";
import NewFolderDialog from "./NewFolderDialog";

export default function FileMenu( props ) {
  const userFiles = props.dataManager.userFiles
  
  return (  
    <div className="file-menu">
      <Resizer minWidth="145"/>
      <div className="file-menu-top">
        {
          userFiles.map((folder, index) => {
            return <Dropdown key={index} options={
              {
                title: folder["folderName"], 
                items: folder["files"]
              }
              } />
          })
        }
      </div>
      <div className="file-menu-bottom">
        <NewFolderButton />
      </div>
    </div>
  )
}

function NewFolderButton() {
  const [dialogActive, setDialogActive] = useState(false)

  function newFolderClicked() {
    if (!dialogActive) {
      setDialogActive(true)
    }
  }

  return(
    <>
      <div className="new-folder" onClick={newFolderClicked}>
        <img src="icon-plus.svg" alt="" />
        <h4>New Folder</h4>
      </div>
      {dialogActive ? 
        <NewFolderDialog />
      : ""}
    </>
  )
}