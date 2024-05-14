import React from "react";

import { ClipLoader, HashLoader, RiseLoader } from "react-spinners";
function Loader() {
  return (
    <>
      <div className="loader_wrapper">
        <div className="loader_box">
          <RiseLoader color="#12af12a9" size={10} />
        </div>
      </div>
    </>
  );
}

export default Loader;
