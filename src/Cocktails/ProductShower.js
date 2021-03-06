import React from "react";
import { mycontext } from "./DataProvidor";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { NumberOfDrinks } from "./NumberOfDrinks";
import { FaPlus, FaMinus } from "react-icons/fa";

export function ProductShower() {
  const context = useContext(mycontext);
  const Data = context.info.Data;
  const dispatch = context.action;
  return (
    <div className="section">
      <NumberOfDrinks />
      <hr class="bg-dark border-3 border-top border-dark w-75 mx-auto " />
      <div className="container  ">
        <div className="row justify-content-center ">
          {Data.map((Item, index) => {
            return (
              <div
                key={Item.idDrink}
                className="card  col-xxl-3 rounded  mx-2 my-2 shadow-sm"
                style={{ width: "18rem" }}
              >
                <img
                  src={Item.strDrinkThumb}
                  className="card-img-top rounded "
                  alt={Item.strDrink}
                />
                <div className="card-body">
                  <h1 className="card-title">{Item.strDrink}</h1>
                  <h3>{Item.strGlass}</h3>
                  <h4>{Item.price} $</h4>
                  <div>
                    <Link
                      className="btn-lg p-0  "
                      style={{ "text-decoration": "none" }}
                      to={`/drinks/${Item.idDrink}`}
                    >
                      Details...
                    </Link>
                    <div>
                      <FaPlus
                        className="float-end mt-2 ms-4 btn-lg p-0 add"
                        onClick={() => {
                          dispatch({
                            type: "ADD-TO-CART",
                            payload: Item.idDrink,
                          });
                        }}
                      />
                      <p className="float-end ms-4 my-auto border p-2">
                        {Item.NumberofOrderedDrink}
                      </p>
                      <FaMinus
                        className="float-end mt-2 delete btn-lg p-0"
                        onClick={() => {
                          dispatch({
                            type: "DROP-FROM-CART",
                            payload: Item.idDrink,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
