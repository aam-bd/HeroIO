import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Apps from "./Pages/Apps";
import Installation from "./Pages/Installation";
import AppDetails from "./Pages/AppDetails";
import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Routes>
      {/* Routes that use the layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/installation" element={<Installation />} />
        <Route path="/app/:id" element={<AppDetails />} />
      </Route>
      {/* 404 catch‑all – outside the layout */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;