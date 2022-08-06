import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error'

// const errorLink = onError((({graphqlErrors, networkErrors})=> {
//   if(graphqlErrors){
//     graphqlErrors.map(({message, location, path})=> {
//       alert(`Graphql errro ${message}`)
//     })
//   }
// }))
// const link = from ([
//   errorLink,
//   new HttpLink({uri:"http://localhost:4000/all"})
// ])

const client = new ApolloClient({
  uri: "http://localhost:4000/tech",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
     <App />
    </ApolloProvider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
