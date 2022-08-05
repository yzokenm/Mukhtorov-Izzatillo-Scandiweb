import React, {Component} from 'react'
import logo from './assets/a-logo.svg'
import cartIcon from './assets/Empty Cart.svg'
import asd from './assets/asd.webp'
class Home extends Component {
    render(){
        return(
            <>
                <main>
                    <nav className="ph-line-nav">
                        <a href="#A1" id="A1">Woman</a>
                        <a href="#A2" id="A2">Man</a>
                        <a href="#A3" id="A3">Kids</a>
                        <div className="effect"></div>
                    </nav>
                    <div><img src={logo} /></div>
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
                            <div><img src={cartIcon}/></div>
                    </div>
                </main>
                <section>
                <div className="card">
                    <img src={asd} alt="Avatar"  />
                    <div className="container">
                        <h4><b>Izzatillo Mukhtorov</b></h4> 
                        <p>Full stack developer</p> 
                    </div>
                </div>
                </section>
            </>
        )
    }
}
export default Home