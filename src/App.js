import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Main from "./Pages/Main";
import View from "./Pages/View";
import Edit from "./Pages/Edit";
import { useSelector } from "react-redux";
import Loader from "./Pages/Loader";

function App() {
  const loader = useSelector((state) => state.curd.loader);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        {loader && <Loader />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/Edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
