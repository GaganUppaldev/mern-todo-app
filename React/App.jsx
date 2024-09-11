import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";


const token = localStorage.getItem('token'); // Retrieves the token you stored earlier


function App() {
  const [text, setText] = useState('');
  const [submit, setSubmit] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  /*const handleClick = () => {
    if (text.trim() !== '') {
      setSubmit([...submit, { text: text, isEditing: false, done: false }]);
      setText('');
    }
  };*/
  
  const handleClick = async () => {
    if (text.trim() !== '') {
      // Add to local state first
      setSubmit([...submit, { text: text, isEditing: false, done: false }]);
      setText(''); // Clear input
  
      try {
        // Make an Axios request to save data to the backend
        const response = await axios.post(
          'http://localhost:7000/save', // Replace with your endpoint URL
          { text }, // Data to be sent
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the JWT token to request headers
            }
          }
        );
  
        if (response.status === 201) {
          console.log('Task saved successfully');
        } else {
          console.error('Failed to save task');
        }
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };
  

  const editHandle = (index) => {
    const newInput = submit.map((input, idx) => {
      if (idx === index) {
        return { ...input, isEditing: !input.isEditing };
      }
      return input;
    });
    setSubmit(newInput);
  };

  const handleInputChange = (e, index) => {
    const newInput = submit.map((input, idx) => {
      if (idx === index) {
        return { ...input, text: e.target.value };
      }
      return input;
    });
    setSubmit(newInput);
  };

  const handleSave = (index) => {
    const newInput = submit.map((input, idx) => {
      if (idx === index) {
        return { ...input, isEditing: false };
      }
      return input;
    });
    setSubmit(newInput);
  };

  const handleDelete = (index) => {
    const newInput = submit.filter((_, idx) => idx !== index);
    setSubmit(newInput);
  };

  const handleDone = (index) => {
    const newInput = submit.map((input, idx) => {
      if (idx === index) {
        return { ...input, done: !input.done };
      }
      return input;
    });
    setSubmit(newInput);
  };

  return (
    <>
      
      <div id="input">
        <input  id= "Rinput"type="text"  value={text} onChange={handleChange} />
        <button onClick={handleClick} id="but">SUBMIT</button>
      </div>

     

      <div>
        {submit.map((input, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {input.isEditing ? (
              <input
                type="text"
                value={input.text}
                onChange={(e) => handleInputChange(e, index)}
              />
            ) : (
              <p style={{ 
                marginRight: '5px', 
                textDecoration: input.done ? 'line-through' : 'none' 
              }}>
                {input.text}
              </p>
            )}
            <button onClick={() => input.isEditing ? handleSave(index) : editHandle(index)}>
              {input.isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
            <button onClick={() => handleDone(index)} style={{ marginLeft: '10px' }}>
              {input.done ? 'Undo' : 'Done'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
























