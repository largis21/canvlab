import '../styles/_globals.css'

import { DataManagerCtxt } from "../lib/contexts/dataManagerContext"
import { defaultDataManager } from "../lib/main"
import { useState, useEffect } from "react"

import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  const [dataManager, setDataManager] = useState("")
  const dataManagerVal = { dataManager, setDataManager }

  //Retrieve the datamanager from browser, will also generate a new one if none exists
  useEffect(() => {
    console.log("getting user data from browser")

    function getUserData() {
      if(!localStorage.getItem("dataManager")) localStorage.setItem("dataManager", JSON.stringify(defaultDataManager));
      setDataManager(JSON.parse(localStorage.getItem("dataManager")))
    }
    getUserData()
  }, [])

  //Always keep localstorage updated
  useEffect(() => {
    if (dataManager) localStorage.setItem("dataManager", JSON.stringify(dataManager))
  }, [dataManager])
  
  return (
    <DataManagerCtxt.Provider value={dataManagerVal}>

      <Navbar />
      <Component {...pageProps} />

    </DataManagerCtxt.Provider>
  )
}

export default MyApp
