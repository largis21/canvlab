import { useContext } from "react"
import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { ConsoleCtxt } from "../lib/contexts/consoleCtxt"

export default function CodeConsole() {
  const { dataManager, setDataManager } = useContext(DataManagerCtxt)

  const { consoleText, setConsoleText } = useContext(ConsoleCtxt)

  return (
    <div className="console-root">
      <div className="console-head">
        <h4>Console: </h4>
      </div>
      <div className="console-main">
        <p style={dataManager ? {fontSize: dataManager.preferences.fontSize} : {fontSize: + "5px"}} id="console-text">
          {consoleText}
        </p>
      </div>
    </div>
  )
}