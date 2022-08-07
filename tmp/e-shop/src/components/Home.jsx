import React, { Component } from "react";
import logo from "./assets/a-logo.svg";
import cartIcon from "./assets/Empty Cart.svg";
import Man from "./Man";
import Kids from "./Kids";
import cartImg from "./assets/Circle Icon.svg";
import CartModal from "./CartModal";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      isModalOpen: false,
    };
    this.handleSelectedTab = this.handleSelectedTab.bind(this);
  }
  handleSelectedTab(event) {
    console.log(event.target.tab);
    if ((event.target.tab = 1)) {
      this.setState({
        selectedTab: 1,
      });
    } else if ((event.target.tab = 2)) {
      this.setState({
        selectedTab: 2,
      });
    } else if ((event.target.tab = 3)) {
      this.setState({
        selectedTab: 3,
      });
    }
    console.log("pROPS", this.props.props);
  }
  render() {
    const data = this.props.props
    return (
      <container>
        <main>
          <nav>
            <a href="#A1" id="A1" data-tab="1" onClick={this.handleSelectedTab}>
              Woman
            </a>
            <a href="#A2" id="A2" data-tab="2" onClick={this.handleSelectedTab}>
              Man
            </a>
            <a href="#A3" id="A3" data-tab="3" onClick={this.handleSelectedTab}>
              Kids
            </a>
            <div></div>
          </nav>
          <img src={logo} alt="logo" />
          <div>
            <form>
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
          <section>
            {data.categories.map((product, index) => (
              <>
                <main key={index}>
                  <img
                    src={product.products[1].gallery[4]}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "350px",
                    }}
                  />
                  <label>
                    <p>
                      <b>{product.products[0].brand}</b>
                    </p>
                    <strong>
                      <p>${product.products[1].prices[0].amount}</p>
                    </strong>
                  </label>
                  <img src={cartImg} alt="cartImg" />
                </main>
              </>
            ))}
          </section>
        ) : this.state.selectedTab === 2 ? (
          <Man />
        ) : this.state.selectedTab === 3 ? (
          <Kids />
        ) : null}
        {this.state.isModalOpen && <CartModal props={data} onClick={() => this.setState({isModalOpen: false})} />}
      </container>
    );
  }
}
export default Home;
