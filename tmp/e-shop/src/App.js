import "./App.css";
import Home from "./components/Home";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SingleItem from "./components/SingleItem";
import ViewCart from "./components/ViewCart";
import logo from "./components/assets/a-logo.svg";
import cartIcon from "./components/assets/Empty Cart.svg";
import styles from "./components/styles/Home.module.css";
import CustomDropdown from "./components/CustomDropdown";

class App extends Component {
  state = {
    cart:[],
    qty:0,
    selectedOption: "$",
    isOptionsOpen: false,
    selectedTab: 0,
    isModalOpen: false,
  }


  toggleOptions = () => {
    this.setState({
      isOptionsOpen:true
    })
  };

  setSelectedThenCloseDropdown = (option) => {
    this.setState({
      selectedOption: option,
      isOptionsOpen: false
    })
  };

  handleKeyDown = (option) => (e) => {
    console.log("OPTION",option);
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

  handleSelectedTab(event) {
    if (event.target.getAttribute("href") === "#woman") {
      this.setState({
        selectedTab: 1,
      });
    } else if (event.target.getAttribute("href") === "#man") {
      this.setState({
        selectedTab: 2,
      });
    } else {
      this.setState({
        selectedTab: 3,
      });
    }
  }
  
  addToCart = (selectedProduct) => {
    let newCart = [...this.state.cart];
    newCart.push(selectedProduct)
    this.setState({
      cart:newCart
    })
  };

  addToCartWithQty =(productToAdd)=> {
    let newProduct = [...this.state.cart]
    let indexOfElementInCart = this.state.cart.findIndex((element) => element.id === productToAdd.id)
    if (indexOfElementInCart >= 0) {
      this.setState({
        qty : this.state.qty + 1
      })
    } 
    newProduct.push(productToAdd)
      this.setState({
      cart:newProduct
    })
  }
  
  removeFromCart = (productIndex) => {
    let newCart = [...this.state.cart]
    let findIndex = newCart.findIndex(item=> item.id === productIndex)
    newCart.splice(findIndex, 1)
    this.setState({
      cart:newCart,
      qty: this.state.qty - 1
    })
  }



  render() {
    let symbol = this.state.selectedOption.slice(0, 1)
    return (
      <Router>
        <main className={styles.main_navbar}>
            <div className={styles.wrapper}>
              <a href="#woman" onClick={(e)=> {this.handleSelectedTab(e)}}>Woman</a>
              <a href="#man" onClick={(e)=> {this.handleSelectedTab(e)}}>Man</a>
              <a href="#kids" onClick={(e)=> {this.handleSelectedTab(e)}}>Kids</a>
            </div>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div>
              <CustomDropdown 
              selectedOption={this.state.selectedOption}
              isOptionsOpen={this.state.isOptionsOpen}
              toggleOptions={this.toggleOptions}
              setSelectedThenCloseDropdown={this.setSelectedThenCloseDropdown}
              handleKeyDown={this.handleKeyDown}
              />
              <div className={styles.main_cart_section}>
                <img src={cartIcon} alt="cartIcon" onClick={() => this.setState({ isModalOpen: true })} className={styles.cart_icon}/>
                <div className={styles.cart_badge}>{this.state.cart.length}</div>
              </div>
            </div>
          </main>
          <Routes>
            <Route path="/singleItem/:id" element={<SingleItem 
              symbol={symbol}
              addToCart={this.addToCart}
              />} 
            />
            <Route path="/" element={<Home 
              onClick={() => this.setState({ isModalOpen: false })}
              selectedTab={this.state.selectedTab}
              isModalOpen={this.state.isModalOpen}
              currencyBase={this.state.currencyBase}
              addToCart={this.addToCart}  
              cart={this.state.cart} 
              addToCartWithQty={this.addToCartWithQty} 
              removeFromCart={this.removeFromCart} 
              qty={this.state.qty}
              symbol={symbol}
              />} 
            />
            <Route path="/ViewCart" element={<ViewCart cart={this.state.cart} 
              removeFromCart={this.removeFromCart} 
              addToCartWithQty={this.addToCartWithQty} 
              qty={this.state.qty}
              symbol={symbol}
              />}
            />
          </Routes>
      </Router>
    );
  }
}

export default App;
