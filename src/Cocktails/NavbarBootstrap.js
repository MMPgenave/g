import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
export function NavbarBootstrap() {
  const context = useContext(mycontext);
  const dispatch = context.action;
  const [value, setValue] = useState("");
  const searchValue = React.useRef("");

  React.useEffect(() => {
    /*     searchValue.current.focus();
     */
  }, []);
  const changeHandler = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "search", value: e.target.value });
    setValue(e.target.value);
  };
  return (
    <div>
      <nav className=" navbar navbar-expand-lg navbar-light  bg-primary  p-3 mb-1 bg-body rounded ">
        <div className="container-fluid ">
          <a
            className="navbar-brand ms-3"
            style={{ "font-size": "xx-large" }}
            href="/"
          >
            CocktailDB
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ms-5  "
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav  ">
              <Link className="nav-link active  " aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link  " to="/About">
                About
              </Link>
            </div>
            <FiShoppingCart className="ms-auto me-5 fa-lg" />
            <form
              className="d-flex  "
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="form-control me-2"
                name="name"
                type="search"
                placeholder="Search your drink "
                aria-label="Search"
                ref={searchValue}
                onChange={changeHandler}
                value={value}
              />

              <span
                className="input-group-text bg-transparent border-0"
                id="search-addon"
              >
                <i className="fa fa-search"></i>
              </span>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
