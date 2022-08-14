import { Component } from "react";
import styles from "./styles/Modal.module.css";

class CartModal extends Component {
  render() {
    return (
      <>
        <header onClick={this.props.onClick} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <p className={styles.heading}>My bags, 0 items</p>
            <div className={styles.modalBody}>
              <div className={styles.row1}>
                <div className={styles.row1Child}>
                  <p>Apollo Running Short</p>
                  <p>$ 50.00</p>
                  <p>Size:</p>
                  <p>
                    <button>XS</button>
                    <button>S</button>
                    <button>S</button>
                    <button>L</button>
                  </p>
                  <p>Color:</p>
                  <div className={styles.colorPick}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div className={styles.row2Child}>
                  <button type="button">+</button>
                  <p>1</p>
                  <button type="button">-</button>
                </div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmjc9qmRK0cCuBarjj_pwMLALU8-TYOrStbQ&usqp=CAU"
                  alt="Avatar"
                  style={{
                    width: "40%",
                    objectFit: "cover",
                    height: "auto",
                  }}
                />
              </div>
              <div className={styles.totalCheckout}>
                <p>Total:</p>
                <p>$200.00</p>
              </div>
            </div>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={this.props.onClick}>
                VIEW BAG
              </button>
              <button className={styles.cancelBtn} onClick={this.props.onClick}>
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
