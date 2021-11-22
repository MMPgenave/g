import React, { useMemo } from "react";
import { ProductShower } from "./ProductShower";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";
import WithLoader from "./WithLoader";

const MemoizedProductShower = React.memo(ProductShower);

const Home = () => {
  const context = useContext(mycontext);


  //here I show the  use case of useMemo hook
  const mostExpensiveDrink = () => {
    console.log(`mostExpensiveDrink`);

    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += i;
    }
    return sum;
  };
  const MemoizedMostExpensiveDrink = useMemo(() => mostExpensiveDrink(), []);

  console.log(MemoizedMostExpensiveDrink);
  //end of use case fo useMemo hook
  //uncomment the line below to see the effect of useMemo hook
  //console.log(mostExpensiveDrink())

  if (context.info.Data.length < 1) {
    return (
      <div className="text-center text-danger  mt-5 ">
        No Item Matches your Search!
      </div>
    );
  }
  return (
    <div>
      <TotalPrice />
      <MemoizedProductShower />
    </div>
  );
};

export default WithLoader(Home);

/* const TableNumber = () => {
  return (
    <div class="input-group mb-3 mt-4 w-25 ms-5">
      <span class="input-group-text" id="basic-addon1">
        Table Number
      </span>
      <input
        type="number"
        class="form-control"
        placeholder="Table Number"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
 */
const TotalPrice = React.memo(() => {
  const context = useContext(mycontext);
  return (
    <div>
      <h3
        style={{
          "letter-spacing": ".1rem",
          "font-size": "1.7rem",
        }}
        className="ms-auto me-5 text-end w-25"
      >
        Total Price : {context.info.TotalPrice} $
      </h3>
    </div>
  );
});
