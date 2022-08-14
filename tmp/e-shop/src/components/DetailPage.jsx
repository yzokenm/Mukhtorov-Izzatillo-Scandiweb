import { Component } from "react";
import styles from "./styles/SingleItem.module.css";
import image from "./assets/images.png";
import { graphql } from "react-apollo";
import { gql } from "@apollo/client";
export const getQuery = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      id
    }
  }
`;
class DetailPage extends Component {
  displayProductDetails() {
    const { product } = this.props.data;
    console.log(product);
    if (product) {
      return (
        <main className={styles.main}>
          <section className={styles.section_one}>
            {product.gallery.map((img) => (
              <img src={img} alt="" />
            ))}
          </section>
          <section className={styles.section_two}>
            <img src={product.gallery[0]} alt="" />
          </section>
          <section className={styles.section_three}>
            <p>{product.brand}</p>
            <p>{product.name}</p>
            <p>SIZE:</p>
            {product.attributes.map((attr) => (
              <div className={styles.size_btns} key={attr.id}>
                {attr.items.map((item) => (
                  <button type="button">{item.value}</button>
                ))}
              </div>
            ))}
            <p>COLOR:</p>
            <div className={styles.color_btns}>
              <button type="button">R</button>
              <button type="button">G</button>
              <button type="button">B</button>
            </div>
            <p>PRICE:</p>
            {product.prices.slice(0, 1).map((price, index) => (
              <p key={index}>${price.amount}</p>
            ))}
            <button type="button" className={styles.add_card_btn}>
              ADD TO CARD
            </button>
            <div
              className={styles.details}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </section>
        </main>
      );
    } else {
      return <h1>No Product selected!</h1>;
    }
  }
  render() {
    return <>{this.displayProductDetails()}</>;
  }
}
export default graphql(getQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(DetailPage);
