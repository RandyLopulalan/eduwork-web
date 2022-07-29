import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "./addressService";

const initialState = {
  address: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// GET address
export const getAddress = createAsyncThunk(
  "address/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addressService.getAddress(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// POST address
export const createAddress = createAsyncThunk(
  "address/create",
  async (newAddress, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addressService.createAddress(newAddress, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// PUT address
export const updateAddress = createAsyncThunk(
  "address/update",
  async (newAddress, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addressService.updateAddress(newAddress, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// PUT address
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addressService.deleteAddress(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = actions.payload;
      })
      .addCase(getAddress.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address.push(actions.payload);
      })
      .addCase(createAddress.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = state.address.map((data) =>
          data._id === actions.payload.id ? { ...actions.payload } : data
        );
      })
      .addCase(updateAddress.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = state.address.filter(
          (list) => list._id !== actions.payload.id
        );
      })
      .addCase(deleteAddress.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});

export const { reset } = addressSlice.actions;

export default addressSlice.reducer;
