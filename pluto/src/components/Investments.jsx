import React, { useState, useEffect } from "react";

const Investments = () => {
    const apiKey = process.env.REACT_APP_LUNAR_API_KEY;
    const [isLoadedApi, SetIsLoadedApi] = useState(false);
    const [coins, setCoin] = useState({});
    const [investments, setInvestments] = useState({});
    const [investmentString, setInvestmentString] = useState();

    useEffect(() => {
        fetch("./investments.json")
            .then((response) => response.json())
            .then((data) => {
                let investList = [];
                Object.entries(data).map((value, index) => {
                    // console.log(value.[1].name)
                    investList.push(value[1].name);
                });
                const investListString = investList.join(",");
                console.log(data)
                return (setInvestmentString(investListString))
            });
    }, []);

    useEffect(() => {
        if (investmentString) {
            fetch(
                `https://api.lunarcrush.com/v2?data=assets&key=${apiKey}&symbol=${investmentString}`
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setCoin(result.data);
                        SetIsLoadedApi(true);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }, [isLoadedApi, investmentString]);

    return (
        <section>
            <h2>Investments</h2>
            <div className="wrapper">
                {isLoadedApi &&
                    coins.map((coin, index) => {
                        return (
                            <div key={index} className="block">
                                <div className="block__investment">
                                    <h3>
                                        {coin.name} <span>{coin.symbol}</span>
                                    </h3>
                                    <strong>Current Price: {coin.price}</strong>
                                    <ul>
                                        <li>
                                            <span>Change 24H:</span>{" "}
                                            {coin.percent_change_24h}
                                        </li>
                                        <li>
                                            <span>Change 7d:</span>{" "}
                                            {coin.percent_change_7d}
                                        </li>
                                        <li>
                                            <span>Change 30d:</span>{" "}
                                            {coin.percent_change_30d}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default Investments;
