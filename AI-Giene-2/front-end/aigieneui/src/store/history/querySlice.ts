import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Query {
  _id: string;  // Consistent use of _id
  query: string;
  response: string;
}

interface QuerySliceState {
  queries: Query[];
}

const initialState: QuerySliceState = {
  queries: [],
};

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
      addQuery: (state, action: PayloadAction<Query | Query[]>) => {
        const queriesToAdd = Array.isArray(action.payload) ? action.payload : [action.payload];
  
        // Create a Set of existing query IDs
        const existingQueryIds = new Set(state.queries.map(query => query._id));
  
        // Filter out duplicates and append unique queries
        const uniqueQueries = queriesToAdd.filter(query => !existingQueryIds.has(query._id));
        if (uniqueQueries.length) state.queries.push(...uniqueQueries);
      },
      clearQuery: (state) => {
        state.queries = []
      }
    },
  });

export const { addQuery, clearQuery } = querySlice.actions;
export default querySlice.reducer;
