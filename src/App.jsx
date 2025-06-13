import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increase = () => setCount(c => c + 1)
  const decrease = () => setCount(c => (c > 0 ? c - 1 : 0))
  const limitReached = count >= 10

  return (
    <div className="container">
      <h1>{count}</h1>
      <div className="buttons">
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
      {limitReached && <p className="message">You've reached the limit!</p>}
    </div>
  )
}

export default App
