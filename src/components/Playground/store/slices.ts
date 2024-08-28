import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { ARR_ARROW_CODES } from "../constants"
import type { IPlaygroundState } from "./types"

export const initialState: IPlaygroundState = {
  currentStep: 0,
  steps: [],
  totalSuccessful: 0,
  totalUnSuccessful: 0,
}

export const playgroundSlice = createSlice({
  name: "playground",
  initialState,
  reducers: {
    setCurrentStep: (state) => {
      state.currentStep += 1
    },

    setSteps: (state) => {
      const randomKeys = Math.floor(Math.random() * ARR_ARROW_CODES.length)
      state.steps.push({
        step: state.currentStep,
        currentValue: ARR_ARROW_CODES[randomKeys],
        enteredValue: null,
        success: null,
      })
    },

    setEnteredValue: (state, action: PayloadAction<string>) => {
      if (state.steps.length) {
        const step = state.steps[state.currentStep - 1]
        const isSuccess = step.currentValue === action.payload
        if (step.enteredValue === null) {
          state.steps[state.currentStep - 1] = {
            ...step,
            enteredValue: action.payload,
            success: isSuccess,
          }
        }
        if (isSuccess) {
          state.totalSuccessful += 1
        } else {
          state.totalUnSuccessful += 1
          state.totalSuccessful = 0
        }
      }
    },
    setUnSuccess: (state) => {
      if (state.steps.length) {
        const step = state.steps[state.currentStep - 1]
        if (step.enteredValue == null) {
          state.totalSuccessful = 0
          state.totalUnSuccessful += 1

          state.steps[state.currentStep - 1] = {
            ...step,
            success: false,
          }
        }
      }
    },
    resetStore: () => initialState,
  },
})
export const {
  setCurrentStep,
  setSteps,
  setEnteredValue,
  setUnSuccess,
  resetStore,
} = playgroundSlice.actions
export default playgroundSlice.reducer
