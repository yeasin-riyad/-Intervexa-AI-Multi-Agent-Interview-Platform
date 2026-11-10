
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  generateRoadmapApi,
  getAllRoadmapsApi,
  getRoadmapByIdApi,
} from "../apis/roadmap.api.js";

// Helper function for handling API errors
const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong."
  );
};

// 1. Generate a new roadmap
export const generateRoadmap = createAsyncThunk(
  "roadmap/generate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await generateRoadmapApi(payload);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 2. Fetch all roadmaps
export const fetchAllRoadmaps = createAsyncThunk(
  "roadmap/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRoadmapsApi();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 3. Fetch roadmap by ID
export const fetchRoadmapById = createAsyncThunk(
  "roadmap/fetchById",
  async (roadmapId, { rejectWithValue }) => {
    try {
      const response = await getRoadmapByIdApi(roadmapId);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  roadmaps: [],
  selectedRoadmap: null,

  isGenerating: false,
  isFetchingAll: false,
  isFetchingById: false,

  generateError: null,
  fetchAllError: null,
  fetchByIdError: null,
};

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,

  reducers: {
    // Clear selected roadmap
    clearSelectedRoadmap: (state) => {
      state.selectedRoadmap = null;
      state.fetchByIdError = null;
    },

    // Clear all roadmap errors
    clearRoadmapErrors: (state) => {
      state.generateError = null;
      state.fetchAllError = null;
      state.fetchByIdError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Generate Roadmap
      .addCase(generateRoadmap.pending, (state) => {
        state.isGenerating = true;
        state.generateError = null;
      })
      .addCase(generateRoadmap.fulfilled, (state, action) => {
        state.isGenerating = false;

        const newRoadmap = action.payload.roadmap;

        state.selectedRoadmap = newRoadmap;

        // Add newly generated roadmap to the beginning
        state.roadmaps = [
          newRoadmap,
          ...state.roadmaps.filter(
            (item) => item._id !== newRoadmap._id
          ),
        ];
      })
      .addCase(generateRoadmap.rejected, (state, action) => {
        state.isGenerating = false;
        state.generateError = action.payload;
      })

      // Fetch All Roadmaps
      .addCase(fetchAllRoadmaps.pending, (state) => {
        state.isFetchingAll = true;
        state.fetchAllError = null;
      })
      .addCase(fetchAllRoadmaps.fulfilled, (state, action) => {
        state.isFetchingAll = false;
        state.roadmaps = action.payload.roadmaps;
      })
      .addCase(fetchAllRoadmaps.rejected, (state, action) => {
        state.isFetchingAll = false;
        state.fetchAllError = action.payload;
      })

      // Fetch Roadmap By ID
      .addCase(fetchRoadmapById.pending, (state) => {
        state.isFetchingById = true;
        state.fetchByIdError = null;
        state.selectedRoadmap = null;
      })
      .addCase(fetchRoadmapById.fulfilled, (state, action) => {
        state.isFetchingById = false;
        state.selectedRoadmap = action.payload.roadmap;
      })
      .addCase(fetchRoadmapById.rejected, (state, action) => {
        state.isFetchingById = false;
        state.fetchByIdError = action.payload;
      });
  },
});

export const {
  clearSelectedRoadmap,
  clearRoadmapErrors,
} = roadmapSlice.actions;

export default roadmapSlice.reducer;
