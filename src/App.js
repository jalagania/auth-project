import { useSelector } from "react-redux";
import AdminPanel from "./AdminPanel";
import Form from "./Form";

function App() {
  const { formIsVisible } = useSelector((store) => store.form);
  const { panelIsVisible } = useSelector((store) => store.panel);

  return (
    <div>
      {formIsVisible && <Form />}
      {panelIsVisible && <AdminPanel />}
    </div>
  );
}

export default App;
