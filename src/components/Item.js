
import "../css/item.css"

const Item = (props) => {

    let totalItem = 0
    let qty = parseFloat(props.itemQty)
    let price = parseFloat(props.itemPrice)
    if(qty && price) {
        totalItem = (qty * price).toFixed(2) 
    }
    return(
        <section className="item-name-qty-price-total-container">
            <section className="name-container-item">
                <p className={`name-item ${props.theme === "dark-theme" ? "name-item-dark-theme" : ""}`}>
                    {props.itemName}
                </p>
            </section>
            <section className="qty-container-item">
                <p className={`qty-item ${props.theme === "dark-theme" ? "qty-item-dark-theme" : ""}`}>
                    {props.itemQty}
                    <span className="x-item">
                        x
                    </span>
                </p>
            </section>
            <section className="price-container-item">
                <p className={`price-item ${props.theme === "dark-theme" ? "price-item-dark-theme" : ""}`}>
                    £ {(props.itemPrice).toFixed(2)}
                </p>
            </section>
            <section className="total-container-item">
                <p className={`total-item ${props.theme === "dark-theme" ? "total-item-dark-theme" : ""}`}>
                    £ {totalItem}
                </p>
            </section>
        </section>
    )
}

export default Item