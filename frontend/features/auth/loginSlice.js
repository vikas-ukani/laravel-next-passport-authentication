import { createAsyncThunk, createSlice, rejectWithValue } from "@reduxjs/toolkit";
import { LoginAPI } from './authAPI'
// import { useRouter } from 'next/router'


export const loginFetch = createAsyncThunk(
    'login/loginFetch',
    async (login, thunkAPI) => {
        // const router = useRouter()
        try {
            const data = await LoginAPI(login);
            if (data.status !== 200) {
                return thunkAPI.rejectWithValue(data.data)
            }
            if (data.status === 200) {
                localStorage.setItem('token', data.data.token)
            }
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: {
            email: '',
            password: '',
        },
        token: '',
        errors: {},
        isFetching: false,
        successMessage: '',
        errorMessage: '',
        isError: false,
        isSuccess: false,
    },
    reducers: {
        setLogin: (state, action) => {
            state.isError = false
            state.isSuccess = false
            state.login = { ...state.login, ...action.payload }
        },
        setLoading: (state, action) => {
            state.isFetching = true;
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: {
        [loginFetch.fulfilled]: (state, action) => {
            state.token = action.payload
            state.isSuccess = true
            state.isError = false
            state.isFetching = false
            state.successMessage = action.payload.message
            state.login = {
                email: '',
                password: '',
            }
        },
        [loginFetch.pending]: (state) => {
            state.isFetching = true
            state.isError = false
            state.isSuccess = false
        },
        [loginFetch.rejected]: (state, action) => {
            state.errors = (action.payload && action.payload.errors) ? action.payload.errors : {}
            state.isFetching = false
            state.isError = true
            state.isSuccess = false
            state.errorMessage = (action.payload && action.payload.message) ? action.payload.message : ''
            state.login = {
                email: '',
                password: '',
            }
        }
    }
})

export const { setErrors, setLogin, setLoading } = loginSlice.actions
export default loginSlice.reducer