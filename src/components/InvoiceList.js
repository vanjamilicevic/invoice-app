import "../css/invoiceList.css"
import InvoiceListItem from "./InvoiceListItem"

const InvoiceList = (props) => {

    return (
        <section className="invoices-container">
        {
          props.invoices.map(element => {
            let invoiceDate = element.paymentDue
            let paymentDue = ""

            if(invoiceDate && !String(invoiceDate) === "Invalid Date") {

                let d = new Date(invoiceDate);
                let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                paymentDue = `${day} ${month} ${year}`
            }

            return (
              

              <InvoiceListItem 
                key={element.id}
                clientAdress={element.clientAdress}
                clientEmail={element.clientEmail}
                clientName={element.clientName}
                createdAt={element.createdAt}
                description={element.description}
                id={element.id}
                items={element.items}
                paymentDue={paymentDue}
                paymentTerms={element.paymentTerms}
                status={element.status}
                total={element.total}
                updateScreen={props.updateScreen}
                theme={props.theme}
              />
            )
          })
        }
      </section>
      )
}

export default InvoiceList