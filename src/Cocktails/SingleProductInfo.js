import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";
export function SingleProductInfo() {
  const context = useContext(mycontext);
  const Data = context.info.Data;
  const [state, setState] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const NewData = Data.filter((I) => {
      return I.idDrink === id;
    });
    setState(NewData[0]);
  }, []);
  return (
    <div className="card mt-2 mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={state.strDrinkThumb}
            className="img-fluid rounded-start"
            alt={state.strDrink}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">Name : {state.strDrink}</h2>
            <p className="card-text">Category: {state.strCategory}.</p>

            <p className="card-text">Info: {state.strAlcoholic}.</p>

            <p>Glass: {state.strGlass}.</p>

            <p>Instructons: {state.strInstructions}.</p>

            <p>Ingredient: {state.strIngredient1}.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
