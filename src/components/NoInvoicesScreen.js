
import "../css/noInvoicesScreen.css"
import Invoices from "./Invoices"
 
const NoInvoicesScreen = (props) => {

    return (
        <section>
            <Invoices
                invoices={props.invoices}
                updateInvoices={props.updateInvoices}
                updateScreen={props.setActiveScreen}
                theme={props.theme}
        />
            />
            <section className="no-active-screen-container">
                <img className="illustration-empty" src={process.env.PUBLIC_URL + "/assets/illustration-empty.svg"} alt="Illustration empty"/>
                <p className={`nothing-here-title ${props.theme === "dark-theme" ? "nothing-here-title-dark-theme" : ""}`}>
                    There is nothing here
                </p>
                <p className={`nothing-here-description ${props.theme === "dark-theme" ? "nothing-here-description-dark-theme" : ""}`}>
                    Create an invoice clickking the 
                    <span className="new-invoice-nothing-here"> New Invoice</span> button
                    and get started
                </p>
            </section>
            
        </section>
    )
}

export default NoInvoicesScreen