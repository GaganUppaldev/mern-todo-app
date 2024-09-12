import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const token = localStorage.getItem('token'); // Retrieve the token from localStorage

function App() {
  const [text, setText] = useState('');
  const [submit, setSubmit] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/tasks', {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in headers
          }
        });

        if (response.status === 200) {
          setSubmit(response.data); // Set fetched tasks to state
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks(); // Call the function to fetch tasks
  }, []); // Empty array ensures this runs once when component mounts

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
      setSubmit([...submit, { text: text, isEditing: false, done: false }]);
      setText('');

      try {
        const response = await axios.post(
          'http://localhost:7000/save',
          { text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
        <input id="Rinput" type="text" value={text} onChange={handleChange} />
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













































