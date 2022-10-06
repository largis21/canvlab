export function runCode(editorCode, editorLanguage) {
  console.log(`Kjører ${editorLanguage} kode`)
  console.log(editorCode)
}

export const defaultDataManager = {
  fileIsSaved: false,
  userFiles:[
      {
          folderName:"Prosjekter",
          files:[
              {
                  name:"Hello_World",
                  content:`console.log(\"Hello World!\")`,
                  fileLanguage:"javascript",
                  isCurrentFile:true
              },
              {
                  name:"Skjera",
                  content:`console.log(\"Ingenting\")`,
                  fileLanguage:"javascript",
                  isCurrentFile:false
              }
          ]
      },
      {
          folderName:"Lars",
          files:[
              {
                  name:"Er_Kul",
                  content:`console.log(\"Lars er kul\")`,
                  fileLanguage:"javascript",
                  isCurrentFile:false
              }
          ]
      }
  ],
  preferences:{
      language:"javascript",
      editorTheme:"monokai",
      fontSize: "16px"
  }
}


/*
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

*/