import { useState, useContext } from "react"
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { clone } from "../lib/clone"

export default function Preferences() {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  const [editorLanguage, setEditorLanguage] = useState(dataManager.preferences.language || "javascript")
  const [editorTheme, setEditorTheme] = useState(dataManager.preferences.editorTheme || "monokai")
  const [editorFontSize, setEditorFontSize] = useState(dataManager.preferences.fontSize || "16px")

  const editorLanguages = ["javascript", "python", "algo"]
  const editorThemes = ["github", "monokai"]
  const editorFontSizes = ["10px", "12px", "14px", "16px", "18px", "20px", "22px", "24px"]

  function savePreferences() {
    const dataManagerTemp = clone(dataManager)

    dataManagerTemp.preferences.language = editorLanguage
    dataManagerTemp.preferences.editorTheme = editorTheme
    dataManagerTemp.preferences.fontSize = editorFontSize

    setDataManager(dataManagerTemp)
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
          <div className="preferences-item">
            <h3>Font Størrelse</h3>
            <select value={editorFontSize} onChange={event => setEditorFontSize(event.target.value)} name="cars" id="cars">
              {editorFontSizes.map((fontSize, index) => 
                <option key={index} value={fontSize}>{fontSize}</option>
              )}
            </select>
          </div>
        </li>
        <li>
          <button onClick={savePreferences}>Lagre Preferanser</button>
        </li>
      </ul>
    </div>
  )
}