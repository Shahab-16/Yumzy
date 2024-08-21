import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { StoreContext } from "./context/StoreContext";
import Verify from "./pages/Verify";
import { useContext } from "react";
import MyOrders from "./pages/MyOrders";

function App() {
  const { login } = useContext(StoreContext);
  return (
    <>
    {login ? (<Login/>) : (<></>)}
      <div className="mx-auto min-h-screen">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/placeorder" element={<PlaceOrder/>}/>
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
