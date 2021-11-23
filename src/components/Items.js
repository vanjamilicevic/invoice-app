
import "../css/items.css"
import Item from "./Item.js"

const Items = (props) => {

    let allItems = props.items
    let totalPrice = 0
    for (let i = 0; i < allItems.length; i ++) {

        totalPrice += (parseInt(allItems[i].quantity) * parseFloat(allItems[i].price))
        
    }

    return (
        <section>
            <section className={`all-items-container ${props.theme === "dark-theme" ? "all-items-container-dark-theme" : ""}`}>
                <section className="all-titles-items">
                    <section className="item-name-title-container-items">
                        <p className={`item-name-title-items ${props.theme === "dark-theme" ? "item-name-title-items-dark-theme" : ""}`}>
                            Item Name
                        </p>
                    </section>
                    <section className="qty-title-container-items">
                        <p className={`qty-title-items ${props.theme === "dark-theme" ? "qty-title-items-dark-theme" : ""}`}>
                            QTY.
                        </p>
                    </section>
                    <section className="price-title-container-items">
                        <p className={`price-title-items ${props.theme === "dark-theme" ? "price-title-items-dark-theme" : ""}`}>
                            Price
                        </p>
                    </section>
                    <section className="total-title-container-items">
                        <p className={`total-title-items ${props.theme === "dark-theme" ? "total-title-items-dark-theme" : ""}`}>
                            Total
                        </p>
                    </section>
                </section>
                {
                    props.items.map(element => {

                        return (
                        <Item
                            key={element.name}
                            itemName={element.name}
                            itemQty={element.quantity}
                            itemPrice={parseFloat(element.price)}
                            updateScreen={props.updateScreen}
                            theme={props.theme}
                        />
                        )
                    })
                }
            </section>
                <section className={`amount-due-total-items ${props.theme === "dark-theme" ? "amount-due-total-items-dark-theme" : ""}`}>
                <section className="amount-due-items">
                    Amount Due
                </section>
                <section className="grand-total-items">
                    Grand Total
                </section>
                <section className="total-items">
                    £{totalPrice.toFixed(2)}
                </section>
            </section>
        </section>
    )
}

export default Items