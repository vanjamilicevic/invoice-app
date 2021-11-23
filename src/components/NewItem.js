
import { useState, useEffect } from "react"
import "../css/newItem.css"

const NewItem = (props) => {

    let nameId = `name-${props.itemKey}`
    let priceId = `price-${props.itemKey}`
    let qtyId = `qty-${props.itemKey}`

    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState(props.quantity ? props.quantity : 0)
    const [price, setPrice] = useState(props.price ? props.price : 0)

    const updateQuantity = (e) => {

        if(e.target.value === "") {

            setQuantity(0)
            setTotal(0)
            return
        }

        if(!isNaN(e.target.value)) {

            setQuantity(e.target.value)
            updateTotal()
        }
        else {

            alert("You must enter number in 'Quantity field' ")
        }
    }

    
    const updatePrice = (e) => {

        if(e.target.value === "") {

            setPrice(0)
            setTotal(0)
            return
        }

        if(!isNaN(e.target.value)) {

            setPrice(Number(e.target.value))
            updateTotal()
        }
        else {
            alert (
                "You must enter number in 'Price field' "
            )
        }
    }

    useEffect(() => {
        updateTotal()
    })

    const updateTotal = () => {

        setTotal(parseInt(quantity) * parseFloat(price))
    }

    const deleteItem = (e) => {

        document.getElementById(nameId).classList.remove("input-new-item-name")
        document.getElementById(priceId).classList.remove("input-new-item-price")
        document.getElementById(nameId).classList.remove("input-new-item-qty")
        document.getElementById(props.itemKey).style.display = "none"
    }

    return (
        <section className="add-new-item-container-new-item" id={props.itemKey}>
            <input 
                className="input-new-item-name" 
                id={nameId} 
                type="text"
                defaultValue={props.name ? props.name : ""}
            >
            </input>
            <input 
                className="input-new-item-qty" 
                id={qtyId} 
                onChange={updateQuantity} 
                type="text"
                defaultValue={quantity}
            ></input>
            <input 
                className="input-new-item-price" 
                id={priceId} 
                onChange={updatePrice} 
                type="text"
                placeholder="0.00"
                defaultValue={price}
            >
            </input>
            <section className="total-container-new-item">
                <p className="total-new-item">
                    {total}
                </p>
            </section>
            <i className="fas fa-trash-alt" onClick={() => {
                deleteItem()
            }}></i>
        </section>
    )
}

export default NewItem