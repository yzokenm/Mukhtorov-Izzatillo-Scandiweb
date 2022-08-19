import React, { Component } from "react";
import cartImg from "./assets/Circle Icon.svg";
import CartModal from "./CartModal";
import { Link } from "react-router-dom";
import styles from "./styles/Home.module.css";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import ClothesComp from "./ClothesComp";
import TechComp from "./TechComp";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
    };

    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query Query {
            category(input: { title: "all" }) {
              products {
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
              }
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          allProduct: result.data.category,
        });
      });
  }

  render() {
    return (
      <>
        {this.props.selectedTab === 1 ? (
          <section className={styles.card_section}>
            {this.state.allProduct.products?.map((product) => (
              <main className={styles.card_main} key={product.id}>
                <Link to={`/singleItem/${product.id}`} className={styles.link_item}>
                  <img className={styles.product_img} src={product.gallery[0]} alt=""/>
                  <label>
                    <p>{product.name}</p>
                    {product.prices
                      .filter(
                        (item) =>
                          item.currency.symbol === this.props.currencyBase
                      )
                      .map((price, index) => (
                        <p key={index}>
                          {this.props.currencyBase} {price.amount}
                        </p>
                      ))}
                  </label>
                </Link>
                <img src={cartImg} alt="cartImg" onClick={() => this.props.addToCart(product)}/>
              </main>
            ))}
          </section>
        ) : this.props.selectedTab === 2 ? (
          <TechComp />
        ) : (
          <ClothesComp />
        )}
        {this.props.isModalOpen && (
          <CartModal
            onClick={this.props.onClick}
            cart={this.props.cart}
            addToCartWithQty={this.props.addToCartWithQty}
            removeFromCart={this.props.removeFromCart}
            qty={this.props.qty}
          />
        )}
      </>
    );
  }
}
export default Home;
