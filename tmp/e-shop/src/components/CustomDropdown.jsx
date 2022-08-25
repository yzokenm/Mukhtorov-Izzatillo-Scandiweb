import { Component } from "react";
import './styles/CustomSelect.css'

class CustomDropdown extends Component {
    optionsList = [
      "$ USD",
      "£ GBP",
      "¥ JPY",
      "₽ RUB",
      "A$ AUD"
    ];
    render(){
      return (
          <div className="wrapper">
          <div className="container">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={this.props.isOptionsOpen}
              onClick={this.props.toggleOptions}
              value={this.optionsList[this.props.currencyBase]}
              onChange={(e)=> this.setState({currencyBase : e.target.value})}
            >
              {this.props.currencyBase.slice(0, 2)}<i className="arrow down"></i>
            </button>
            <ul
              className={`options ${this.props.isOptionsOpen ? "show" : ""}`}
              role="listbox"
              aria-activedescendant={this.optionsList[this.props.currencyBase]}
              tabIndex={-1}
            >
              {this.optionsList.map(option => (
                <li
                  id={option}
                  role="option"
                  aria-selected={this.props.currencyBase === option}
                  tabIndex={0}
                  onClick={() => {
                    this.props.setSelectedThenCloseDropdown(option);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )

    }
}
export default CustomDropdown