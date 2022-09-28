import Link from "next/link"

export default function Navbar( page ) {
  return (
    <div className="navbar">
      <h1>FULAB 3.0</h1>
      <ul>
        <li className="active">
          <Link href="#">
            <a>
              Editor
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              Docs
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              Ressurser
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}