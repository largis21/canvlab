import { useState, useEffect, useContext } from "react"
import { clone } from "../lib/clone"

import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { ConsoleCtxt } from "../lib/contexts/consoleCtxt"
import { OutputCtxt } from "../lib/contexts/outputCtxt"


import AceEditor from "react-ace"
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'

export default function CodeEditor( props ) {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)
  const { consoleText, setConsoleText } = useContext(ConsoleCtxt)
  const { codeOutput, setCodeOutput } = useContext(OutputCtxt)

  const [editorTheme, setEditorTheme] = useState(dataManager ? dataManager.preferences.editorTheme : "monokai")
  const [editorLanguage, setEditorLanguage] = useState(dataManager ? dataManager.preferences.editorLanguage : "javascript")
  const [editorFontSize, setEditorFontSize] = useState(dataManager ? dataManager.preferences.fontSize : "16px")
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

  function runCode(editorCode, editorLanguage) {
    const dataManagerTemp = clone(dataManager)
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

    //spaghetti lol
    const currCycle = codeOutput.cycle || 0
    setCodeOutput({code: editorCode, cycle: currCycle+1})
  }

  function onEditorChange(currentCode) {
    setEditorCode(currentCode)
    setFileIsSaved(false)
  }
  
  return (
    <div className="editor-root resize-right">
      <div className="editor-head">
        <div className="file-title">
          <h4>{fileName}{fileIsSaved ? "" : "*"}</h4>
        </div>
        <ul>
          <li>
              <img onClick={() => {runCode(editorCode, editorLanguage)}} src="/icon-run.svg"/>
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
          fontSize: editorFontSize
        }}
      />
    </div>
  )
}