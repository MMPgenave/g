import React from "react";
import { useReducer, useEffect } from "react";
import DooPicture from "./DooPicture.jpg";
export const mycontext = React.createContext();
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading": {
      const newState = { ...state };
      newState.isLoading = action.value;
      return newState;
    }
    case "DataFetching": {
      const newState = { ...state };
      newState.Data = action.value;
      newState.DataCopy = action.value;
      newState.NumberofDrink = action.value.length;
      return newState;
    }
    case "search": {
      // This function only returns Items that search term includes in Item's name or Item's Category
      const value = action.value;
      if (value === "") {
        const newState = { ...state };
        newState.Data = state.DataCopy;
        newState.NumberofDrink = state.DataCopy.length;
        return newState;
      } else {
        const newState = { ...state };
        const filteredProducts = newState.DataCopy.filter(
          (p) =>
            p.strDrink.toLowerCase().includes(value.toLowerCase()) ||
            p.strGlass.toLowerCase().includes(value.toLowerCase())
        );
        newState.Data = filteredProducts;
        newState.NumberofDrink = filteredProducts.length;
        return newState;
      }
    }
  }
};
const initialState = {
  isLoading: true,
  Data: [],
  DataCopy: [],
  NumberofDrink: 0
};
export function DataProvidor(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  //Data Fetching function
  const fetchData = async () => {
    dispatch({ type: "Loading", value: true });
    try {
      const response = await fetch(url);
      const Data = await response.json();
      dispatch({ type: "Loading", value: false });
      const newItem = {
        idDrink: "11873",
        strDrink: "Sedo",
        strDrinkThumb: DooPicture,
        strCategory: "Atomic",
        strGlass: "Shot Glass",
        strAlcoholic: "Nuclear",
        strInstructions: "Dartar",
        strIngredient1: "karavi"
      };
      Data.drinks.push(newItem);

      dispatch({ type: "DataFetching", value: Data.drinks });
    } catch (error) {
      dispatch({ type: "Loading", value: false });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <mycontext.Provider value={{ info: state, action: dispatch }}>
      {props.children}
    </mycontext.Provider>
  );
}
