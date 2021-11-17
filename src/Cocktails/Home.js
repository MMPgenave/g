import React from "react";
import { ProductShower } from "./ProductShower";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";
import { Loading } from "./Loading";
import { Offer } from "./Offer";
import { Spinner } from "./Spinner";
export function Home() {
  const context = useContext(mycontext);
  const isLoading = context.info.isLoading;
  const showModal = context.info.WellcomeModal;

  React.useEffect(() => {
    setTimeout(() => context.action({ type: "SHOW-MODAL" }), 5000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (context.info.Data.length < 1) {
    return <div className="text-center text-danger  mt-5 font-color-primary">No Item Matches your Search!</div>;
  }
  return (
    <div>
      {showModal ? <Spinner /> : null}
      <TotalPrice />
      {/*   <TableNumber /> */}
      <ProductShower />
    </div>
  );
}
const TableNumber = () => {
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

function TotalPrice() {
  const context = useContext(mycontext);

  return (
    <div>
      <h3
        style={{
          "letter-spacing": ".1rem",
          "font-size":"1.7rem"
        }}
        className="ms-auto me-5 text-end w-25"
      >
        Total Price : {context.info.TotalPrice} $
      </h3>
    </div>
  );
}
