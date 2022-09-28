import interact from "interactjs";
import { useEffect } from "react";

import Dropdown from "./Dropdown";



export default function FileMenu() {

  const options = {
    title: "Hei",
    items: 
    [{
      name: "index.js",
      type: "document",
      location: ""
    },
    {
      name: "indexnr2.js",
      type: "document",
      location: ""
    },
    {
      name: "indexnr3.js",
      type: "document",
      location: ""
    },
    {
      name: "indexnr4.js",
      type: "document",
      location: ""
    }
  ]}

  useEffect(() => {
    interact('.resize-right').resizable({
      edges: {right: true}
    })
  }, [])

  return (  
    <div className="file-menu resize-right">
      <Dropdown options={options}/>
    </div>
  )
}