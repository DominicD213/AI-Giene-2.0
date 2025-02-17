import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for individual queries
export interface Query {
  id: string; // Ensure each query has a unique identifier
  query: string;
  response: string;
}

// Define the type for the session status state
interface SessionStatus {
  queries: Query[]; // An array of Query objects
  error: null | string;
  sessionLoading: boolean;
  loaded: boolean;
}

// Initial state for the slice
const initialState: SessionStatus = {
  queries: [],
  error: null,
  sessionLoading: false,
  loaded: false, 
};

// Create the Redux slice
const sessionStatusSlice = createSlice({
  name: "SessionStatus",
  initialState,
  reducers: {
    // Reducer to add unique queries
    addRequest: (state, action: PayloadAction<Query[]>) => {
      console.log("Before Adding:", state.queries);
      console.log("New Data:", action.payload);

      const existingQueryIds = new Set(state.queries.map(query => query.id));
      const uniqueQueries = action.payload.filter(query => !existingQueryIds.has(query.id));

      if (uniqueQueries.length > 0) {
        state.queries = [...state.queries, ...uniqueQueries]; // Append only unique queries
      }

      console.log("After Adding:", state.queries);
    },
    
    // Reducer to clear all requests
    clearRequest: (state) => {
      state.queries = [];
    },

    // Reducer to set an error message
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Reducer to start loading
    startLoading: (state) => {
      state.sessionLoading = true;
    },

    // Reducer to stop loading
    stopLoading: (state) => {
      state.sessionLoading = false;
    },

    // Reducer to toggle `loaded` state
    changeloadingState: (state) => {
      state.loaded = !state.loaded;
    },
  },
});

// Export the actions and reducer
export const { addRequest, setError, startLoading, stopLoading, changeloadingState, clearRequest } = sessionStatusSlice.actions;
export default sessionStatusSlice.reducer;
