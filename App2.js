// ... imports
//function App() {
//  const data = useSelector((state) => state.interaction);
//  const dispatch = useDispatch();
//
//  const handleSubmit = async () => {
//    const res = await fetch(`/process_interaction?text=${input}`, { method: 'POST' });
//    const json = await res.json();
//    dispatch(updateFields(json)); // Update read-only fields
//  };

//  return (
//    <div style={{ display: 'flex' }}>
//      {/* Read-Only Form (Left) */}
//      <input type="text" value={data.doctor_name} readOnly />
//      {/* Chat Area (Right) */}
//    </div>
//  );
//}

//export default App;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFields } from './interactionSlice'; // Path sahi check karlein
import Form from './Form';
import Chatbot from './Chatbot';

function App() { // Function name Capital 'A' se start karein
  const data = useSelector((state) => state.interaction);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState(""); // Input handle karne ke liye

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/process_interaction?text=${userInput}`, { 
        method: 'POST' 
      });
      const json = await res.json();
      dispatch(updateFields(json));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      {/* Read-Only Form (Left Side) */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
        <Form />
        <label>Doctor Name: </label>
        <input type="text" value={data?.doctor_name || ""} readOnly />
      </div>

      {/* Chat Area (Right Side) */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
        <Chatbot />
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Ask something..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default App; // Ye line zaroori hai