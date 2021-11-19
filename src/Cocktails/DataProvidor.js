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
        //we filter the DataCopy agint Data
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
    case "ADD-TO-CART": {
      //this is the complex code that i wrote here

      const newState = { ...state };

      let newData = [...newState.Data];
      //finding that specific drink by using the receiving id =action.payload;

      let i;
      for (i = 0; i < newData.length; i++) {
        if (newData[i].idDrink === action.payload) {
          break;
        }
      }
      const newDrink = { ...newData[i] };
      newDrink.NumberofOrderedDrink++;
      newData[i] = newDrink;

      newState.Data = newData;

      //we have to add this change to DataCopy , because in search component we search based on DataCopy

      const newDataCopy = [...newState.DataCopy];
      let j;
      for (j = 0; j < newDataCopy.length; j++) {
        if (newDataCopy[j].idDrink === action.payload) {
          break;
        }
      }
      const newDrinkofDataCopyList = { ...newDataCopy[j] };
      newDrinkofDataCopyList.NumberofOrderedDrink++;
      newDataCopy[j] = newDrinkofDataCopyList;
      newState.DataCopy = newDataCopy;

      //update the Total Price
      newState.TotalPrice = newState.TotalPrice + newDrinkofDataCopyList.price;

      //update the NumberofTotalDrinks
      let sum = 0;
      for (let i = 0; i < newDataCopy.length; i++) {
        sum = sum + newDataCopy[i].NumberofOrderedDrink;
      }
      newState.NumberofTotaOrderedDrink = sum;
      return newState;
    }
    case "DROP-FROM-CART": {
      //this is the complex code that i wrote here

      const newState = { ...state };

      let newData = [...newState.Data];
      //finding that specific drink by using the receiving id =action.payload;

      let i;
      for (i = 0; i < newData.length; i++) {
        if (newData[i].idDrink === action.payload) {
          break;
        }
      }
      const newDrink = { ...newData[i] };
      if (newDrink.NumberofOrderedDrink === 0) {
        newDrink.NumberofOrderedDrink = 0;
      } else {
        newDrink.NumberofOrderedDrink--;
      }

      newData[i] = newDrink;

      newState.Data = newData;

      //we have to add this change to DataCopy , because in search component we search based on DataCopy

      const newDataCopy = [...newState.DataCopy];
      let j;
      for (j = 0; j < newDataCopy.length; j++) {
        if (newDataCopy[j].idDrink === action.payload) {
          break;
        }
      }
      const newDrinkofDataCopyList = { ...newDataCopy[j] };
      if (newDrinkofDataCopyList.NumberofOrderedDrink === 0) {
        newDrinkofDataCopyList.NumberofOrderedDrink = 0;
      } else {
        newDrinkofDataCopyList.NumberofOrderedDrink--;
      }
      newDataCopy[j] = newDrinkofDataCopyList;
      newState.DataCopy = newDataCopy;

      //update the Total Price
     /*  if (newState.TotalPrice === 0) {
        newState.TotalPrice = 0;
      } else {
        newState.TotalPrice =
          newState.TotalPrice - newDrinkofDataCopyList.price;
      } */
      let s = 0;//sum for Total price
      for (let i = 0; i < newDataCopy.length; i++) {
        s = s + newDataCopy[i].price * newDataCopy[i].NumberofOrderedDrink;
      }
      newState.TotalPrice = s;
      //update the NumberofTotalDrinks
      let sum = 0;
      for (let i = 0; i < newDataCopy.length; i++) {
        sum = sum + newDataCopy[i].NumberofOrderedDrink;
      }
      newState.NumberofTotaOrderedDrink = sum;
      return newState;
    }
    case "SHOW-MODAL": {
      const newState = { ...state };
      newState.WellcomeModal = true;
      return newState;
    }
    default:
      return state;
  }
};
const initialState = {
  isLoading: true,
  Data: [],
  DataCopy: [],
  NumberofDrink: 0,
  NumberofTotaOrderedDrink: 0,
  TotalPrice: 0,
  WellcomeModal: false
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

      //Adding Price to every drink
      //and also
      //Adding NumberofOrderedDrink property to every drink
      Data.drinks.map((drink) => {
        drink.price = Math.floor(Math.random() * (80 - 20 + 1) + 20);;
        drink.NumberofOrderedDrink = 0;
        return drink;
      });

      dispatch({ type: "DataFetching", value: Data.drinks });
    } catch (error) {
     // dispatch({ type: "Loading", value: false });
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
