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
      isModalOpen: false,
      black: true
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

  handleSelectedSizeOfProduct =(e, id)=> {
    let newCart = [...this.state.cart]
    if(e.target.value){
      for(let i = 0; i < newCart.length; i++){
        if(newCart[i].id === id){
          this.setState({black: !this.state.black})
          if(this.state.black){
            newCart[i].size = e.target.value
            e.target.style.backgroundColor = "black"
            e.target.style.color = 'white' 
          }else{
            e.target.style.backgroundColor = "white"
            e.target.style.color = 'black' 
            newCart[i].size = null
          }
        }
      }
    }
  }

  handleSelectedColorOfProduct =(e, id)=> {
    let newCart = [...this.state.cart]
    for(let i = 0; i < newCart.length; i++){
      if(newCart[i].id === id){
        this.setState({black: !this.state.black})
        if(this.state.black){
          newCart[i].color = e.target.value
          e.target.style.border = '1px solid #5DCF7B'
        }else{
          newCart[i].color = null
          e.target.style.border = "none"
        }

      }

      }
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
  
  //  FUNCTION TAKES OBJECT AS AN ARGUMENT WHICH CONTAINS VALUE AND 
  //  DIGIT NUMBER. VALUE WILL BE SEPERATED AFTER THOUSANDS AND DIGITCOUNT IS NUMBER OF DECIMALS AFTER FRACTIONS 

  formatNumber=(params)=> {
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
            toggleOptions={this.toggleOptions}
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
              onClick={() => this.setState({ isModalOpen: false })}
              selectedTab={this.state.selectedTab}
              isModalOpen={this.state.isModalOpen}
              cart={this.state.cart} 
              addToCartWithQty={this.addToCartWithQty} 
              removeFromCart={this.removeFromCart} 
              symbol={symbol}
              formatNumber={this.formatNumber}
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
              handleSelectedSizeOfProduct={this.handleSelectedSizeOfProduct}
              handleSelectedColorOfProduct={this.handleSelectedColorOfProduct}
              formatNumber={this.formatNumber}
              />}
            />
          </Routes>
      </Router>
    );
  }
}

export default App;
