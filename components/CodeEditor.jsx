import Resizer from "./Resizer"
import { runCode, editorChange } from "../lib/main"
import { useState, useEffect } from "react"

import AceEditor from "react-ace"

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import { edit } from "ace-builds"

export default function CodeEditor( props ) {
  const dataManager = props.dataManager

  const [editorTheme, setEditorTheme] = useState(dataManager.preferences.editorTheme)
  
  const [editorLanguage, setEditorLanguage] = useState(dataManager.preferences.editorLanguage)
  const [editorCode, setEditorCode] = useState(null)
  const [fileName, setFileName] = useState(null)

  useEffect(() => {
    setEditorTheme(dataManager.preferences.editorTheme)

    const currentFolderName = dataManager.currentFile.folderName
    const currentFileName = dataManager.currentFile.fileName

    dataManager.userFiles.forEach((folder) => {
      if (folder.folderName == currentFolderName) {
        folder.files.forEach((file) => {
          if (file.name == currentFileName) {
            setEditorCode(file.content)
            setEditorLanguage(file.fileLanguage)
            setFileName(file.name)
          }
        })
      }
    })
  }, [dataManager])
  
  function runCodeClicked(editorCode, editorLanguage) {
    runCode(editorCode, editorLanguage)
  }

  function onEditorChange(currectCode) {
    editorChange(currectCode)
    setEditorCode(currectCode)
  }
  
  return (
    <div className="editor-root resize-right">
      <Resizer minWidth="200"/>
      <div className="editor-head">
        <div className="file-title">
          <h4>{fileName}</h4>
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
        onChange={currectCode => onEditorChange(currectCode)}
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