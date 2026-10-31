
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice.js";
import resumeReducer from "./resumeSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer,
  },
});
