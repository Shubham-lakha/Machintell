import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./Components/Product/Product";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Dispatch from "./Components/Dispatch/Dispatch";
import FMEA from "./Components/fmea/fmea";
import FLCPS from "./Components/flcps/flcps";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/fmea" element={<FMEA />} />
          <Route path="/flcps" element={<FLCPS />} />
          <Route path="/dispatch" element={<Dispatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;