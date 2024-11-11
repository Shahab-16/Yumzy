import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddItems from "./pages/AddItems";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const URL='http://localhost:5000'
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <ToastContainer/>
      <hr></hr>
      <div className="flex flex-1">
        <Sidebar/>
        <Routes>
          <Route path="/additems" element={<AddItems url={URL}/>}/>
          <Route path="/listitems" element={<ListItems url={URL}/>}/>
          <Route path="/orders" element={<Orders url={URL} />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
