import "./App.css";
import Home from "./components/Home";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewCart from "./components/ViewCart";
import MyNavbar from "./components/MyNavbar";
import ClothesComp from "./components/ClothesComp";
import TechComp from "./components/TechComp";
import DetailPage from "./components/DetailPage";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart: [],
      currencyBase: "$",
      isOptionsOpen: false,
      isModalOpen: false
    }

  }

  // FUNCTION TAKES PRODUCT AND ADDS TO CART MODAL 

  addToCartWithQty =(productToAdd)=> {
    let isInCart = false;
    let newCart = [...this.state.cart]
   
    for(let i = 0; i < newCart.length; i++){
      if(newCart[i].id === productToAdd.id){
        newCart[i].qty++
        isInCart = true
      }      
    }

    if(isInCart === false){
      newCart.push({
        id:productToAdd.id,
        brand: productToAdd.brand,
        name: productToAdd.name,
        prices: productToAdd.prices,
        gallery: productToAdd.gallery,
        attributes: productToAdd.attributes,
        qty: 1
      })
    }
    this.setState({
      cart:newCart
    })
  }

  // FUNCTION REMOVES PRODUCT FROM CART
  
  removeFromCart = (productIndex) => {
    let removefromCart = [...this.state.cart]
    if(removefromCart[productIndex].qty > 1){
      removefromCart[productIndex].qty--
    }else{
      removefromCart = removefromCart.filter((element, i) => i !== productIndex)
    }
    this.setState({
      cart: removefromCart
    })
  }

// Currency dropdown to change the currency of the store to one of the available currencies

  toggleOptions = () => {
    this.setState({
      isOptionsOpen:true
    })
  };

  setSelectedThenCloseDropdown = (option) => {
    this.setState({
      currencyBase: option,
      isOptionsOpen: false
    })
  };

  handleKeyDown = (option) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        this.setSelectedThenCloseDropdown(option);
        break;
      default:
        break;
    }
  };

  render() {
    let symbol = this.state.currencyBase.slice(0, 1)
    return (
      <Router>
          <MyNavbar 
            currencyBase={this.state.currencyBase}
            isOptionsOpen={this.state.isOptionsOpen}
            toggleOptions={this.toggleOptions}
            setSelectedThenCloseDropdown={this.setSelectedThenCloseDropdown}
            handleKeyDown={this.handleKeyDown}
            cart={this.state.cart}
            onClick={() => this.setState({ isModalOpen: true })}
          />
          <Routes>
            <Route path="/singleItem/:id" element={<DetailPage 
              symbol={symbol}
              addToCartWithQty={this.addToCartWithQty} 
              />} 
            />
            <Route path="/" element={<Home 
              onClick={() => this.setState({ isModalOpen: false })}
              selectedTab={this.state.selectedTab}
              isModalOpen={this.state.isModalOpen}
              cart={this.state.cart} 
              addToCartWithQty={this.addToCartWithQty} 
              removeFromCart={this.removeFromCart} 
              symbol={symbol}
            />} 
            />
            <Route path="/clothes" element={<ClothesComp
              symbol={symbol}
              addToCartWithQty={this.addToCartWithQty}
            />}/>
            <Route path="/tech" element={<TechComp
              symbol={symbol}
              addToCartWithQty={this.addToCartWithQty}
            />}/>
            <Route path="/ViewCart" element={<ViewCart cart={this.state.cart} 
              removeFromCart={this.removeFromCart} 
              addToCartWithQty={this.addToCartWithQty} 
              symbol={symbol}
              />}
            />
          </Routes>
      </Router>
    );
  }
}

export default App;
