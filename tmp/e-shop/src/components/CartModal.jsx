import { Component } from "react";
import { Link } from "react-router-dom";
import modalStyles from "./styles/Modal.module.css";

class CartModal extends Component {
  render() {
    let newCart = [...this.props.cart]
    let totalQty = 0;
    let totalSum = 0;
    let arr = []
    for(let i = 0; i < newCart.length; i++){
      totalQty += newCart[i].qty
    }
    this.props.cart.map(item=> (item.prices.filter((price) => price.currency.symbol === this.props.symbol)
      .map(price => arr.push(price.amount))
    ))
    totalSum = arr.reduce((acc, val)=> (acc + val)*totalQty, 0)
    return (
      <>
        <div onClick={this.props.onClick}  className={modalStyles.darkBg}/>
        <div className={modalStyles.centered}>
          <div className={modalStyles.modal}>
            <p className={modalStyles.heading}>
              My bags, {this.props.cart.length} items
            </p>
            {this.props.cart.map((item, index) => (
              <div className={modalStyles.modalBody} key={item.id}>
                <div className={modalStyles.row1}>
                  <div className={modalStyles.row1Child}>
                    <p><strong>{item.brand}</strong><br /> {item.name}</p>
                    {item.prices
                      .filter((price) => price.currency.symbol === this.props.symbol)
                      .map((price, index) => (<p key={index}>{this.props.symbol} {price.amount}</p>))
                    }
                    <p>Size:</p>
                    <div className={modalStyles.size_btns}>
                      {item.attributes.map((attr) => attr.type === "text" && attr.items.map((i) => 
                        <button type="button" value={i.value}>{i.value}</button>))
                      }
                    </div>
                    <p>Color:</p>
                    <div className={modalStyles.color_btns}>
                    {item.attributes.map((attr) => attr.type === "swatch" && attr.items.map(i => (
                      <button type="button" value={i.value} style={{ backgroundColor: `${i.value}`, border:"none"}}></button>
                    )))}
                    </div>
                  </div>
                  <div className={modalStyles.row2Child}>
                    <button type="button"onClick={()=> {this.props.addToCartWithQty(item)}}>+</button>
                    <p>{item.qty}</p>
                    <button type="button" onClick={()=> {this.props.removeFromCart(index)}}>-</button>
                  </div>
                  <img src={item.gallery[0]} alt="Avatar"/>
                </div>
              </div>
            ))}
            <div className={modalStyles.totalCheckout}>
              <p>Total:</p>
              <p>{this.props.symbol} {this.props.formatNumber({value:totalSum, digitCount:2})}</p>
            </div>
            <div className={modalStyles.actionsContainer}>
              <Link to={"/ViewCart"}><button className={modalStyles.viewBtn}>VIEW BAG</button></Link>
              <button className={modalStyles.checkoutBtn} onClick={this.props.onClick}>CHECK OUT</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CartModal;
