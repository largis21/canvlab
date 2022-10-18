import dynamic from "next/dynamic"
const EditorPage = dynamic(() => 
  import("./EditorPage"), { ssr: false }
)

import { createContext, useState, useEffect } from "react"

import { DialogCtxt } from "../../lib/contexts/dialogContext"
import Dialog from "../../components/Dialog"

import { ConsoleCtxt } from "../../lib/contexts/consoleCtxt"
import { OutputCtxt } from "../../lib/contexts/outputCtxt"

export default function Home() {
  const [dialogState, setDialogState] = useState(0)
  const [fileToDelete, setFileToDelete] = useState("")
  const [folderToDelete, setFolderToDelete] = useState("")
  const dialogStateVal = {  dialogState, setDialogState, 
                            fileToDelete, setFileToDelete, 
                            folderToDelete, setFolderToDelete 
  }

  const [consoleText, setConsoleText] = useState("")
  const consoleTextVal = { consoleText, setConsoleText }

  const [codeOutput, setCodeOutput] = useState("")
  const codeOutputVal = { codeOutput, setCodeOutput }
  
  return (
    <DialogCtxt.Provider value={dialogStateVal}>
      <ConsoleCtxt.Provider value={consoleTextVal}>
        <OutputCtxt.Provider value={codeOutputVal}>

          <Dialog />
          <EditorPage />

        </OutputCtxt.Provider>
      </ConsoleCtxt.Provider>
    </DialogCtxt.Provider>
  )
}
