import { Component } from "react";
import { Link } from "react-router-dom";
import modalStyles from "./styles/Modal.module.css";

class CartModal extends Component {
  render() {
    return (
      <>
        <header onClick={this.props.onClick} />
        <div className={modalStyles.centered}>
          <div className={modalStyles.modal}>
            <p className={modalStyles.heading}>
              My bags, {this.props.cart.length} items
            </p>
            {this.props.cart.map((item, index) => (
              <div className={modalStyles.modalBody} key={item.id}>
                <div className={modalStyles.row1}>
                  <div className={modalStyles.row1Child}>
                    <p>
                      <strong>{item.brand}</strong>
                      <br /> {item.name}
                    </p>
                    {item.prices.slice(0, 1).map((price) => (
                      <p>$ {price.amount}</p>
                    ))}
                    <p>Size:</p>
                    <p>
                      <button>XS</button>
                      <button>S</button>
                      <button>S</button>
                      <button>L</button>
                    </p>
                    <p>Color:</p>
                    <div className={modalStyles.colorPick}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div className={modalStyles.row2Child}>
                    <button
                      type="button"
                      onClick={()=> {this.props.addToCartWithQty(item)}}
                    >
                      +
                    </button>
                    <p>{this.props.qty}</p>
                    <button type="button" onClick={()=> {this.props.removeFromCart(index)}}>-</button>
                  </div>
                  <img
                    src={item.gallery[0]}
                    alt="Avatar"
                  />
                </div>

                <div className={modalStyles.totalCheckout}>
                  <p>Total:</p>
                  <p>
                    $
                    {item.prices.reduce(
                      (prevValue, currentValue) =>
                        prevValue + currentValue.amount,
                      0
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div className={modalStyles.actionsContainer}>
              <Link to={"/ViewCart"}>
                <button className={modalStyles.deleteBtn}>VIEW BAG</button>
              </Link>
              <button
                className={modalStyles.cancelBtn}
                onClick={this.props.onClick}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CartModal;
