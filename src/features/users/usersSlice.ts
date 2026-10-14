import type { User } from "./userTypes";

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type UserState = {
  users: User[];
  addedUsers: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

function loadAddedUsers(): User[] {
  try {
    const savedUsers = localStorage.getItem("addedUsers");
    const parsedUsers = JSON.parse(savedUsers ?? "[]");

    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers.filter((user): user is User => {
      return (
        typeof user === "object" &&
        user !== null &&
        typeof user.id === "number" &&
        typeof user.name === "string" &&
        typeof user.username === "string" &&
        typeof user.email === "string"
      );
    });
  } catch {
    return [];
  }
}

const initialState: UserState = {
  users: [],
  addedUsers: loadAddedUsers(),
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data: User[] = await response.json();
    return data;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.addedUsers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = [...action.payload, ...state.addedUsers];
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
