import { useState,useEffect } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './App.css';

const App = () => {
const [ratesList, setRatesList] = useState([]);
const [base, setBase] = useState("EUR");

useEffect(() => {
  fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
  .then(res => res.json())
  .then(res => setRatesList(res))
  .catch(error=>console.log(error));
},[]);



var obj = Object.entries(ratesList);


const ratesTemp = [];

for (const [symbol, rate] of Object.entries(obj[1][1])){
  ratesTemp.push({ symbol, rate });
}


return (
  <div className="App">
  <select
        className="custom-select"
        value={base}
        onChange={(e) => {
          const value = e.target.value;
          setBase(value);
          
        }}
      >
        {obj.map((d) => (
          <option value={d.symbol} key={d.symbol}>
            {d.symbol}
          </option>
        ))}
      </select>
      <ul className="list-group">
        {obj.map((d) => (
          <li className="list-group-item" key={d.symbol}>
            {d.symbol} - {d.rate}
          </li>
        ))}
      </ul>

  </div>
);
}

export default App;