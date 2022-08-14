import React, { Component } from "react";
import logo from "./assets/a-logo.svg";
import cartIcon from "./assets/Empty Cart.svg";
import cartImg from "./assets/Circle Icon.svg";
import CartModal from "./CartModal";
import { Link } from "react-router-dom";
import styles from "./styles/Home.module.css";
import SingleItem from "./SingleItem";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      isModalOpen: false,
      currencyBase:"$",
      dollarSymbol: false,
      poundSymbol: false,
      euroSymbol: false,
    };

    this.handleSelectedTab = this.handleSelectedTab.bind(this);
  }
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
  componentDidMount(){
    this.state.currencyBase === '$' ? this.setState({ dollarSymbol: true})
    : this.state.currencyBase === "€" ? this.setState({ euroSymbol: true})
    : this.setState({poundSymbol:true})
  }
  render() {
    const allProduct = this.props.allProduct;
    const techProduct = this.props.tech;
    const clothProduct = this.props.clothes;
    console.log(allProduct);
    return (
      <>
        <main className={styles.main_navbar}>
          <nav className={styles.sub_navbar}>
            <a href="#woman" onClick={this.handleSelectedTab}>
              Woman
            </a>
            <a href="#man" onClick={this.handleSelectedTab}>
              Man
            </a>
            <a href="#kids" onClick={this.handleSelectedTab}>
              Kids
            </a>
            <div></div>
          </nav>
          <img src={logo} alt="logo" />
          <div>
            <form className={styles.select_currency}>
              <select id="currency" value={this.state.currencyBase} onChange={(e)=> this.setState({currencyBase:e.target.value})}>
                <option>$</option>
                <option>A$</option>
                <option>£</option>
                <option>¥</option>
                <option>₽</option>
              </select>
            </form>
            <div>
              <img
                src={cartIcon}
                alt="cartIcon"
                onClick={() => this.setState({ isModalOpen: true })}
              />
            </div>
          </div>
        </main>
        {this.state.selectedTab === 1 ? (
          <section className={styles.card_section}>
            {allProduct.products.map((product) => (
              <Link to={`/singleItem/${product.id}`} className={styles.link_item}>
                <main
                  className={styles.card_main}
                  key={product.id}
                >
                  <img
                    className={styles.product_img}
                    src={product.gallery[0]}
                    alt=""
                  />
                  <label>
                    <p>{product.name}</p>
                    {product.prices.filter(item=> item.currency.symbol === this.state.currencyBase).map((price, index) => ( 
                      <p key={index}>{this.state.currencyBase}{price.amount}</p> 
                    ))}
                  </label>
                  <img src={cartImg} alt="cartImg" />
                </main>
              </Link>
            ))}
          </section>
        ) : this.state.selectedTab === 2 ? (
          <section className={styles.card_section}>
            {techProduct.products.map((product) => (
              <Link to={`/singleItem/${product.id}`}>
                <main
                  className={styles.card_main}
                  key={product.id}
                >
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
                  <img src={cartImg} alt="cartImg" />
                </main>
              </Link>
            ))}
          </section>
        ) : this.state.selectedTab === 3 ? (
          <section className={styles.card_section}>
            {clothProduct.products.map((product) => (
              <Link to={`/singleItem/${product.id}`}>
                <main
                  className={styles.card_main}
                  key={product.id}
                >
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
                  <img src={cartImg} alt="cartImg" />
                </main>
              </Link>
            ))}
          </section>
        ) : null}
        {this.state.isModalOpen && (
          <CartModal
            props={allProduct}
            onClick={() => this.setState({ isModalOpen: false })}
          />
        )}
      </>
    );
  }
}
export default Home;
