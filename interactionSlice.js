//import { createSlice } from '@reduxjs/toolkit';
//const interactionSlice = createSlice({
//  name: 'interaction',
//  initialState: { doctor_name: '', /* ... */ },
//  reducers: { updateFields: (state, action) => ({ ...state, ...action.payload }) },
//});
//export const { updateFields } = interactionSlice.actions;
//export default interactionSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. API Call ke liye Thunk banayein
export const processInteraction = createAsyncThunk(
  'interaction/processInteraction',
  async (userInput, thunkAPI) => {
    try {
      // Backend URL (FastAPI/Flask) check karein
      const response = await fetch(`http://localhost:8000/process_interaction?text=${encodeURIComponent(userInput)}`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      return data; // Ye 'action.payload' ban jayega
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 2. Slice Setup
const interactionSlice = createSlice({
  name: 'interaction',
  initialState: {
    doctor_name: '',
    patient_name: '',
    diagnosis: '',
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // Agar manually fields update karni hon
    updateFields: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processInteraction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(processInteraction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // API se aaye data ko state mein merge karna
        state.doctor_name = action.payload.doctor_name || state.doctor_name;
        state.patient_name = action.payload.patient_name || state.patient_name;
        state.diagnosis = action.payload.diagnosis || state.diagnosis;
      })
      .addCase(processInteraction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateFields } = interactionSlice.actions;
export default interactionSlice.reducer;