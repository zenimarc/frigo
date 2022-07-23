import { createContext, useState } from "react";
import { storedProductData } from "./components/ProductForm";

export const AppContext = createContext({});

export const AppProvider: React.FC = (props) => {
  const [items, setItems] = useState<storedProductData[]>([]);
  return <AppContext.Provider value={[items, setItems]}>{props.children}</AppContext.Provider>;
};
