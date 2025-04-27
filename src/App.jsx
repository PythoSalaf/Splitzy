import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { ErrorPage, Home } from "./pages";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
