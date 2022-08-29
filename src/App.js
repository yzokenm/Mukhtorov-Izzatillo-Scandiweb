import "./App.css";
import Home from "./components/Home";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewCart from "./components/ViewCart";
import MyNavbar from "./components/MyNavbar";
import ClothesComp from "./components/ClothesComp";
import TechComp from "./components/TechComp";
import DetailPage from "./components/DetailPage";
import CartModal from "./components/CartModal";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart: [],
      currencyBase: "$",
      isOptionsOpen: false,
      isModalOpen: false,
      isAttributSelected: true,
      isSelected:false
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
        qty: 1,
        size: 0,
        color: 0
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

  // FUNCTION TO UPDATE SELECTED SIZE OF THE ATTRIBUTES OF PRODUCT IN THE CART
  handleSelectedSizeOfProduct = (value, id) => {
    let newCart = [...this.state.cart]
    let index = newCart.findIndex(e => e.id === id)
    if (newCart[index].size !== value || newCart[index].size === null ) {
      newCart[index].size = value
    }else{
      newCart[index].size = null
    }
    this.setState({
      cart: newCart
    })
}

  // FUNCTION TO UPDATE SELECTED COLOR OF THE ATTRIBUTES OF PRODUCT IN THE CART
  handleSelectedColorOfProduct =(value, id)=> {
    let newCart = [...this.state.cart]
    let index = newCart.findIndex(e => e.id === id)
    if (newCart[index].color !== value || newCart[index].color === null ) {
      newCart[index].color = value
    }else{
      newCart[index].color = null
    }
    this.setState({
      cart: newCart
    })
  }

  // Currency dropdown to change the currency of the store 
  // to one of the available currencies
  toggleCurrencyDropdownOption = () => {
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
  
  //  FUNCTION TAKES OBJECT AS AN ARGUMENT WHICH CONTAINS VALUE AND 
  //  DIGIT NUMBER. VALUE WILL BE SEPERATED AFTER THOUSANDS AND DIGITCOUNT 
  //  IS A NUMBER OF DECIMALS AFTER INTEGER  
  formatPrice=(params)=> {
    if (!params.value) {
      return (0).toFixed(params.digitCount ?? 2).toString();
    }
    return params.value
      .toFixed(params.digitCount ?? 2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  render() {
    let symbol = this.state.currencyBase.slice(0, 1)
    return (
      <Router>
          <MyNavbar 
            currencyBase={this.state.currencyBase}
            isOptionsOpen={this.state.isOptionsOpen}
            toggleCurrencyDropdownOption={this.toggleCurrencyDropdownOption}
            setSelectedThenCloseDropdown={this.setSelectedThenCloseDropdown}
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
              selectedTab={this.state.selectedTab}
              isModalOpen={this.state.isModalOpen}
              cart={this.state.cart} 
              addToCartWithQty={this.addToCartWithQty} 
              removeFromCart={this.removeFromCart} 
              symbol={symbol}
              formatPrice={this.formatPrice}
            />} 
            />
            <Route path="/clothes" element={<ClothesComp
              symbol={symbol}
              addToCartWithQty={this.addToCartWithQty}
              formatPrice={this.formatPrice}
              />}
            />
            <Route path="/tech" element={<TechComp
              symbol={symbol}
              addToCartWithQty={this.addToCartWithQty}
              formatPrice={this.formatPrice}
              />}
            />
            <Route path="/ViewCart" element={<ViewCart cart={this.state.cart} 
              removeFromCart={this.removeFromCart} 
              addToCartWithQty={this.addToCartWithQty} 
              symbol={symbol}
              handleSelectedSizeOfProduct={this.handleSelectedSizeOfProduct}
              handleSelectedColorOfProduct={this.handleSelectedColorOfProduct}
              formatPrice={this.formatPrice}
              />}
            />
          </Routes>
          {this.state.isModalOpen && (
            <CartModal
              onClick={() => this.setState({ isModalOpen: false })}
              cart={this.state.cart}
              addToCartWithQty={this.addToCartWithQty}
              removeFromCart={this.removeFromCart}
              qty={this.state.qty}
              symbol={symbol}
              handleSelectedSizeOfProduct={this.handleSelectedSizeOfProduct}
              formatPrice={this.formatPrice}
            />
          )}
      </Router>
    );
  }
}

export default App;
