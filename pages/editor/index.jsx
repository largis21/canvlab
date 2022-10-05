import dynamic from "next/dynamic"
const EditorPage = dynamic(() => 
  import("./EditorPage"), { ssr: false }
)

import { createContext, useState, useEffect } from "react"
import { DataManagerCtxt } from "../../lib/contexts/dataManagerContext"

import { DialogCtxt } from "../../lib/contexts/dialogContext"
import Dialog from "../../components/Dialog"

export default function Home() {
  const [dataManager, setDataManager] = useState("")
  const dataManagerVal = { dataManager, setDataManager }

  const [dialogState, setDialogState] = useState({dialogIsActive: false, type: 1})
  const dialogStateVal = { dialogState, setDialogState }

  return (
    <DataManagerCtxt.Provider value={dataManagerVal}>
      <DialogCtxt.Provider value={dialogStateVal}>
        <Dialog />

        <EditorPage />

      </DialogCtxt.Provider>
    </DataManagerCtxt.Provider>
  )
}
