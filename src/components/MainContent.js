
import "../css/mainContent.css"
import Invoices from "./Invoices"
import ViewInvoice from "./ViewInvoice"

const MainContent = (props) => {

    return (
        <div className="main-content">
            <Invoices
                updateScreen={props.updateScreen}
                invoices={props.invoices}
                updateInvoices={props.updateInvoices}
                theme={props.theme}
            />
            <ViewInvoice 
                invoices={props.invoices}
                updateInvoices={props.updateInvoices}
                updateScreen={props.updateScreen}
                theme={props.theme}
            />
        </div>
      )
}
 
export default MainContent