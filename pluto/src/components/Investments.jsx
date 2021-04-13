import React, { useState, useEffect } from "react";

const Investments = () => {
    const apiKey = process.env.REACT_APP_LUNAR_API_KEY;
    const [coins, setCoin] = useState({});

    useEffect(() => {
        fetch(
            `https://api.lunarcrush.com/v2?data=assets&key=${apiKey}&symbol=BTC,LTC,ETH`
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setCoin(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <section>
            <h2>Investments</h2>
            {coins.map((coin, index) => {
                return (
                    <div key={index} className="block">
                        <div className="block__investment">
                          <h3>{coin.name}</h3>
                          <em>{coin.symbol}</em>
                          <strong>{coin.price}</strong>
                          <ul>
                            <li><span>Change 24H:</span> {coin.percent_change_24h}</li>
                            <li><span>Change 7d:</span> {coin.percent_change_7d}</li>
                            <li><span>Change 30d:</span> {coin.percent_change_30d}</li>
                          </ul>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default Investments;