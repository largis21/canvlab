import { useState } from "react"

export default function Preferences() {
  const [editorLanguage, setEditorLanguage] = useState("javascript")
  const [editorTheme, setEditorTheme] = useState("monokai")

  const editorLanguages = ["javascript", "python", "algo"]
  const editorThemes = ["github", "monokai"]

  function onClick(event) {
    console.log(editorLanguage)
    console.log(editorTheme)

    const dataManager = JSON.parse(localStorage.getItem("dataManager"))

    dataManager.preferences.editorTheme = editorTheme
    dataManager.preferences.editorLanguage = editorLanguage

    localStorage.setItem("dataManager", JSON.stringify(dataManager))
    dispatchEvent(new Event("dataManagerUpdate"))
  }

  return (
    <div className="preferences-root">
      <ul>
        <li>
          <h1>Mine Preferanser</h1>
          <p>Her setter du noen standardverdier. Standardverdiene gjelder kun på den maskinen du kjører på.</p>
        </li>
        <li>
          <h2>Kode editor</h2>
          <div className="preferences-item">
            <h3>Språk</h3>
            <select value={editorLanguage} onChange={event => setEditorLanguage(event.target.value)} name="cars" id="cars">
              {editorLanguages.map((language, index) => 
                <option key={index} value={language}>{language}</option>
              )}
            </select>
          </div>
          <div className="preferences-item">
            <h3>Tema</h3>
            <select value={editorTheme} onChange={event => setEditorTheme(event.target.value)} name="cars" id="cars">
              {editorThemes.map((language, index) => 
                <option key={index} value={language}>{language}</option>
              )}
            </select>
          </div>
        </li>
        <li>
          <button onClick={onClick}>click me</button>
        </li>
      </ul>
    </div>
  )
}