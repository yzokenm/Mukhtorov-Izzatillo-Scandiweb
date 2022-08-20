import { Component } from "react";
import styles from "./styles/ViewCart.module.css";

class ViewCart extends Component {
  state = {
    selectedAttribute:''
  }
  componentDidMount(){
    this.handleSelectedAttribute=(e)=> {
        this.setState({
          selectedAttribute: e.target.value
        })
    }

  }
  render() {
    return (
      <div className={styles.main}>
        <h1>CART</h1>
        <hr />
        {this.props.cart.map((item) => (
          <>
            <div className={styles.section}>
              <div className={styles.left}>
                <p>{item.brand}</p>
                <p>{item.name}</p>
                {item.prices.filter((price) => price.currency.symbol === this.props.symbol).map((price, index) => (<p key={index}>{this.props.symbol} {price.amount}</p>
                ))}
                <p>SIZE:</p>
                <div className={styles.size_btns}>
                  {this.props.cart.map((product) =>
                    product.attributes.map((attr) => attr.id === "Size"&& attr.items.map((item) => (
                      <button type="button" value={item.value} onClick={(e)=> {this.handleSelectedAttribute(e)}}>{item.value}</button>
                    )))
                  )}
                </div>
                <p>COLOR:</p>
                <div>
                {this.props.cart.map((product) =>
                  product.attributes.map((attr) => attr.type === "swatch" && attr.items.map(item => (
                    <button type="button" style={{ backgroundColor: `${item.value}`, borderColor: this.state.selectedAttribute ? 'red' : '' }} onClick={()=> {this.handleSelectedAttribute(item.value)}}></button>
                  )))
                )}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.itemCalc}>
                  <button type="button" onClick={()=> {this.props.addToCartWithQty(item)}}>+</button>
                  <p>{this.props.qty}</p>
                  <button type="button" onClick={()=> {this.props.removeFromCart(item)}}>-</button>
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
