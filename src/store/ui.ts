import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
    errorMessage: string
}

const initialState: UiState = {
    errorMessage: "",
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
    },
})

export const { setErrorMessage } = uiSlice.actions

export default uiSlice.reducer
