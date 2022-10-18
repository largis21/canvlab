export class LarsLabSDK {
    constructor(){}
    getCanv() {
        return document.getElementById("canv-main")
    }

    fitCanvas() {
        const canvas = this.getCanv()
        canvas.style.width='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    clearCanvas() {
        const ctx = this.getCanv().getContext("2d")
        ctx.clearRect(0, 0, 9999, 9999)
    }

    drawRect(x, y, height, length, color="black") {
        const ctx = this.getCanv().getContext("2d")
        ctx.beginPath()
        ctx.rect(x, y, height, length)
        ctx.stroke()
    }

    log(attr) {
        
    }
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

