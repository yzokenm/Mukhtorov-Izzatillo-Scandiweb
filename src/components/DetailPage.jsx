import { Component } from "react";
import styles from "./styles/SingleItem.module.css";
import { gql } from "@apollo/client";
import {Query} from 'react-apollo'
import { useParams } from "react-router-dom";

export function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class DetailPage extends Component {
  render() {
  const getQuery = gql`
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
      }
    }
  `;
    let { id } = this.props.params;
    return (
      <Query query={getQuery} variables={{id}}>
        {({loading, error, data})=> {
          if(loading) return (<h1 className={styles.loading}>Loading...</h1>);
          if(error) console.log(error);
          if(data) return (
            <main className={styles.main}>
            <section className={styles.section_one}>
              {data.product.gallery.map((img, index) => (<img src={img} alt="" key={index} />))}
            </section>
            <section className={styles.section_two}>
              <img src={data.product.gallery[0]} alt="" />
            </section>
            <section className={styles.section_three}>
              <p>{data.product.brand}</p>
              <p>{data.product.name}</p>
              <p>SIZE:</p>
              <div className={styles.size_btns}>
              {data.product.attributes.map((attr) => attr.type === "text" && attr.items.map((i) => 
                <button type="button" value={i.value}>{i.value}</button>))}
              </div>
              <p>COLOR:</p>
              <div className={styles.color_btns}>
              {data.product.attributes.map((attr) => attr.type === "swatch" && attr.items.map(i => (
                <button type="button" value={i.value} style={{ backgroundColor: `${i.value}`, border:"none"}}></button>)))}
              </div>
              <p>PRICE:</p>
              {data.product.prices.filter((item) => item.currency.symbol === this.props.symbol)
                .map((price, index) => (<p key={index}>{this.props.symbol} {price.amount}</p>))}
              <button type="button" className={styles.add_card_btn} onClick={() => this.props.addToCartWithQty(data.product)}>
                ADD TO CARD
              </button>
              <div className={styles.details} dangerouslySetInnerHTML={{ __html: data.product.description }}/>
            </section>
          </main>
        )}}
      </Query>
    );
  }
}
export default withParams(DetailPage);
