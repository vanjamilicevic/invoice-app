import "../css/invoices.css"
import NewInvoice from "./NewInvoice"
import { useState } from "react"

const Invoices = (props) => {
    
    const [NewItemModal, setNewItemModal] = useState(false)
    const [filtersAreVisible, setFiltersVisibility] = useState(false) 
    const [checkedElements, changeCheckedElements] = useState([])

    const toggleFilterVisibility = () => setFiltersVisibility(!filtersAreVisible)
    const updateInvoiceList = (event) => {

        let checkedItem = event.target.getAttribute("event");
        let toFilter = [...checkedElements]

        if (toFilter.includes(checkedItem)) 
            toFilter = toFilter.filter((item) => item !== checkedItem) 
        else 
            toFilter.push(checkedItem)
        
        changeCheckedElements(toFilter)

        let invoices = JSON.parse(window.localStorage.getItem("invoices"))
        let filteredInvoices = invoices.filter((invoice) => {
            return toFilter.includes(invoice.status)
        })

        const storedInvoices = JSON.parse(window.localStorage.getItem("invoices"))
        if (storedInvoices.length > 0 && toFilter.length === 0) 
            props.updateInvoices(storedInvoices) 
        else 
            props.updateInvoices(filteredInvoices)
    }

    const calculateInvoicesDescription = () => {

        let count = props.invoices.length
        let text = undefined
        if (checkedElements.length === 0 || checkedElements.length === 3)
            text = "total"
        else if (checkedElements.length === 1)
            text = checkedElements[0]
        else
            text = "mixed"

        return `${count} ${text}`
    } 
    return (
        <div className="invoices">
            <section className="title-and-description">
                <h1 className={`invoices-title ${props.theme === "dark-theme" ? "invoices-dark-theme" : ""}`}>
                    Invoices
                </h1>
                <p className={`description-long ${props.theme === "dark-theme" ? "invoices-dark-theme" : ""}`}>
                    There are {calculateInvoicesDescription()} invoices
                </p>

                <p className={`description-short ${props.theme === "dark-theme" ? "invoices-dark-theme" : ""}`}>
                    {props.invoices.length} invoices
                </p>
            </section>
            <section className="filter-and-new-invoice">
                <section className="filter">
                    <p className={`filter-title-long ${props.theme === "dark-theme" ? "invoices-dark-theme" : ""}`} onClick={toggleFilterVisibility}>
                        Filter by status
                    </p>
                    <p className={`filter-title-short ${props.theme === "dark-theme" ? "filter-title-short-dark-theme" : ""}`} onClick={toggleFilterVisibility}>
                        Filter
                    </p>
                    {
                        filtersAreVisible ?
                        <img className="arrow-down arrow-rotated" src={process.env.PUBLIC_URL + "/assets/icon-arrow-down.svg"} alt="Arrow down" onClick={toggleFilterVisibility}/>
                        :
                        <img className="arrow-down" src={process.env.PUBLIC_URL + "/assets/icon-arrow-down.svg"} alt="Arrow down" onClick={toggleFilterVisibility}/>
                    }
                    
                    {
                        filtersAreVisible ?
                        <div className={`filter-options ${props.theme === "dark-theme" ? "filter-options-dark-theme" : ""}`}>
                            <span className="filter-option">
                               
                                <div className={`check-container ${checkedElements.includes("draft") ? "draft-active" : ""} ${props.theme === "dark-theme" ? "check-container-dark-theme" : ""}` } onClick={updateInvoiceList} event="draft">
                                {
                                    checkedElements.includes("draft") ?
                                        <i className="fas fa-check" onClick={updateInvoiceList} event="draft"></i>
                                    : null
                                }
                                </div>
                                <p className={`checkbox-text ${props.theme === "dark-theme" ? "checkbox-text-dark-theme" : ""}`} onClick={updateInvoiceList} event="draft">
                                    Draft
                                </p>
                            </span>
                            <span className="filter-option">
    
                                <div className={`check-container ${checkedElements.includes("pending") ? "pending-active" : ""} ${props.theme === "dark-theme" ? "check-container-dark-theme" : ""}`} onClick={updateInvoiceList} event="pending">
                                    {
                                        checkedElements.includes("pending") ?
                                            <i className="fas fa-check" onClick={updateInvoiceList} event="pending"></i>
                                        : null
                                    }
                                    
                                </div>
                                <p className={`checkbox-text ${props.theme === "dark-theme" ? "checkbox-text-dark-theme" : ""}`} onClick={updateInvoiceList} event="pending">
                                    Pending
                                </p>
                            </span>
                            <span className="filter-option paid-check">

                                <div className={`check-container ${checkedElements.includes("paid") ? "paid-active" : ""} ${props.theme === "dark-theme" ? "check-container-dark-theme" : ""}`} onClick={updateInvoiceList} event="paid">
                                    {
                                        checkedElements.includes("paid") ?
                                            <i className="fas fa-check" onClick={updateInvoiceList} event="paid"></i>
                                        : null
                                    }
                                    
                                </div>
                                <p className={`checkbox-text ${props.theme === "dark-theme" ? "checkbox-text-dark-theme" : ""}`} onClick={updateInvoiceList} event="paid">
                                    Paid
                                </p>
                            </span>
                        </div>
                        : null
                    }
                    
                </section>
                <section className="new-invoice" onClick={() => setNewItemModal(true)}>
                    <section className="plus">
                        <img className="plus-img" src={process.env.PUBLIC_URL + "/assets/icon-plus.svg"} alt="Avatar"/>
                    </section>
                    <p className="new-invoice-title">
                        New Invoice
                    </p>
                    <p className="new-title">
                        New
                    </p>
                </section>
            </section>

            { 
                NewItemModal ? 
                <NewInvoice 
                    invoices={props.invoices}
                    updateInvoices={props.updateInvoices}
                    updateScreen={props.updateScreen}
                    closeModal={setNewItemModal}
                    theme={props.theme}
                    />
                : null
            }
        </div>
      )
}

export default Invoices