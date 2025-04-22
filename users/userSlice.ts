import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "./UserDto";
import { UserAPI } from "./UserAPI";
import * as SecureStore from "expo-secure-store";

export const signup = createAsyncThunk(
  "auth/signup", // not the endpoint
  async (createUserDto: UserDto, thunkAPI) => {
    // the returned value will be the content of action.payload

    return await UserAPI.signup(createUserDto);
  }
);

export const login = createAsyncThunk(
  "auth/login", // not the endpoint
  async (createUserDto: UserDto, thunkAPI) => {
    // the returned value will be the content of action.payload

    return await UserAPI.login(createUserDto);
  }
);

interface UserState {
  token: string;
  errormessage: string;
}

const initialState: UserState = {
  token: "",
  errormessage: "",
};

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "";
      SecureStore.setItemAsync("jwt", "");
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);
      SecureStore.setItemAsync("object", JSON.stringify(action.payload));

      state.errormessage = "";
    }),
      builder.addCase(signup.rejected, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);

        state.errormessage = "Error signing up";
      });

    builder.addCase(login.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);
      SecureStore.setItemAsync("jwt", JSON.stringify(action.payload));
      state.token = action.payload.access_token; // in login.fulfilled
      console.log(state.token);
      state.errormessage = "";
    }),
      builder.addCase(login.rejected, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);

        state.errormessage = "Error logging in";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reloadJwtFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;
