import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from '../operations/operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};
const handlePending = (state, action) => {
  state.isLoading = true;
};
const handleError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  // reducers: {
  //   // Выполнится в момент старта HTTP-запроса
  //   fetchingInProgress: state => {
  //     state.isLoading = true;
  //   },
  //   // Выполнится если HTTP-запрос завершился успешно
  //   fetchingSuccess: state => {
  //     state.isLoading = false;
  //     state.error = null;
  //   },
  //   fetchAll: (state, action) => {
  //     state.items = action.payload;
  //   },
  //   // Выполнится если HTTP-запрос завершился с ошибкой
  //   fetchingError: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  //   add: (state, action) => {
  //     state.items.push(action.payload);
  //   },
  //   delete: (state, action) => {
  //     // state.items = state.items.filter(({ id }) => id !== action.payload);
  //     return {
  //       ...state,
  //       items: state.items.filter(({ id }) => id !== action.payload),
  //     };
  //   },
  // },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleError,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
    [deleteContact.rejected]: handleError,
    [addContact.pending]: handlePending,
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleError,
  },
});
export const {
  add: addContactAction,
  delete: deleteContactAction,
  fetchingError,
  fetchingInProgress,
  fetchingSuccess,
  fetchAll,
} = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
