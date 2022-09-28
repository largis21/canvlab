
// React Components
import Navbar from "../components/Navbar"
import FileMenu from "../components/FileMenu"

export default function Home() {
  return (
    <div className="root">
      <Navbar />
      <div className="main-content">
        <FileMenu />
      </div>
    </div>
  )
}
