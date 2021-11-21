import "../css/deleteInvoiceModal.css"

const DeleteInvoiceModal = (props) => {

    const deleteInvoice = () => {
    
        const allItems = JSON.parse(window.localStorage.getItem("invoices"))
        const filteredItems = allItems.filter( (item) => item.id !== props.id)
        window.localStorage.setItem("invoices", JSON.stringify(filteredItems))

        props.updateInvoices(filteredItems)
        props.updateScreen("main-content")
    }

    return (

        <section className="deleteModalContainer">
            
            <section className="deleteModalContent">
                <p className="confirm-deletion-title">
                    Confirm Deletion
                </p>
                <p className="confirm-delition-description">
                    Are you sure you want to delete
                    invoice {props.id}?
                    This action cannot be undone.
                </p>
                <section className="cancel-delete-delete-modal-container">
                    <section className="cancel-container-delete-modal" onClick={() => {props.cancelModal(false)}}>
                        <p className="cancel-delete-modal">
                            Cancel
                        </p>
                    </section>
                    <section className="delete-container-delete-modal" onClick={() => {
                        props.updateScreen("no-invoices")
                        deleteInvoice()
                    }}>
                        <p className="delete-delete-modal">
                            Delete
                        </p>
                    </section>

                </section>
                
            </section>
        </section>
    )
}

export default DeleteInvoiceModal