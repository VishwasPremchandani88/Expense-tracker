// import { response } from 'express';
import './App.css';
import {useEffect,useState} from 'react';

function App() {
  const [name,setName] = useState('');
  const [datetime,setDatetime] = useState('');
  const[description,setDescription] = useState('');
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions);
  },[]);
  async function getTransactions(){
    const url= process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }
  function addNewTransaction(ev)
  {
    ev.preventDefault();
    const url= process.env.REACT_APP_API_URL+'/transaction';
    const price = parseFloat(name.split(' ')[0]);
    const actualName = name.substring(name.indexOf(' ') + 1);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name:actualName, price, description, datetime }),
    }).then(response=>{
      response.json().then(json=>{
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result',json);
      })
    })
      // .then(response => {
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      //   return response.json();
      // })
      // .then(response => response.json()) // Parse the JSON response
      // .then(json => {
      //   setName('');
      //   setDatetime('');
      //   setDescription('');
      //   console.log('result', json);
      // })
      // .catch(error => {
      //   console.error('Error:', error); // Log any error for debugging
      // });
      // .then(json => {
      //   console.log('result', json);
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      // });
    
  }
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }
  balance=balance.toFixed(2);
  return (
    <main>
      <h1>${balance}<span></span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basics">
          <input type="text"
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder={'+200 new samsung tv'} />
          <input type="datetime-local" 
          value={datetime} 
          onChange={ev=> setDatetime(ev.target.value)}/>
        </div>
        <div className="description">
          <input type="text"
          value={description}
          onChange={ev=> setDescription(ev.target.value)}
          placeholder={'description'}/>
        </div>
        <button type="submit">Add new transactions</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction=>{
          return(<div><div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price" +(transaction.price<0?'red':'green')}>
              {transaction.price}
              </div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div></div>);
        })}
        {/* <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">it was time for new tv</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default App;
