import "../css/viewInvoice.css"
import InvoiceList from "./InvoiceList"

const ViewInvoice = (props) => {

    return (
        <InvoiceList 
            invoices={props.invoices}
            updateInvoices={props.updateInvoices}
            updateScreen={props.updateScreen}
            theme={props.theme}
        />
      )
}

export default ViewInvoice