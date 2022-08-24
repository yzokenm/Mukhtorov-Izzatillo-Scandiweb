import { Component } from "react";
import styles from "./styles/ViewCart.module.css";

class ViewCart extends Component {
  state = {
    selectedValue: false
  }

  handleSelectedAttribute=(e)=> {
    console.log(e.target.value);
    if(e.target.value){
      this.setState({
        selectedValue: true
      })
    }
  }
  render() {
    console.log(this.state.selectedValue);
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
                  item.attributes.map((attr) => attr.type === "text" && attr.items.map((item) => 
                    <button 
                      type="button" 
                      value={item.value} 
                      className={this.state.selectedValue === true ? styles.selected : ''} 
                      onClick={(e)=> {this.handleSelectedAttribute(e)}}>
                      {item.value}
                    </button>
                  ))
                }
                </div>
                <p>COLOR:</p>
                <div>
                {item.attributes.map((attr) => attr.type === "swatch" && attr.items.map(item => (
                  <button type="button" style={{ backgroundColor: `${item.value}`}}></button>
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
            <p>$40.00</p>
            <p>4</p>
            <p>$200.00</p>
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
