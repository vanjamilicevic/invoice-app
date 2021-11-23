
import "../css/newInvoice.css"
import NewItem from "./NewItem"
import { useState } from "react"
import Calendar from "./Calendar"
import { getStringDate } from "../utils/date"

const getInvoiceInfo = (invoices, id) => {

    for (let i = 0; i < invoices.length; i++)
        if(invoices[i].id === id) 
            return invoices[i]    
}

// date param is read from JSON, it uses that format
const buildDate = (date) => {

    const dateObj = new Date(date)
    return getStringDate(dateObj.getDate(), dateObj.getMonth() + 1 < 10 ? "0" + String(dateObj.getMonth() + 1) : String(dateObj.getMonth() + 1), dateObj.getFullYear())
}
 
buildDate()
const NewInvoice = (props) => {

    const editedInvoice = props.id ? getInvoiceInfo(props.invoices, props.id) : null
    const [addedItems, setAddedItems] = useState(props.id ? editedInvoice.items.length : 0)
    const [arePaymentTermsVisible, setPaymentTermsVisibility] = useState(false)
    const [haveEmptyFieldsNote, setEmptyFieldsNote] = useState(false)
    const [haveEmptyCartNote, setEmptyCartNote] = useState(false)

    const togglePaymentTermsVisibility = () => setPaymentTermsVisibility(!arePaymentTermsVisible)
    const updatePaymentTerms = (event) => {

        document.getElementById("payment-terms-input").innerText = event.target.innerText
        togglePaymentTermsVisibility()
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const generateId = () => {
        const letterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numberList = "0123456789"
        let resultNumbers = ""
        let resultLetters = ""
        let generatedId = ""
        for(let i = 0; i < 2; i++) {
            let randomLetters = Math.floor(Math.random() * letterList.length);
            resultLetters = resultLetters + letterList.charAt(randomLetters);
        }
        for(let i = 0; i < 4; i++) {
            let randomNumbers = Math.floor(Math.random() * numberList.length);
            resultNumbers = resultNumbers + numberList.charAt(randomNumbers);
        }
        generatedId = resultLetters + resultNumbers
        return generatedId;
    }

    let newId = generateId()

    const addNewItem = () => {

        const names = document.getElementsByClassName('input-new-item-name')
        const prices = document.getElementsByClassName('input-new-item-price')
        const quantities = document.getElementsByClassName('input-new-item-qty')
        const totals = document.getElementsByClassName('total-new-item')
        const newItems = []
        for(let i = 0; i < names.length; i++) 
            newItems.push({
                name: names[i].value,
                price: parseFloat(prices[i].value),
                quantity: parseFloat(quantities[i].value),
                total: parseFloat(totals[i].value)
            })
        let total = 0
        newItems.forEach((element) => {
            total += element.quantity * element.price
        })

        const newElement = {
            clientAddress: {
                city: document.getElementById("bill-to-city-input").value,
                country: document.getElementById("bill-to-country-input").value,
                postCode: document.getElementById("bill-to-post-code-input").value,
                street: document.getElementById("bill-to-street-address-input").value
            },
            clientEmail: document.getElementById("clients-email-input").value,
            clientName: document.getElementById("clients-name-input").value,
            createdAt: document.getElementById("invoice-date-input").innerText,
            description: document.getElementById("project-description-input").value,
            id: newId,
            items: newItems,
            paymentDue: addDays(new Date(document.getElementById("invoice-date-input").innerText), parseInt(document.getElementById("payment-terms-input").value)),
            paymentTerms: document.getElementById("payment-terms-input").value,
            senderAddress: {
                city: document.getElementById("bill-from-city-input").value,
                country: document.getElementById("bill-from-country-input").value,
                postCode: document.getElementById("bill-from-post-code-input").value,
                street: document.getElementById("bill-from-street-address-input").value
            },
            status: "draft",
            total: total
        }
        
        const currentInvoices = window.localStorage.getItem("invoices")
        let newInvoices = undefined
        if (currentInvoices === "" || currentInvoices === "[]") 
           newInvoices = [newElement]
        else {
            newInvoices = JSON.parse(currentInvoices)
            newInvoices.push(newElement)
         }
    
        window.localStorage.setItem("invoices", JSON.stringify(newInvoices))
        props.updateInvoices(newInvoices)
    }

    const saveAndSend = () => {

        let allGreen = true

        const fromStreetAddress = document.getElementById("bill-from-street-address-input")
        const fromCity = document.getElementById("bill-from-city-input")
        const fromPostCode = document.getElementById("bill-from-post-code-input")
        const fromCountry = document.getElementById("bill-from-country-input")
        const clientsName = document.getElementById("clients-name-input")
        const clientsEmail = document.getElementById("clients-email-input")
        const toStreetAddress = document.getElementById("bill-to-street-address-input")
        const toCity = document.getElementById("bill-to-city-input")
        const toPostCode = document.getElementById("bill-to-post-code-input")
        const toCountry = document.getElementById("bill-to-country-input")
        const invoiceDate = addDays(new Date(document.getElementById("invoice-date-input").innerText), parseInt(document.getElementById("payment-terms-input")))
        const paymentTerms = document.getElementById("payment-terms-input") 
        const projectDescription = document.getElementById("project-description-input")

        /* Item List */
        const names = document.getElementsByClassName('input-new-item-name')
        const prices = document.getElementsByClassName('input-new-item-price')
        const quantities = document.getElementsByClassName('input-new-item-qty')
        const totals = document.getElementsByClassName('total-new-item')
        const newItems = []
        for(let i = 0; i < names.length; i++) 
            if(names[i].value === "" && prices[i].value === "" && quantities[i].value === "" && totals[i].value === "")
                continue
            else
                newItems.push({
                    name: names[i].value,
                    price: parseFloat(prices[i].value),
                    quantity: parseFloat(quantities[i].value),
                    total: parseFloat(totals[i].value)
                })

        let total = 0
        newItems.forEach((element) => {
            total += element.quantity * element.price
        })

        if(fromStreetAddress.value === "") {
            fromStreetAddress.classList.add("red-border")
            document.getElementById("bill-from-street-address-title").classList.add("red-text")
            allGreen = false
        } else {
            fromStreetAddress.classList.remove("red-border")
            document.getElementById("bill-from-street-address-title").classList.remove("red-text")
        }


        if(fromCity.value === "") {
            fromCity.classList.add("red-border")
            document.getElementById("bill-from-city").classList.add("red-text")
            allGreen = false
        } else {
            fromCity.classList.remove("red-border")
            document.getElementById("bill-from-city").classList.remove("red-text")
        }

        if(fromPostCode.value === "") {
            fromPostCode.classList.add("red-border")
            document.getElementById("bill-from-post-code").classList.add("red-text")
            allGreen = false
        } else {
            fromPostCode.classList.remove("red-border")
            document.getElementById("bill-from-post-code").classList.remove("red-text")
        }

        if(fromCountry.value === "") {
            fromCountry.classList.add("red-border")
            document.getElementById("bill-from-country").classList.add("red-text")
            allGreen = false
        } else {
            fromCountry.classList.remove("red-border")
            document.getElementById("bill-from-country").classList.remove("red-text")
        }
            
        if(clientsName.value === "") {
            clientsName.classList.add("red-border")
            document.getElementById("clients-name").classList.add("red-text")
            allGreen = false
        } else {
            clientsName.classList.remove("red-border")
            document.getElementById("clients-name").classList.remove("red-text")
        }

        if(clientsEmail.value === "") {
            clientsEmail.classList.add("red-border")
            document.getElementById("clients-email").classList.add("red-text")
            allGreen = false
        } else {
            clientsEmail.classList.remove("red-border")
            document.getElementById("clients-email").classList.remove("red-text")
        }
            
        if(toStreetAddress.value === "") {
            toStreetAddress.classList.add("red-border")
            document.getElementById("bill-to-street-address").classList.add("red-text")
            allGreen = false
        } else {
            toStreetAddress.classList.remove("red-border")
            document.getElementById("bill-to-street-address").classList.remove("red-text")
        }

        if(toCity.value === "") {
            toCity.classList.add("red-border")
            document.getElementById("bill-to-city").classList.add("red-text")
            allGreen = false
        } else {
            toCity.classList.remove("red-border")
            document.getElementById("bill-to-city").classList.remove("red-text")
        }

        if(toPostCode.value === "") {
            toPostCode.classList.add("red-border")
            document.getElementById("bill-to-post-code").classList.add("red-text")
            allGreen = false
        } else {
            toPostCode.classList.remove("red-border")
            document.getElementById("bill-to-post-code").classList.remove("red-text")
        }

        if(toCountry.value === "") {
            toCountry.classList.add("red-border")
            document.getElementById("bill-to-country").classList.add("red-text")
            allGreen = false
        } else {
            toCountry.classList.remove("red-border")
            document.getElementById("bill-to-country").classList.remove("red-text")
        }

        if(projectDescription.value === "") {
            projectDescription.classList.add("red-border")
            document.getElementById("project-description").classList.add("red-text")
            allGreen = false
        } else {
            projectDescription.classList.remove("red-border")
            document.getElementById("project-description").classList.remove("red-text")
        }

        if(newItems.length === 0)
            setEmptyCartNote(true)
        else 
            setEmptyFieldsNote(false)

        if(!allGreen) 
            setEmptyFieldsNote(true)
        else 
            setEmptyFieldsNote(false)

        /* If everything is OK */
        if (newItems.length > 0 && allGreen) {

            const newElement = {
                clientAddress: {
                    city: toCity.value,
                    country: toCountry.value,
                    postCode: toPostCode.value,
                    street: toStreetAddress.value
                },
                clientEmail: clientsEmail.value,
                clientName: clientsName.value,
                createdAt: document.getElementById("invoice-date-input").innerText,
                description: projectDescription.value,
                id: props.id ? props.id : newId,
                items: newItems,
                paymentDue: invoiceDate,
                paymentTerms: paymentTerms.value,
                senderAddress: {
                    city: fromCity.value,
                    country: fromCountry.value,
                    postCode: fromPostCode.value,
                    street: fromStreetAddress.value
                },
                status: "pending",
                total: total
            }

            const currentInvoices = window.localStorage.getItem("invoices")
            let newInvoices = undefined
            if (currentInvoices === "" || currentInvoices === "[]") 
                newInvoices = [newElement]
            else {
                newInvoices = JSON.parse(currentInvoices).filter((element) => element.id !== newElement.id)
                newInvoices.push(newElement)
            }
        
            window.localStorage.setItem("invoices", JSON.stringify(newInvoices))
            props.updateInvoices(newInvoices)
            props.closeModal(false)
        }
    }

    return (

        <section className="new-invoice-container">
            <section className={`new-invoice-content ${props.theme === "dark-theme" ? "new-invoice-content-dark-theme" : ""}`}>
                <section className="go-back-container" onClick={() => props.closeModal(false)}>
                    <img className="arrow-left-go-back" src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="Arrow left"/>
                    <p className="go-back">
                        Go back
                    </p>
                </section>
                <h1 className={`new-invoice-title-modal ${props.theme === "dark-theme" ? "new-invoice-title-modal-dark-theme" : ""}`}>
                    {
                        props.id ?
                        <p>
                            Edit <span className="hash-tag-edit-invoice">#</span>{props.id}
                        </p>
                        : "New Invoice"
                    }
                </h1>
                <p className="bill-form">
                    Bill From
                </p>
                <p className={`bill-from-street-address-title ${props.theme === "dark-theme" ? "bill-from-street-address-title-dark-theme" : ""}`} id="bill-from-street-address-title">
                    Street address
                </p>

                <input 
                    className={`bill-from-street-address-input ${props.theme === "dark-theme" ? "bill-from-street-address-input-dark-theme" : ""}`} id="bill-from-street-address-input" 
                    type="text"
                    defaultValue={props.id ? editedInvoice.clientAddress.street : ""}
                >
                </input>
                <section className="bill-from-city-post-country">
                    <section className="bill-from-city" >
                        <p className={`bill-from-description ${props.theme === "dark-theme" ? "bill-from-description-dark-theme" : ""}`} id="bill-from-city">
                            City
                        </p>
                        <input 
                            className={`bill-from-input ${props.theme === "dark-theme" ? "bill-from-input-dark-theme" : ""}`} 
                            id="bill-from-city-input" 
                            type="text"
                            defaultValue={props.id ? editedInvoice.clientAddress.city : ""}
                        >
                        </input>
                    </section>

                    <section className="bill-from-post-code">
                        <p className={`bill-from-description ${props.theme === "dark-theme" ? "bill-from-description-dark-theme" : ""}`} id="bill-from-post-code">
                            Post Code
                        </p>
                        <input 
                            className={`bill-from-input ${props.theme === "dark-theme" ? "bill-from-input-dark-theme" : ""}`} 
                            id="bill-from-post-code-input" type="text"
                            defaultValue={props.id ? editedInvoice.clientAddress.postCode : ""}
                        >
                        </input>
                    </section>

                    <section className="bill-from-country">
                        <p className={`bill-from-description ${props.theme === "dark-theme" ? "bill-from-description-dark-theme" : ""}`} id="bill-from-country">
                            Country
                        </p>
                        <input 
                            className={`bill-from-input ${props.theme === "dark-theme" ? "bill-from-input-dark-theme" : ""}`} 
                            id="bill-from-country-input" 
                            type="text"
                            defaultValue={props.id ? editedInvoice.clientAddress.country : ""}
                        >
                        </input>
                    </section>
                </section>
                
                <p className="bill-to">
                    Bill To
                </p>

                <section className="bill-to-clients-name">
                    <p className={`clients-name ${props.theme === "dark-theme" ? "clients-name-dark-theme" : ""}`} id="clients-name">
                        Client's Name
                    </p>
                    <input 
                        id="clients-name-input" 
                        className={`clients-name-input ${props.theme === "dark-theme" ? "clients-name-input-dark-theme" : ""}`} 
                        type="text"
                        defaultValue={props.id ? editedInvoice.clientName : ""}
                    >
                    </input>
                </section>
                <section className="bill-to-clients-email">
                    <p className={`clients-email-description ${props.theme === "dark-theme" ? "clients-email-description-dark-theme" : ""}`} id="clients-email">
                        Client's email
                    </p>
                    <input 
                        className={`clients-email-input ${props.theme === "dark-theme" ? "clients-email-input-dark-theme" : ""}`} 
                        id="clients-email-input" 
                        type="text"
                        placeholder="e.g. email@example.com"
                        defaultValue={props.id ? editedInvoice.clientEmail : ""}
                    >
                    </input>
                </section>
                <section className="bill-to-street-address">
                    <p className={`bill-to-street-address-description ${props.theme === "dark-theme" ? "bill-to-street-address-description-dark-theme" : ""}`} id="bill-to-street-address">
                        Street address
                    </p>
                    <input 
                        id="bill-to-street-address-input" 
                        className={`bill-to-street-address-input ${props.theme === "dark-theme" ? "bill-to-street-address-input-dark-theme" : ""}`} 
                        type="text"
                        defaultValue={props.id ? editedInvoice.senderAddress.street : ""}
                    >
                    </input>
                </section>
                <section className="bill-to-city-post-code-country">
                    <section className="bill-to-city">
                        <p className={`bill-to-description ${props.theme === "dark-theme" ? "bill-to-description-dark-theme" : ""}`} id="bill-to-city">
                            City
                        </p>
                        <input 
                            className={`bill-to-input ${props.theme === "dark-theme" ? "bill-to-input-dark-theme" : ""}`} 
                            id="bill-to-city-input" 
                            type="text"
                            defaultValue={props.id ? editedInvoice.senderAddress.city : ""}
                        >
                        </input>
                    </section>

                    <section className="bill-to-post-code">
                        <p className={`bill-to-description ${props.theme === "dark-theme" ? "bill-to-description-dark-theme" : ""}`} id="bill-to-post-code">
                            Post Code
                        </p>
                        <input 
                            className={`bill-to-input ${props.theme === "dark-theme" ? "bill-to-input-dark-theme" : ""}`} 
                            id="bill-to-post-code-input" 
                            type="text"
                            defaultValue={props.id ? editedInvoice.senderAddress.postCode : ""}
                        >
                        </input>
                    </section>

                    <section className="bill-to-country">
                        <p className={`bill-to-description ${props.theme === "dark-theme" ? "bill-to-description-dark-theme" : ""}`} id="bill-to-country">
                            Country
                        </p>
                        <input 
                            className={`bill-to-input ${props.theme === "dark-theme" ? "bill-to-input-dark-theme" : ""}`} 
                            id="bill-to-country-input" 
                            type="text"
                            defaultValue={props.id ? editedInvoice.senderAddress.country : ""}
                        >
                        </input>
                    </section>
                </section>
                <section className="invoice-date-payment-terms">
                    <section className="invoice-date">
                        <p className={`invoice-date-descripton ${props.theme === "dark-theme" ? "invoice-date-descripton-dark-theme" : ""}`}>
                            Invoice Date
                        </p>
                        <Calendar 
                            className="cal"
                            date = {props.id ? buildDate(editedInvoice.createdAt) : ""}
                            theme={props.theme}
                        />
                    </section>

                    <section className="payment-terms">
                        <p className={`payment-terms-description ${props.theme === "dark-theme" ? "payment-terms-description-dark-theme" : ""}`}>
                            Payment terms
                        </p>
                        <div className={`payment-terms-input ${props.theme === "dark-theme" ? "payment-terms-input-dark-theme" : ""}`} id="payment-terms-input" onClick={togglePaymentTermsVisibility}>
                            <p className="payment-terms-option" >
                                Net {props.id ? editedInvoice.paymentTerms : ""} Days
                            </p>
                        </div>
                        {
                            arePaymentTermsVisible ?
                                <div className={`payment-options ${props.theme === "dark-theme" ? "payment-options-input-dark-theme" : ""}`}>
                                    <div className="payment-option" onClick={updatePaymentTerms}>
                                        Net 1 Day
                                    </div>
                                    <div className="payment-option" onClick={updatePaymentTerms}>
                                        Net 7 Day
                                    </div>
                                    <div className="payment-option" onClick={updatePaymentTerms}>
                                        Net 14 Day
                                    </div>
                                    <div className="payment-option" onClick={updatePaymentTerms}>
                                        Net 30 Day
                                    </div>
                                </div>
                            : null
                        }
                        
                    </section>
                </section>
                <section className="project-description">
                    <p className={`project-description-description ${props.theme === "dark-theme" ? "project-description-description-dark-theme" : ""}`} id="project-description">
                        Project Description
                    </p>
                    <input 
                        className={`project-description-input ${props.theme === "dark-theme" ? "project-description-input-dark-theme" : ""}`} 
                        id="project-description-input" 
                        type="text"
                        placeholder="e.g. Graphic Design Service"
                        defaultValue={props.id ? editedInvoice.description : ""}
                    >
                    </input>
                </section>
                <h1 className="item-list-title">
                    Item List
                </h1>
                <section className="item-name-qty-price-total">
                    <section className="item-name-container">
                        <p className={`item-name-description ${props.theme === "dark-theme" ? "item-name-description-dark-theme" : ""}`}>
                            Item Name
                        </p>
                    </section>
                    <section className="qty-container">
                        <p className={`qty-description ${props.theme === "dark-theme" ? "qty-description-dark-theme" : ""}`}>
                            Qty.
                        </p>
                    </section>
                    <section className="price-container">
                        <p className={`price-description ${props.theme === "dark-theme" ? "price-description-dark-theme" : ""}`}>
                            Price
                        </p>
                    </section>
                    <section className="total-container">
                        <p className={`total-description ${props.theme === "dark-theme" ? "total-description-dark-theme" : ""}`}>
                            Total
                        </p>
                    </section>
                </section>

                {
                    props.id ?
                        [...Array(addedItems)].map((x, i) =>
                            <NewItem 
                                name={editedInvoice.items[i].name}
                                price={editedInvoice.items[i].price}
                                quantity={editedInvoice.items[i].quantity}
                                key={i}
                                itemKey={i}
                                addedItems={addedItems}
                            />
                        )
                    : 
                    [...Array(addedItems)].map((x, i) =>
                    <NewItem 
                        key={i}
                        itemKey={i}
                        addedItems={addedItems}
                        />
                    )
                }
            
                <section className={`add-new-item-container ${props.theme === "dark-theme" ? "add-new-item-container-dark-theme" : ""}`} onClick={() => {
                    setAddedItems(addedItems + 1)
                    }}
                >
                    <p className={`add-new-item-title ${props.theme === "dark-theme" ? "add-new-item-title-dark-theme" : ""}`}>
                        + Add New Item
                    </p>
                </section>
                {
                    haveEmptyFieldsNote ?
                        <p className="all-fields-must-be-added">
                            - All fields must be added
                        </p>
                    : null
                }
                {
                    haveEmptyCartNote ?
                        <p className="all-fields-must-be-added">
                            - An item must be added
                        </p>
                    : null
                }
                
                {
                    !props.id ?
                        <section className="discard-save-as-draft-save-send-container">
                            <section className="discard" onClick={() => {
                                props.closeModal(false)
                                setAddedItems(0)
                                }}
                            >
                                <p className="discard-title">
                                    Discard
                                </p>
                            </section>
                            <section className="save-as-draft" 
                                    onClick={() => {
                                        addNewItem()
                                        props.closeModal(false)
                                    }}
                            >
                                <p className="save-as-draft-title">
                                    Save as Draft
                                </p>
                            </section>
                            <section className="save-and-send" onClick={saveAndSend}>
                                <p className="save-and-send-title">
                                    Save & Send
                                </p>
                            </section>
                        </section>
                    : null
                }

                {
                    props.id ?
                    <section className="cancel-save">
                            <section className="cancel-edit-invoice" onClick={() => props.closeModal(false)}>
                                <p className="cancel-title">
                                    Cancel
                                </p>
                            </section>
                            <section className="save-edit-invoice" onClick={saveAndSend}>
                                <p className="save-title" onClick={saveAndSend}>
                                    Save Changes
                                </p>
                            </section>
                        </section>
                    : null
                }
                
                
            </section>
        </section>
    )
}

export default NewInvoice