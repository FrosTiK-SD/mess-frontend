import { defaultUser } from "@/constants/user";
import { AppUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AppUser = defaultUser;

export type UpdateRoles = AppUser;
export const idStoreSlice = createSlice({
  name: "idStore",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateRoles: (state, action: PayloadAction<UpdateRoles>) => {
      const { payload } = action;
      // can't be assigned using destructiong as reference of state
      // must not be lost
      let key: keyof AppUser;
      for (key in initialState) {
        (state as any)[key] = payload[key];
      }
    },
  },
});

export const { updateRoles } = idStoreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIdStore = (state: any) => state.idStore;

export default idStoreSlice;
