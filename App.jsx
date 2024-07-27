import React, { useState } from 'react'
import "./App.css";


function App() {

  const [text , settext] = useState('');
  const[submit,setsubmit] = useState('')

  const handlechange = (event) =>{
    settext(event.target.value)

  };

  const handleclick = () => {
    setsubmit(text)


    alert("done" + text)

  }

  




  return (
    <>
    <div id="input">
      <input type='text' value={text} onChange={handlechange}></input>
      <button onClick={handleclick}>SUBMIT</button>
    </div>
    <div>
      <p >{submit}</p>
    </div>
    </>

  )
}

export default App
