import { Component } from "react";
import styles from "./styles/ViewCart.module.css";
class SingleProduct extends Component{
    render(){
        return (
            <div className={styles.size_btns}>
            {this.props.cart?.map((product) =>
              product.attributes.map((attr) => attr.type === this.props.type && attr.items.map((item) => (
                <button type="button" value={item.value} onClick={(e)=> {this.handleSelectedAttribute(e)}}>{item.value}</button>
              )))
            )}
          </div>
        )
    }
}
export default SingleProduct