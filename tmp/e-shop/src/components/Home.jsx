import React, { Component } from "react";
import cartImg from "./assets/Circle Icon.svg";
import { Link } from "react-router-dom";
import styles from "./styles/Home.module.css";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
      title:''
    };

    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });

    client.query({query: gql`
          query Query {
            category(input: { title: "all" }) {
              name
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
      .then((result) => {this.setState({allProduct: result.data.category, title: result.data.category.name })})}
      
  render() {
    return (
      <>
        <h1 className={styles.title}>Category {this.state.title.charAt(0).toUpperCase() + this.state.title.slice(1)}</h1>
          <div className={styles.card_section}>
            {this.state.allProduct.products?.map((product) => (
              <div className={styles.card_main} key={product.id}>
                <Link to={`/singleItem/${product.id}`} className={styles.link_item}>
                  <img className={styles.product_img} src={product.gallery[0]} alt=""/>
                  <label>
                    <p>{product.name}</p>
                    {product.prices.filter((item) => item.currency.symbol === this.props.symbol).map((price, index) => (
                      <p key={index}>{this.props.symbol} {price.amount}</p>
                    ))}
                  </label>
                </Link>
                <img src={cartImg} alt="cartImg" onClick={() => this.props.addToCartWithQty(product)}/>
              </div>
            ))}
          </div>
       
      </>
    );
  }
}
export default Home;
