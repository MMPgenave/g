import React from "react";
import { mycontext } from "./DataProvidor";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { NumberOfDrinks } from "./NumberOfDrinks";

export function ProductShower() {
  const context = useContext(mycontext);
  const Data = context.info.Data;

  return (
    <div className="section">
      <NumberOfDrinks />

      <div className="container  ">
        <div className="row justify-content-center ">
          {Data.map((Item) => {
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
                  <h4>{Item.strAlcoholic}</h4>
                  <Link
                    className="btn-lg btn-primary "
                    style={{ "text-decoration": "none" }}
                    to={`/${Item.idDrink}`}
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
