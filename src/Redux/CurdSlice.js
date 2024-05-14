import { createSlice } from "@reduxjs/toolkit";

const curdSlice = createSlice({
  name: "curdSlice",
  initialState: {
    values: [],
    loader:false
  },
  reducers: {
    setAllmember: (state, action) => {
      state.values = action.payload;
    },
    setLoader:(state,action)=>{
      state.loader=action.payload
    }

  },
});

export const { setAllmember ,setLoader } = curdSlice.actions;
export default curdSlice.reducer;
