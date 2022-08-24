import { Component } from "react";
import { Link } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import styles from "./styles/Home.module.css";
import logo from "./assets/a-logo.svg";
import cartIcon from "./assets/Empty Cart.svg";
class MyNavbar extends Component {
    render(){
        return (
            <main className={styles.main_navbar}>
                <div className={styles.wrapper}>
                    <Link to="/"><a href="#woman">Woman</a></Link>
                    <Link to="/tech"><a href="#man">Man</a></Link>
                    <Link to="clothes"><a href="#kids">Kids</a></Link>
                </div>
                <Link to="/"><img src={logo} alt="logo" /></Link>
                <div>
                    <CustomDropdown 
                        currencyBase={this.props.currencyBase}
                        isOptionsOpen={this.props.isOptionsOpen}
                        toggleOptions={this.props.toggleOptions}
                        setSelectedThenCloseDropdown={this.props.setSelectedThenCloseDropdown}
                        handleKeyDown={this.props.handleKeyDown}
                    />
                <div className={styles.main_cart_section}>
                    <img src={cartIcon} alt="cartIcon" onClick={this.props.onClick} className={styles.cart_icon}/>
                    <div className={styles.cart_badge}>{this.props.cart.length}</div>
                </div>
                </div>
          </main>
        )
    }
}
export default MyNavbar