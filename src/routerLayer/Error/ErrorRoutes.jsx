import React from 'react'
import { Route, Routes } from "react-router-dom";
import Error from '../../componentLayer/pages/Error/Error';
import UnauthorisedAccess from '../../componentLayer/pages/Error/UnauthorisedAccess';
function ErrorRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/404' element={<Error />} />
        <Route path='/422' element={<UnauthorisedAccess />} />
      </Routes>
    </div>
  )
}

export default ErrorRoutes