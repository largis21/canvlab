import { setCurrentFileContent } from "../pages/editor/EditorPage"

export function runCode(editorCode, editorLanguage) {
  console.log(`Kjører ${editorLanguage} kode`)
  console.log(editorCode)

  setCurrentFileContent(editorCode)
}

export function editorChange(editorCode) {
  setCurrentFileContent(editorCode)
}

