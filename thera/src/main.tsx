import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.scss";
import Login from "./pages/login";
import Timesheet from "./pages/timesheet";
import NotFound from "./pages/not-found";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="timesheet" element={<Timesheet />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
