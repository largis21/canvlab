import { useState, useEffect } from "react"



/* DROPDOWN dropdownOptions EXAMPLE
const dropdownOptions = {
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
*/
export default function Dropdown( props ) {
  const [isActive, setIsActive] = useState(true)

  const dropdownOptions = props.options

  function dropdownHeadClicked(event) {
    console.log("hei")
    if (isActive) setIsActive(false)
    if (!isActive) setIsActive(true)
  }

  return (
    <div className="dropdown">
      <div onClick={dropdownHeadClicked} className={isActive ? "dropdown-head dropdown-active" : "dropdown-head"}>
        <span>
          <img className={isActive ? "dropdown-icon dropdown-active-icon " : "dropdown-icon "} src="/icon-dropdown.svg" />
        </span>
        <h4>{dropdownOptions.title}</h4>
      </div>
      <ul className={isActive ? "dropdown-list-active dropdown-list" : "dropdown-list "}>  
        {
          dropdownOptions.items.map((item) => 
          <li className="dropdown-item">
            {item.type == "document" ? <img src="/icon-document.svg" /> : ""}
            <h4>{item.name}</h4>
          </li>  
          )
        }
      </ul>
    </div>
  )
}