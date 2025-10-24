import React,{useState, useEffect} from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import Timer from './Timer';


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Timer> </Timer>
        </div>
  )
}
      
export default App;
