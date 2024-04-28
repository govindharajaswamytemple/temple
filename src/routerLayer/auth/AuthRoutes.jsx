import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from "../../componentLayer/pages/auth/Login"
import ForgotPassword from "../../componentLayer/pages/auth/ForgotPassword"
import ChangePassword from "../../componentLayer/pages/auth/ChangePassword"
import LockScreen from "../../componentLayer/pages/auth/LockScreen"
import Error from '../../componentLayer/pages/Error/Error';
const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='*' element={<Error />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/lockscreen" element={<LockScreen />} />
        </Routes>
    )
}

export default AuthRoutes
