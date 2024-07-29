import React, { useState } from 'react';
import "./App.css";

function App() {
  const [text, setText] = useState('');
  const [submit, setSubmit] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    if (text.trim() !== '') {
      setSubmit([...submit, { text: text, isEditing: false }]);
      setText('');
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

  return (
    <>
      <div id="input">
        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleClick}>SUBMIT</button>
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
              <p style={{ marginRight: '10px' }}>{input.text}</p>
            )}
            <button onClick={() => input.isEditing ? handleSave(index) : editHandle(index)}>
              {input.isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;




