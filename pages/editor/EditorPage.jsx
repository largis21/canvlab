import CodeConsole from "../../components/CodeConsole"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { isSet } from "interact.js"

const CodeEditor = dynamic(
  () => import("../../components/CodeEditor"),
  { ssr: false }
)

const FileMenu = dynamic(
  () => import("../../components/FileMenu"),
  { ssr: false }
)

const defaultDataManager = {
  currentFile: {
    folderName: "asd",
    fileName: "awg" 
  },
  userFiles: [{
    folderName: "Prosjekter",
    files: [{
        name: "Hello_World",
        content: `console.log("Hello World!")`,
        fileLanguage: "javascript"
      },
      {
        name: "Skjera",
        content: `console.log("Ingenting")`,
        fileLanguage: "javascript"
      }]
    },
    {
      folderName: "Lars",
      files: [{
          name: "Er_Kul",
          content: `console.log("Lars er kul")`,
          fileLanguage: "javascript"
        }]
      }],
  preferences: {
    language: "javascript",
    editorTheme: "monokai"
  }
}

export function setCurrentFile(newFolderName, newFileName) {
  const dataManager = JSON.parse(localStorage.getItem("dataManager"))

  dataManager.currentFile.folderName = newFolderName
  dataManager.currentFile.fileName = newFileName

  localStorage.setItem("dataManager", JSON.stringify(dataManager))
  dispatchEvent(new Event("dataManagerUpdate"))
}

export function setCurrentFileContent(newContent, fileLanguage) {
  const dataManager = JSON.parse(localStorage.getItem("dataManager"))

  const currentFolder = dataManager.currentFile.folderName
  const currentFile = dataManager.currentFile.fileName

  dataManager.userFiles.forEach((folder) => {
    if (folder.folderName == currentFolder) {
      folder.files.forEach((file) => {
        if (file.name == currentFile) {
          file.content = newContent
          file.language = fileLanguage
        }
      })
    }
  })

  localStorage.setItem("dataManager", JSON.stringify(dataManager))
  dispatchEvent(new Event("dataManagerUpdate"))
}

export default function EditorPage() {
  if (!localStorage.getItem("dataManager")) localStorage.setItem("dataManager", JSON.stringify(defaultDataManager))
  const [dataManager, setDataManager] = useState(JSON.parse(localStorage.getItem("dataManager")))
  
  //for highlighting selected file
  const [prevFile, setPrevFile] = useState()

  addEventListener("dataManagerUpdate", () => {
    setPrevFile(document.getElementById(`${dataManager.currentFile.folderName} ${dataManager.currentFile.fileName}`))
    setDataManager(JSON.parse(localStorage.getItem("dataManager")))
  })

  useEffect(() => {
    try {
      prevFile.style.background = "none"
      const elem = document.getElementById(`${dataManager.currentFile.folderName} ${dataManager.currentFile.fileName}`)
      elem.style.background = "var(--gray-700)"
    } catch {}
  }, [dataManager])

  return (
    <div className="main-content">
      <FileMenu dataManager={dataManager}/>
      <CodeEditor dataManager={dataManager}/>
      <CodeConsole />
    </div>
  )
}