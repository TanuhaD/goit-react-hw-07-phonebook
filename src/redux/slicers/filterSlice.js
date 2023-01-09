import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameFilter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    update: (_, action) => {
      return { nameFilter: action.payload };
    },
  },
});

export const { update: updateFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
