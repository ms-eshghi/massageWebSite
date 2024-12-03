import React from "react";
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";


function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center">
    <div className="sweet-loading text-center">
      <HashLoader
        color='#000'
        loading={loading}
        cssOverride=''
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  );
  
}

export default Loader;