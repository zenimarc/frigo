import React, { createContext, useState } from "react";

import { ProductDataToBeStored } from "./components/ProductForm";

export const AppContext = createContext<
  [ProductDataToBeStored[], React.Dispatch<React.SetStateAction<ProductDataToBeStored[]>>]
>([[], (x) => x]);

export const AppProvider: React.FC = (props) => {
  const [items, setItems] = useState<ProductDataToBeStored[]>([]);
  return <AppContext.Provider value={[items, setItems]}>{props.children}</AppContext.Provider>;
};
