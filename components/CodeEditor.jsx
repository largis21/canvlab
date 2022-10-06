import Resizer from "./Resizer"
import { runCode, editorChange } from "../lib/main"
import { useState, useEffect, useContext } from "react"
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { clone } from "../lib/clone"

import AceEditor from "react-ace"

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import { edit } from "ace-builds"

export default function CodeEditor( props ) {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  const [editorTheme, setEditorTheme] = useState(dataManager ? dataManager.preferences.editorTheme : "monokai")
  const [editorLanguage, setEditorLanguage] = useState(dataManager ? dataManager.preferences.editorLanguage : "javascript")
  const [editorCode, setEditorCode] = useState(null)
  const [fileName, setFileName] = useState(null)

  const [fileIsSaved, setFileIsSaved] = useState(true)

  useEffect(() => {
    if (dataManager) {
      setEditorTheme(dataManager.preferences.editorTheme)
      setFileIsSaved(true)

      dataManager.userFiles.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.isCurrentFile) {
            setEditorCode(file.content)
            setEditorLanguage(file.fileLanguage)
            setFileName(file.name)
          }
        })
      })
    }
  }, [dataManager])
  
  function runCodeClicked(editorCode, editorLanguage) {
    runCode(editorCode, editorLanguage)

    const dataManagerTemp = dataManager
    dataManagerTemp.userFiles.forEach((folder) => {
      folder.files.forEach((file) => {
        if (file.isCurrentFile) {
          file.content = editorCode
        }
      })
    })
    dataManagerTemp.fileIsSaved = true
    setDataManager(dataManagerTemp)
    setFileIsSaved(true)
  }

  function onEditorChange(currentCode) {
    setEditorCode(currentCode)
    setFileIsSaved(false)
  }
  
  return (
    <div className="editor-root resize-right">
      <Resizer minWidth="200"/>
      <div className="editor-head">
        <div className="file-title">
          <h4>{fileName}{fileIsSaved ? "" : "*"}</h4>
        </div>
        <ul>
          <li>
              <img onClick={() => {runCodeClicked(editorCode, editorLanguage)}} src="/icon-run.svg"/>
          </li>
        </ul>
      </div>

      <AceEditor
        mode={editorLanguage} 
        theme={editorTheme}
        onChange={currentCode => onEditorChange(currentCode)}
        name="editor-main"
        value={editorCode}
        setOptions={{ 
          useWorker: false,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
          showPrintMargin: false,
          enableAutoIndent: true,

        }}
      />
    </div>
  )
}