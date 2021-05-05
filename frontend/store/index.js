import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/features/auth/loginSlice"
import signUpreducer from "@/features/auth/signupSlice"

export default configureStore({
    reducer: {
        login: loginReducer,
        signUp: signUpreducer
    }
})