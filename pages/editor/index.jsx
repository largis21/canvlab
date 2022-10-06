import dynamic from "next/dynamic"
const EditorPage = dynamic(() => 
  import("./EditorPage"), { ssr: false }
)

import { createContext, useState, useEffect } from "react"
import { DataManagerCtxt } from "../../lib/contexts/dataManagerContext"

import { DialogCtxt } from "../../lib/contexts/dialogContext"
import Dialog from "../../components/Dialog"

import { ConsoleCtxt } from "../../lib/contexts/consoleCtxt"

export default function Home() {
  const [dataManager, setDataManager] = useState("")
  const dataManagerVal = { dataManager, setDataManager }

  const [dialogState, setDialogState] = useState(0)
  const [fileToDelete, setFileToDelete] = useState("")
  const [folderToDelete, setFolderToDelete] = useState("")
  const dialogStateVal = {  dialogState, setDialogState, 
                            fileToDelete, setFileToDelete, 
                            folderToDelete, setFolderToDelete 
  }

  const [consoleText, setConsoleText] = useState("")
  const consoleTextVal = { consoleText, setConsoleText }
  
  return (
    <DataManagerCtxt.Provider value={dataManagerVal}>
      <DialogCtxt.Provider value={dialogStateVal}>
        <ConsoleCtxt.Provider value={consoleTextVal}>

        <Dialog />
        <EditorPage />

        </ConsoleCtxt.Provider>
      </DialogCtxt.Provider>
    </DataManagerCtxt.Provider>
  )
}
