import { Component } from "react";
import './styles/CustomSelect.css'

class CustomDropdown extends Component {
    optionsList = [
      "$ USD",
      "A$ AUD",
      "£ GBP",
      "¥ JPY",
      "₽ RUB"
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
              value={this.optionsList[this.props.selectedOption]}
              onChange={(e)=> this.setState({selectedOption : e.target.value})}
            >
              {this.props.selectedOption.slice(0, 2)}<i className="arrow down"></i>
            </button>
            <ul
              className={`options ${this.props.isOptionsOpen ? "show" : ""}`}
              role="listbox"
              aria-activedescendant={this.optionsList[this.props.selectedOption]}
              tabIndex={-1}
            >
              {this.optionsList.map((option, index) => (
                <li
                  id={option}
                  role="option"
                  aria-selected={this.props.selectedOption == option}
                  tabIndex={0}
                  onKeyDown={this.props.handleKeyDown(option)}
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