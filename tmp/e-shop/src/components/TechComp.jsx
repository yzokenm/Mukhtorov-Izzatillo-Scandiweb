import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Component } from "react";
import { Link } from "react-router-dom";
import cartImg from "./assets/Circle Icon.svg";
import styles from "./styles/Home.module.css";
class TechComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: [],
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
        });
      });
  }
  render() {
    return (
      <section className={styles.card_section}>
        {this.state.tech.products?.map((product) => (
          <main className={styles.card_main} key={product.id}>
            <Link to={`/singleItem/${product.id}`} className={styles.link_item}>
              <img
                src={product.gallery[0]}
                alt=""
                className={styles.product_img}
              />
              <label>
                <p>{product.name}</p>
                {product.prices.slice(0, 1).map((price, index) => (
                  <p key={index}>${price.amount}</p>
                ))}
              </label>
            </Link>
            <img src={cartImg} alt="cartImg" />
          </main>
        ))}
      </section>
    );
  }
}
export default TechComp;
