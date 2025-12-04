import Router from "./router/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  console.log("import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID",import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID)
  return (
    <>
      <Router />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;