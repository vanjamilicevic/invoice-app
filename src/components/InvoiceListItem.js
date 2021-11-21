import "../css/invoiceListItem.css"

const InvoiceListItem = (props) => {

    const status = props.status
    const statusCircle = `${status}-circle`

    const saveClickedId = () => {

        window.localStorage.setItem("clicked-to-open", props.id)
    }
 
    return (

        <section className={`invoice-list-item-container ${props.theme === "dark-theme" ? "invoice-list-item-container-dark-theme" : ""}`}>
            <section className="id-payment-due-name">
                <section className={`id ${props.theme === "dark-theme" ? "invoice-list-item-dark-theme" : ""}`}>
                    <p>
                        <span className="hash-tag">
                            #
                        </span>
                        {props.id}
                    </p>
                </section>
                <section className={`payment-due ${props.theme === "dark-theme" ? "invoice-list-item-dark-light-shade" : ""}`}>
                    <p>
                        Due {props.paymentDue}
                    </p>
                </section>
                <section className={`name ${props.theme === "dark-theme" ? "invoice-list-item-dark-theme" : ""}`}>
                    <p>
                        {props.clientName}
                    </p>
                </section>
            </section>

            <section className="total-status-arrow">
                <section className={`total ${props.theme === "dark-theme" ? "invoice-list-item-dark-theme" : ""}`}>
                    <p>
                        £{props.total}
                    </p>
                </section>
                <section className={`status ${status} ${props.theme === "dark-theme" ? `${status}-dark` : "" }`}>
                    <div className={`${statusCircle} ${props.theme === "dark-theme" ? `${statusCircle}-dark` : ""}`}>

                    </div>
                    <p>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </p>
                </section>
                <img className="arrow-right" src={process.env.PUBLIC_URL + "/assets/icon-arrow-right.svg"} alt="Avatar" onClick={() => 
                    {
                        props.updateScreen("open-invoice")
                        saveClickedId() 
                    }}/>
            </section>
        </section>
      )
}

export default InvoiceListItem