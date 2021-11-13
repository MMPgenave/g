import React from "react";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";

export function NumberOfDrinks() {
  const context = useContext(mycontext);
  const NumberofDrink = context.info.NumberofDrink;

  return (
    <div
      className="text-center "
      style={{
        color: "#826a22",
        "letter-spacing": ".1rem"
      }}
    >
      Drinks: {NumberofDrink}
    </div>
  );
}
