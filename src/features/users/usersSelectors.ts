import type { RootState } from "../../app/store";

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectAddedUsers = (state: RootState) => state.users.addedUsers;
