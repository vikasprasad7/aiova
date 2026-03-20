import React from 'react';
import { useSelector } from 'react-redux';

const Form = () => {
  // Redux state se data nikalna
  const data = useSelector((state) => state.interaction);

  const fieldStyle = {
    display: 'block',
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ddd' }}>
      <h2>Patient Details</h2>
      <div style={{ marginTop: '20px' }}>
        <label>Doctor Name:</label>
        <input style={fieldStyle} type="text" value={data.doctor_name || ''} readOnly />
        
        <label>Patient Name:</label>
        <input style={fieldStyle} type="text" value={data.patient_name || ''} readOnly />
        
        <label>Diagnosis:</label>
        <textarea style={fieldStyle} value={data.diagnosis || ''} readOnly rows="4" />
      </div>
    </div>
  );
};

export default Form;
