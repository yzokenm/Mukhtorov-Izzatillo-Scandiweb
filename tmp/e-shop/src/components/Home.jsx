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
      selectedCard: false,
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

  handleSelectedCard = (id) => {
    this.setState({
      selectedCard: true,
    });
  };
  render() {
    const data = this.props.data;
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
              <select name="currency" id="currency">
                <option value="currency">$</option>
                <option value="currency">¥</option>
                <option value="currency">₽</option>
                <option value="currency">A$</option>
                <option value="currency">£</option>
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
            {data.products.map((product) => (
              <Link to={`/singleItem/${product.id}`}>
                <main
                  className={styles.card_main}
                  key={product.id}
                  onClick={() => this.handleSelectedCard(product.id)}
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
        ) : this.state.selectedTab === 2 ? (
          <h1>this is for man</h1>
        ) : this.state.selectedTab === 3 ? (
          <h1>this is for kids</h1>
        ) : null}
        {this.state.isModalOpen && (
          <CartModal
            props={data}
            onClick={() => this.setState({ isModalOpen: false })}
          />
        )}
      </>
    );
  }
}
export default Home;
