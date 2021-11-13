import React from "react";
import { ProductShower } from "./ProductShower";
import { useContext } from "react";
import { mycontext } from "./DataProvidor";
import { Loading } from "./Loading";

export function Home() {
  const context = useContext(mycontext);
  const isLoading = context.info.isLoading;
  console.log(`Data length :${context.info.Data.length}`);
  if (isLoading) {
    return <Loading />;
  }
  if (context.info.Data.length < 1) {
    return <div>No Item Matches your Search</div>;
  }
  return (
    <div>
      <ProductShower />
    </div>
  );
}
