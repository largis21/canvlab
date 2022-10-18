import { useContext, useEffect } from "react"
import { OutputCtxt } from "../lib/contexts/outputCtxt"
import { ConsoleCtxt } from "../lib/contexts/consoleCtxt"

import { LarsLabSDK } from "../lib/main"

export default function CodeOutput() {
  const { codeOutput, setCodeOutput } = useContext(OutputCtxt)
  const { consoleText, setConsoleText } = useContext(ConsoleCtxt)

  useEffect(() => {
    if (codeOutput.code) {
      evaluateCode(codeOutput.code)
    }
  }, [codeOutput])

  function evaluateCode(code) {
    try {
      setConsoleText("Running code... ")

      const codeSDK = new LarsLabSDK

      let func = new Function(
        "codeSDK",
        "const canvas = codeSDK.getCanv();" + 
        "const ctx = canvas.getContext(\"2d\");" + 
        "codeSDK.clearCanvas();" +
        "codeSDK.fitCanvas();" +
        code
      )

      func(codeSDK, code)
    
    } catch (e) {
      console.log(e)
      setConsoleText(e.toString())
    }
  }
  
  return (
    <div className="output-root">
      <div className="output-head">
        <h4>Output: </h4>
      </div>
      <div className="output-main">
        <canvas height="100%" width="100%" id="canv-main">

        </canvas>
      </div>
    </div>
  )
}