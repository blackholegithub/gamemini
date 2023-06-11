import React from "react";


import "./LoadingForm.css"

const LoadingFrom: React.FC = () => {


  
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
     <span className="loader">Loading</span>
    </div>
  );
};

export default LoadingFrom;
