import "./App.scss";

import Investments from "./components/Investments"

function App() {
    return (
        <div className="container-fluid">
            <header>
                <h1>Hello, John</h1>
            </header>

            <section className="block">
                <div className="block__balance">
                    <h2>Your Balance</h2>
                    <strong>$100.00</strong>
                </div>
            </section>

            <Investments />
        </div>
    );
}

export default App;

//TODO
///get crypto api - done
///get stocks api

///output crypto api
///output stocks api

///create current stock/crypto json

///compare current price vs how much it was bought
///output gains/loss per item

///output total
