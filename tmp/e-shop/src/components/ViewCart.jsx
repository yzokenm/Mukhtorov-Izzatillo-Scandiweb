import { Component } from "react";
import styles from "./styles/ViewCart.module.css";
class ViewCart extends Component {
  state = {
    indexes: {}
  }

  // FUNCTION TAKES SELECTED PRODUCT AS AN ARGUMENT AND SWITCHES BETWEEN ITS IMAGES TO THE RIGHT
  previousSlide =(item)=> {
    console.log(this.state.indexes[item.id]);
    const currentIndex = this.state.indexes[item.id] || 0;
    const newIndex = currentIndex === 0 ? item.gallery.length - 1 : currentIndex - 1;
    this.setState({indexes:{...this.state.indexes, [item.id]:newIndex}})
  }

  // FUNCTION TAKES SELECTED PRODUCT AS AN ARGUMENT AND SWITCHES BETWEEN ITS IMAGES TO THE LEFT
  nextSlide =(item)=> {
    const currentIndex = this.state.indexes[item.id] || 0;
    const newIndex = currentIndex === item.gallery.length - 1 ? 0 : currentIndex + 1;
    this.setState({indexes:{...this.state.indexes, [item.id]:newIndex}})
  }

  render() {
    // CALCULATING ALL PRODUCT QTY, TAXES AND TOTAL SUM OF ALL PRODUCTS IN THE CART PAGE
    let newCart = [...this.props.cart]
    let totalQty = 0;
    let totalSum = 0;
    let newArr = [];
    let tax = 0;
   
    newCart.map(item => {
      totalQty += item.qty 
      item.prices.filter(price => price.currency.symbol === this.props.symbol)
      .map(price => newArr.push(item.qty*price.amount))
    }) 
    totalSum = newArr.reduce((acc, val)=> acc + val, 0)
    tax = this.props.formatPrice({ value: totalSum*(21/100), digitCount: 0 }) 
    return (
      <div className={styles.main}>
        <h1>CART</h1>
        <hr/>
        {this.props.cart.map((item, index) => (
          <div className={styles.section} key={item.id}>
            <div className={styles.left}>
              <p>{item.brand}</p>
              <p>{item.name}</p>
              {item.prices
                .filter((price) => price.currency.symbol === this.props.symbol)
                .map((price, index) => <p key={index}>{this.props.symbol} {price.amount}</p>)
              }
              <p>SIZE:</p>
              <div className={styles.size_btns}>
              {item.attributes.map((attr) => attr.type === "text" && attr.items.map((i) => 
                <button 
                  type="button" 
                  test={item.isSelected}
                  className={item.size === i.value ? styles.selectedSize : ''}
                  onClick={()=> {this.props.handleSelectedSizeOfProduct(i.value, item.id)}}>
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
                  className={item.color === i.value ? styles.selectedColor : ''}
                  style={{ backgroundColor: `${i.value}`, border:"none"}}
                  onClick={(e)=> {this.props.handleSelectedColorOfProduct(i.value, item.id)}}>
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
              <div className={styles.slide}>
                <div className={styles.leftArrow} onClick={()=> {this.previousSlide(item)}}>&#8592;</div>
                <div className={styles.rightArrow} onClick={()=> this.nextSlide(item)}>&#8594;</div>
                <img src={item.gallery[this.state.indexes[item.id] || 0]} alt="img-slide" />
              </div>
            </div>
          </div>
        ))}
        <div className={styles.overall}>
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div>
             <p>{this.props.symbol}{tax}</p>
            <p>{totalQty}</p>
            <p>{this.props.symbol}{this.props.formatPrice({value: totalSum, digitCount:2})}</p>
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
