import CodeConsole from "../../components/CodeConsole"
import dynamic from "next/dynamic"
import { useContext, useEffect, useState } from "react"

import { DataManagerCtxt } from "../../lib/contexts/dataManagerContext"
import { defaultDataManager } from "../../lib/main"

const CodeEditor = dynamic(
  () => import("../../components/CodeEditor"),
  { ssr: false }
)

const FileMenu = dynamic(
  () => import("../../components/FileMenu"),
  { ssr: false }
)

export default function EditorPage( props ) {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  //Retrieve the datamanager from browser, will also generate a new one if none exists
  useEffect(() => {
    console.log("getting user data from browser")

    function getUserData() {
      if(!localStorage.getItem("dataManager")) localStorage.setItem("dataManager", JSON.stringify(defaultDataManager));
      setDataManager(JSON.parse(localStorage.getItem("dataManager")))
    }
    getUserData()
  }, [])

  //Always keep localstorage updated
  useEffect(() => {
    if (dataManager) localStorage.setItem("dataManager", JSON.stringify(dataManager))
  }, [dataManager])

  return (
    <div className="main-content">
      <FileMenu />
      <CodeEditor />
      <CodeConsole />
    </div>
  )
}