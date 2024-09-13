import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const token = localStorage.getItem('token'); // Retrieve the token from localStorage

function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

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
          setTasks(response.data); // Set fetched tasks to state
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

  const handleClick = async () => {
    if (text.trim() !== '') {
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
          setTasks([...tasks, response.data.task]); // Add the newly created task
          setText('');
        } else {
          console.error('Failed to save task');
        }
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  const editHandle = (taskId, index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, isEditing: !task.isEditing };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleInputChange = (e, index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, text: e.target.value };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleSave = async (taskId, index) => {
    const task = tasks[index];
    try {
      const response = await axios.put(
        `http://localhost:7000/edit/${taskId}`,
        { text: task.text, done: task.done },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        const newTasks = tasks.map((task, idx) => {
          if (idx === index) {
            return { ...task, isEditing: false };
          }
          return task;
        });
        setTasks(newTasks);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId, index) => {
    try {
      const response = await axios.delete(`http://localhost:7000/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        const newTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(newTasks);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDone = async (taskId, index) => {
    const task = tasks[index];
    try {
      const response = await axios.put(
        `http://localhost:7000/edit/${taskId}`,
        { done: !task.done },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        const newTasks = tasks.map((task, idx) => {
          if (idx === index) {
            return { ...task, done: !task.done };
          }
          return task;
        });
        setTasks(newTasks);
      } else {
        console.error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <>
      <div id="input">
        <input id="Rinput" type="text" value={text} onChange={handleChange} />
        <button onClick={handleClick} id="but">SUBMIT</button>
      </div>

      <div>
        {tasks.map((task, index) => (
          <div key={task._id} style={{ display: 'flex', alignItems: 'center' }}>
            {task.isEditing ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => handleInputChange(e, index)}
              />
            ) : (
              <p style={{ 
                marginRight: '5px', 
                textDecoration: task.done ? 'line-through' : 'none' 
              }}>
                {task.text}
              </p>
            )}
            <button onClick={() => task.isEditing ? handleSave(task._id, index) : editHandle(task._id, index)}>
              {task.isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => handleDelete(task._id, index)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
            <button onClick={() => handleDone(task._id, index)} style={{ marginLeft: '10px' }}>
              {task.done ? 'Undo' : 'Done'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;












































