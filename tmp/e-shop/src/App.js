import "./App.css";
import Home from "./components/Home";
import React, { Component } from "react";
import { request, gql } from "graphql-request";

const query = gql`
  query Query {
    categories {
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
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    request('http://localhost:4000/all', query).then((data) => {
      this.setState({
        products:data
      })
    })
  }
  render() {
    return (
      <>
        <Home props={this.state.products} />
      </>
    );
  }
}

export default App;
