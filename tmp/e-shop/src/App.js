import "./App.css";
import Home from "./components/Home";
import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleItem from "./components/SingleItem";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
      tech: [],
      clothes: [],
    };

    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });
    
    client
      .query({
        query: gql`
          query Query {
            category(input:{title: "all"}) {
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
      .then((result) => 
      {
        this.setState({
          allProduct: result.data.category
        })
      }
      );

      
    client
    .query({
      query: gql`
        query Query {
          category(input:{title: "tech"}) {
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
    .then((result) => 
    {
      this.setState({
        tech: result.data.category
      })
    }
    );


    
    client
      .query({
        query: gql`
          query Query {
            category(input:{title: "clothes"}) {
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
      .then((result) => 
      {
        this.setState({
          clothes: result.data.category
        })
      }
      );
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/singleItem/:id" element={<SingleItem />} />
          <Route path="/" element={<Home allProduct={this.state.allProduct} tech={this.state.tech} clothes={this.state.clothes}/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
