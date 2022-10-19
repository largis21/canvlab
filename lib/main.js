export const larsLabSDKNew = [
    function getCanv() {
        return document.getElementById("canv-main")
    },

    function fitCanvas() {
        const canvas = this.getCanv()
        canvas.style.width='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    },

    function clearCanvas() {
        const ctx = this.getCanv().getContext("2d")
        ctx.clearRect(0, 0, 9999, 9999)
    },

    function drawRect(x, y, height, length, color="black") {
        const ctx = this.getCanv().getContext("2d")
        ctx.beginPath()
        ctx.rect(x, y, height, length)
        ctx.stroke()
    },

    function log(attr) {
        
    },
]

export class LarsLabSDK {
    constructor(canv){
        this.canv = canv;
        this.ctx = canv.getContext("2d");
    }
/*
    getCanv() {
        const canv = 
        this.canv = canv
        this.ctx = canv.getContext("2d")
        return canv
    }
*/
    fitCanvas() {
        const canvas = this.canv
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight - 4 ;
    }

    clearCanvas() {
        const ctx = this.ctx
        ctx.clearRect(0, 0, 9999, 9999)
    }

    drawRect(x, y, width, height, fill="#00000000", color="black", borderWidth=1) {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.fillStyle = fill
        ctx.fill()

        ctx.strokeStyle = color
        ctx.lineWidth = borderWidth;
        ctx.stroke()
    }

    drawCircle(x, y, radius, fill="#00000000", color="black", borderWidth=1) {
        const ctx = this.ctx
        ctx.beginPath()

        ctx.arc(x, y, radius, 0, 360)

        ctx.fillStyle = fill
        ctx.fill()

        ctx.strokeStyle = color
        ctx.lineWidth = borderWidth;
        ctx.stroke()
    }

    canvasWidth() {
        return this.canv.width
    }
    
    canvasHeight() {
        return this.canv.height
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

