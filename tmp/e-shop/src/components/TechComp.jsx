import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Component } from "react";
import { Link } from "react-router-dom";
import cartImg from "./assets/Circle Icon.svg";
import ClothesComp from "./ClothesComp";
import styles from "./styles/Home.module.css";
class TechComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: [],
      title:''
    };
    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql`
          query Query {
            category(input: { title: "tech" }) {
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
      .then((result) => {
        this.setState({
          tech: result.data.category,
          title: result.data.category.name
        });
      });
  }
  render() {
    return (
      <>
        <h1 className={styles.title}>Category {this.state.title.charAt(0).toUpperCase() + this.state.title.slice(1)}</h1>
        <section className={styles.card_section}>
          {this.state.tech.products?.map((product) => (
            <main className={styles.card_main} key={product.id}>
              <Link to={`/singleItem/${product.id}`} className={styles.link_item}>
                <img src={product.gallery[0]} alt="" className={styles.product_img}/>
                <label>
                  <p>{product.name}</p>
                  {product.prices.filter((item) => item.currency.symbol === this.props.symbol).map((price, index) => (
                    <p key={index}>{this.props.symbol} {price.amount}</p>
                  ))}
                </label>
              </Link>
              <img src={cartImg} alt="cartImg" onClick={() => this.props.addToCartWithQty(product)} />
            </main>
          ))}
        </section>
      </>
    );
  }
}
export default TechComp;
