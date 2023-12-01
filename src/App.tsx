import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Im work!</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount((prevState) => prevState + 1)}> Click me!</button>
    </>
  );
}

export default App;
