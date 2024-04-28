import { Route, Routes } from "react-router-dom";
import Assignassets from "../../componentLayer/pages/inventory/Assignassets";
import Addassets from "../../componentLayer/pages/inventory/Addassets";
import Addassetsform from "../../componentLayer/pages/inventory/Addassetsform";
import Register from "../../componentLayer/pages/inventory/Register";
import Error from "../../componentLayer/pages/Error/Error";
function InventoryRoutes() {
  return (
    <Routes>
      <Route path='*' element={<Error />} />
      <Route path="/addassets" element={<Addassets />} />
      <Route path="/assignassets" element={<Assignassets />}/>
      <Route path="/addassetsform" element={<Addassetsform />}/>
      <Route path="/register" element={<Register/>}/>

    </Routes>
  );
}

export default InventoryRoutes;
