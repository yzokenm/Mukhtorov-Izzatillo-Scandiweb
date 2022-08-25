import { Component } from "react";
import styles from "./styles/ViewCart.module.css";
class ViewCart extends Component {
  render() {
    let newCart = [...this.props.cart]
    let totalQty = 0;
    let totalSum = 0;
    let arr = []
    for(let i = 0; i < newCart.length; i++){
      totalQty += newCart[i].qty
    }
    this.props.cart.map(item=> (item.prices.filter((price) => price.currency.symbol === this.props.symbol)
      .map((price, index) => arr.push(price.amount))
    ))
    totalSum = arr.reduce((acc, val)=> (acc + val)*totalQty, 0)
    let tax = this.props.formatNumber({ value: totalSum*(21/100), digitCount: 0 }) 
    return (
      <div className={styles.main}>
        <h1>CART</h1>
        <hr />
        {this.props.cart.map((item, index) => (
          <>
            <div className={styles.section}>
              <div className={styles.left}>
                <p>{item.brand}</p>
                <p>{item.name}</p>
                {
                  item.prices
                  .filter((price) => price.currency.symbol === this.props.symbol)
                  .map((price, index) => <p key={index}>{this.props.symbol} {price.amount}</p>)
                }
                <p>SIZE:</p>
                <div className={styles.size_btns}>
                {
                  item.attributes.map((attr) => attr.type === "text" && attr.items.map((i) => 
                    <button 
                      type="button" 
                      value={i.value} 
                      onClick={(e)=> {this.props.handleSelectedSizeOfProduct(e, item.id)}}>
                      {i.value}
                    </button>
                  ))
                }
                </div>
                <p>COLOR:</p>
                <div className={styles.color_btns}>
                {item.attributes.map((attr) => attr.type === "swatch" && attr.items.map(i => (
                  <button 
                    type="button" 
                    value={i.value}
                    style={{ backgroundColor: `${i.value}`, border:"none"}}
                    onClick={(e)=> {this.props.handleSelectedColorOfProduct(e, item.id)}}>
                  </button>
                )))}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.itemCalc}>
                  <button type="button" onClick={()=> {this.props.addToCartWithQty(item)}}>+</button>
                  <p>{item.qty}</p>
                  <button type="button" onClick={()=> {this.props.removeFromCart(index)}}>-</button>
                </div>
                <img src={item.gallery[0]} alt="" />
              </div>
            </div>
            <hr />
          </>
        ))}
        <div className={styles.overall}>
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div>
            <p> {this.props.symbol} {tax}</p>
            <p>{totalQty}</p>
            <p>{this.props.symbol} {this.props.formatNumber({value: totalSum, digitCount:2})}</p>
          </div>
        </div>
        <button type="button" className={styles.order_btn}>
          ORDER
        </button>
      </div>
    );
  }
}
export default ViewCart;
