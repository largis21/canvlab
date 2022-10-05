import { useContext, useEffect, useState } from "react"
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { DialogCtxt } from "../lib/contexts/dialogContext"

export default function Dialog( props ) {
  const { dialogState, setDialogState } = useContext(DialogCtxt)
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  const [errorMsg, setErrorMsg] = useState("")
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    if (dialogState.dialogType) {
      document.addEventListener("keydown", handleKeydown)
      document.getElementById("new_folder_input").focus()
    } else {
      try {
        document.removeEventListener("keydown", handleKeydown)
      } catch {}
    }
  }, [dialogState])

  function closeDialog() {
    setDialogState({
      dialogType: 0
    })
  }

  function handleKeydown( event ) {
    //console.log(event.keyCode)
    if (event.keyCode == 27) {
      //ESCAPE
      closeDialog()
    } else if (event.keyCode == 13) {
      //ENTER
      validateNewFolder(inputText)
    }
  }

  useEffect(() => {
    console.log(inputText)
  }, [inputText])

  function validateNewFolder(newFolderName) {
    var foundFileWithName = false 
    dataManager.userFiles.forEach((folder) => {
        if (folder.folderName == newFolderName) foundFileWithName = true
    })
    console.log(foundFileWithName, newFolderName)
  }

  const dialogType1 = 
  <div className="dialog-card">
    <div className="dialog-top">
      <h3 className="dialog-title">Create New Folder</h3>
      <div className="dialog-body">
        <input value={inputText} onChange={event => setInputText(event.target.value)} placeholder="Folder Name" type="text" id="new_folder_input"/>
        <p id="dialog-error-text">{errorMsg}</p>
      </div>
    </div>
    <div className="dialog-footer"> 
      <button onClick={closeDialog}>
        Close
      </button> 
      <button className="dialog-button-highlight" onClick={validateNewFolder}>
        New Folder
      </button> 
    </div>
  </div>

  return (
    <>
      {
        dialogState.dialogType ?
        <div className="dialog">
          {
            dialogState.dialogType == 1 ? 
            dialogType1
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