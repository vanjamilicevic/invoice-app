import "../css/openInvoice.css"
import DeleteInvoiceModal from "./DeleteInvoiceModal"
import NewInvoice from "./NewInvoice"
import Items from "./Items.js"
import { useState } from "react"

const OpenInvoice = (props) => {

    const [newItemModal, setNewItemModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const id = window.localStorage.getItem("clicked-to-open")
    const allInvoices = JSON.parse(window.localStorage.getItem("invoices"))
    let clickedInvoice = null

    for(let i = 0; i < allInvoices.length; i ++) {
        if(allInvoices[i].id === id) {
            clickedInvoice = allInvoices[i]
        }
    }

    let invoiceDate = clickedInvoice.createdAt
    let paymentDueDate = clickedInvoice.paymentDue
    let createdAt = ""
    let paymentDue = ""

    if(invoiceDate) {

        let d = new Date(invoiceDate);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        createdAt = `${day} ${month} ${year}`
    }
    
 
    if(paymentDueDate)
    {
        let d = new Date(paymentDueDate);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        paymentDue = `${day} ${month} ${year}`
    }
    

    const status = clickedInvoice.status
    const statusOpenInvoice = `${clickedInvoice.status}-open-invoice`
    const statusCircleOpenInvoice = `${status}-circle-open-invoice`

    const updateInvoice = () => {

        let updatedInvoices = [...props.invoices]
        let invoiceIndex = undefined 
        for(let i = 0; i < updatedInvoices.length; i++)
            if(updatedInvoices[i].id === id) {
                invoiceIndex = i
                break 
            }
        
        // Can't update draft invoice 
        if (updatedInvoices[invoiceIndex].status === "draft")
            return

        updatedInvoices[invoiceIndex].status = "paid"
        props.updateInvoices(updatedInvoices)
        window.localStorage.setItem("invoices", JSON.stringify(updatedInvoices))
    }

    const openEditModal = () => {
        setNewItemModal(true)
    }
    return (
        <section>
            <section className="single-invoice-container">
                <section className="go-back-container-open-invoice">
                    <img className="arrow-left-open-invoice" src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="Arrow left" onClick={() => {
                        props.updateScreen("main-content")
                    }}/>
                    <p className="go-back-title-open-invoice" onClick= {() => {props.updateScreen("main-content")}}>
                        Go back
                    </p>
                </section>
                <section className={`edit-delete-mark-container ${props.theme === "dark-theme" ? "edit-delete-mark-container-dark-theme" : ""}`}>
                
                    <section className="status-title-and-status-open-invoice">
                        <p className={`status-title-open-invoice ${props.theme === "dark-theme" ? "status-title-open-invoice-dark-theme" : ""}`}>
                            Status
                        </p>
                        <section className={`${statusOpenInvoice} ${props.theme === "dark-theme" ? `${statusOpenInvoice}-dark-theme` : ""}`}>
                            <div className={`${statusCircleOpenInvoice} ${props.theme === "dark-theme" ? `${statusCircleOpenInvoice}-dark-theme` : ""}`}>
                            
                            </div>
                            <p>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </p>
                        </section>
                    </section>

                    <section className="edit-delete-mark-desktop">
                    
                        <section className={`edit ${props.theme === "dark-theme" ? "edit-dark-theme" : ""}`} onClick={openEditModal}>
                            <p className="edit-title">
                                Edit
                            </p>
                        </section>
                        <section className="delete" onClick={() => setDeleteModal(true)}>
                            <p className="delete-title">
                                Delete
                            </p>
                        </section>
                        <section className="mark-as-paid">
                            <p className="mark-as-paid-title" onClick={updateInvoice}>
                                Mark as Paid
                            </p>
                        </section>
                    </section>
                </section>

                <section className={`open-invoice-content-container ${props.theme === "dark-theme" ? "open-invoice-content-container-dark-theme" : ""}`}>
                    <section className="id-description-adress-data">
                        <section className="id-and-description">
                            <p className={`id-open-invoice ${props.theme === "dark-theme" ? "id-open-invoice-dark-theme" : ""}`}>
                                <span className="hash-tag-open-invoice">#</span>{clickedInvoice.id}
                            </p>
                            <p className={`description-open-invoice ${props.theme === "dark-theme" ? "description-open-invoice-dark-theme" : ""}`}>
                                {clickedInvoice.description}
                            </p>
                        </section>

                        <section className="adress-bill-from-open-invoice">
                            <p className="street-bill-from-open-ivoice">
                                {clickedInvoice.senderAddress.street}
                            </p>
                            <p className="city-bill-from-open-ivoice">
                                {clickedInvoice.senderAddress.city}
                            </p>
                            <p className="post-code-bill-from-open-ivoice">
                                {clickedInvoice.senderAddress.postCode}
                            </p>
                            <p className="country-bill-from-open-ivoice">
                                {clickedInvoice.senderAddress.country}
                            </p>
                        </section>
                    </section>

                    <section className="date-due-bill-to-sent-container-open-invoice">

                        <section className="dates-and-bill-to-container-open-invoice">
                            <section className="invoice-date-payment-dye-open-invoice">
                                <section className="invoice-date-open-invoice">
                                    <p className={`invoice-date-title-open-invoice ${props.theme === "dark-theme" ? "invoice-date-title-open-invoice-dark-theme" : ""}`}>
                                        Invoice Date
                                    </p>
                                    <p className={`invoice-date-open-invoice ${props.theme === "dark-theme" ? "invoice-date-open-invoice-dark-theme" : ""}`}>
                                        {createdAt}
                                    </p>
                                </section>
                                <section className="payment-due-open-invoice">
                                    <p className={`payment-due-title-open-invoice ${props.theme === "dark-theme" ? "payment-due-title-open-invoice-dark-theme" : ""}`}>
                                        Payment Due
                                    </p>
                                    <p className={`payment-due-open-invoice ${props.theme === "dark-theme" ? "payment-due-open-invoice-dark-theme" : ""}`}>
                                        {paymentDue}
                                    </p>
                                </section>
                            </section>
                            
                            <section className="bill-to-name-adress-open-invoice">
                                <p className={`bill-to-title-open-invoice ${props.theme === "dark-theme" ? "bill-to-title-open-invoice-dark-theme" : ""}`}>
                                    Bill To
                                </p>
                                <p className={`bill-to-name-open-invoice ${props.theme === "dark-theme" ? "bill-to-name-open-invoice-dark-theme" : ""}`}>
                                    {clickedInvoice.clientName}
                                </p>
                                <p className={`bill-to-street-open-invoice ${props.theme === "dark-theme" ? "bill-to-street-open-invoice-dark-theme" : ""}`}>
                                    {clickedInvoice.clientAddress.street}
                                </p>
                                <p className={`bill-to-city-open-invoice ${props.theme === "dark-theme" ? "bill-to-city-open-invoice-dark-theme" : ""}`}>
                                    {clickedInvoice.clientAddress.city}
                                </p>
                                <p className={`bill-to-post-code-open-invoice ${props.theme === "dark-theme" ? "bill-to-post-code-open-invoice-dark-theme" : ""}`}>
                                    {clickedInvoice.clientAddress.postCode}
                                </p>
                                <p className={`bill-to-country-open-invoice ${props.theme === "dark-theme" ? "bill-to-country-open-invoice-dark-theme" : ""}`}>
                                    {clickedInvoice.clientAddress.country}
                                </p>
                            </section>

                        </section>
                        
                        <section className="sent-to-email-open-invoice">
                            <p className={`sent-to-open-invoice ${props.theme === "dark-theme" ? "sent-to-open-invoice-dark-theme" : ""}`}>
                                Sent to
                            </p>
                            <p className={`email-open-invoice ${props.theme === "dark-theme" ? "email-open-invoice-dark-theme" : ""}`}>
                                {clickedInvoice.clientEmail}
                            </p>
                        </section>
                    </section>

                    <Items
                        items={clickedInvoice.items}
                        updateScreen={props.updateScreen}
                        theme={props.theme}
                    />

                </section>

            </section>

            <section className={`edit-delete-mark-mobile ${props.theme === "dark-theme" ? "edit-delete-mark-mobile-dark-theme" : ""}`}>
                <section className={`edit ${props.theme === "dark-theme" ? "edit-dark-theme" : ""}`} onClick={openEditModal}>
                    <p className="edit-title">
                        Edit
                    </p>
                </section>
                <section className="delete">
                    <p className="delete-title">
                        Delete
                    </p>
                </section>
                <section className="mark-as-paid">
                    <p className="mark-as-paid-title" onClick={updateInvoice}>
                        Mark as Paid
                    </p>
                </section>
            </section>
            {
                deleteModal ? 
                <DeleteInvoiceModal
                    updateInvoices={props.updateInvoices}
                    invoices={props.invoices}
                    cancelModal={setDeleteModal}
                    id={clickedInvoice.id}
                    updateScreen={props.updateScreen}
                />
                : null
            }

            {
                newItemModal ?
                    <NewInvoice 
                        id={id}
                        invoices={props.invoices}
                        updateInvoices={props.updateInvoices}
                        updateScreen={props.updateScreen}
                        closeModal={setNewItemModal}
                        theme={props.theme}
                    />
                : null
            }
            
        </section>
    )
}

export default OpenInvoice