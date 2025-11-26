import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Public";
import Publiclayout from "./layouts/public";

function App() {
  return (
    <>
      {/* TOAST GLOBAL */}
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          {/* public layout */}
          <Route element={<Publiclayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
