import Resizer from "../../components/Resizer"
import CodeConsole from "../../components/CodeConsole"
import CodeOutput from "../../components/CodeOutput"

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
  return (
    <div className="main-content">
      <div className="editor-page-col">
        <Resizer minWidth="185"/>
        <FileMenu />
      </div>
      <div className="editor-page-col">
        <Resizer minWidth="145"/>
        <CodeEditor />
      </div>
      <div className="editor-page-col">
        <CodeOutput />
        <CodeConsole />
      </div>
    </div>
  )
}