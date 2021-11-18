import React from "react";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";

const WithLoader = (WrapperComponent) => {
  const Withloader = () => {
    const context = useContext(mycontext);
    const isLoading = context.info.isLoading;

    if (isLoading) {
      return (
        <div className="loader">
          <div className="loader-inner">
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return <WrapperComponent />;
    }
  };

  return Withloader;
};

export default WithLoader;
