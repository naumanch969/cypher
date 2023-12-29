import { Route, Router, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Form, Image } from "./pages";

const App = () => {
  return (
    <div className="min-h-screen bg-dark-background flex justify-center">
      <div className="max-w-5xl w-full ">
        <Navbar />
        <div
          style={{ minHeight: "calc(100vh - 4.5rem)" }}
          className="flex justify-center py-8 "
        >
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/text" element={<Form />} />
            <Route path="/image" element={<Image />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
