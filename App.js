import Form from './Form';
import Chatbot from './Chatbot';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFields } from './interactionSlice';
function App() {
  const data = useSelector((state) => state.interaction);
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {
    const res = await fetch(`/process_interaction?text=${input}`, { method: 'POST' });
    const json = await res.json();
    dispatch(updateFields(json)); // Update read-only fields
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Read-Only Form (Left) */}
      <Form />
      <input type="text" value={data.doctor_name} readOnly />
      {/* Chat Area (Right) */}
      <Chatbot />
      <h1>Chatbot</h1>
    </div>
  );
}

export default App;

