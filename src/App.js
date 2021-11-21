import "./css/app.css"
import { useState } from "react"
import Menu from "./components/Menu"
import MainContent from "./components/MainContent"
import OpenInvoice from "./components/OpenInvoice"
import NoInvoicesScreen from "./components/NoInvoicesScreen"
import data from "./data.json"

// window.localStorage.clear()
const App = () => {

  const InvoicesData = data

  if (!window.localStorage.getItem("invoices")) {

    window.localStorage.setItem("invoices", JSON.stringify(InvoicesData))
  }

  if (!window.localStorage.getItem("activeTheme")) {

    window.localStorage.setItem("activeTheme", "light-theme")
  }

  const [theme, setTheme] = useState(window.localStorage.getItem("activeTheme"))
  const [activeScreen, setActiveScreen] = useState(

    JSON.parse(window.localStorage.getItem("invoices")).length === 0 ?
    "no-invoices":
    "main-content"
  )

  const [invoices, updateInvoices] = useState(JSON.parse(window.localStorage.getItem("invoices")))
  return (
    <div className={`App ${theme}`}>
      <Menu
        theme={theme}
        changeTheme={setTheme}
      />

      {
        activeScreen === "main-content"  && invoices.length > 0 ?
        <MainContent 
          invoices={invoices}
          updateInvoices={updateInvoices}
          updateScreen={setActiveScreen}
          theme={theme}
        />
        : null
      }
  
      {
        activeScreen === "main-content" && invoices.length === 0 ?
        <NoInvoicesScreen
          theme={theme}
          invoices={invoices}
          updateInvoices={updateInvoices}
          updateScreen={setActiveScreen}
        />
        : null
      }

      {
        activeScreen === "open-invoice" ?
        <OpenInvoice
          invoices={invoices}
          updateInvoices={updateInvoices}
          updateScreen={setActiveScreen}
          theme={theme}
        />
        : null
      }
      
    </div>
  );
}

export default App;
