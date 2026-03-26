import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Apps from "./Pages/Apps";
import Installation from "./Pages/Installation";
import AppDetails from "./Pages/AppDetails";
import Layout from "./Pages/Layout";

function App() {
  return (
    <>
      <Routes>
        {/* Layout that includes Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/app/:id" element={<AppDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
