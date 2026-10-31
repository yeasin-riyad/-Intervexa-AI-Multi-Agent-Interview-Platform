
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

// Fetch existing resume
export const fetchResume = createAsyncThunk(
  "resume/fetchResume",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/resume/get-resume");
      console.log(data,"Data..")
      return data.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message:
          error.response?.data?.message ||
          "Failed to fetch resume.",
      });
    }
  }
);

// Upload and analyze resume
export const uploadResume = createAsyncThunk(
  "resume/uploadResume",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await api.post(
        "/api/resume/upload",
        formData
      );

      return data.data || data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message:
          error.response?.data?.message ||
          error.message ||
          "Resume analysis failed.",
      });
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",

  initialState: {
    resumeData: null,
    isFetching: false,
    isAnalyzing: false,
    fetchError: null,
    uploadError: null,
  },

  reducers: {
    clearResume: (state) => {
      state.resumeData = null;
      state.fetchError = null;
      state.uploadError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Resume
      .addCase(fetchResume.pending, (state) => {
        state.isFetching = true;
        state.fetchError = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.isFetching = false;
        state.resumeData = action.payload;
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchError = action.payload?.message;
      })

      // Upload Resume
      .addCase(uploadResume.pending, (state) => {
        state.isAnalyzing = true;
        state.uploadError = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isAnalyzing = false;
        state.resumeData = action.payload;
        state.fetchError = null;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.uploadError = action.payload?.message;
      });
  },
});

export const { clearResume } = resumeSlice.actions;

export default resumeSlice.reducer;
