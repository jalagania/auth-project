import { useDispatch, useSelector } from "react-redux";
import AdminPanel from "./pages/AdminPanel";
import Form from "./pages/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { dataSlice } from "./store/dataSlice";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  // const { formIsVisible } = useSelector((store) => store.form);
  // const { panelIsVisible } = useSelector((store) => store.panel);
  const { setData } = dataSlice.actions;

  useEffect(() => {
    async function fetchUsersData() {
      const res = await axios.get("http://localhost:8800/");
      dispatch(setData(res.data));
    }
    fetchUsersData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
