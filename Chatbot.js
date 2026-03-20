import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFields } from './interactionSlice';

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      // Backend URL check karein (8000 for FastAPI, 5000 for Flask)
      const response = await fetch(`http://localhost:8000/process_interaction?text=${encodeURIComponent(input)}`, {
        method: 'POST',
      });
      
      const json = await response.json();
      // Redux store update karna taaki Form.js mein data dikhe
      dispatch(updateFields(json));
      setInput(""); // Clear input
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h2>AI Assistant</h2>
      <div style={{ marginTop: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask LLM to update form..."
          style={{ width: '80%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          style={{ width: '18%', marginLeft: '2%', padding: '10px', cursor: 'pointer' }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
