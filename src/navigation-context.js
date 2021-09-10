import { createContext, useContext, useState } from "react";

const Navigation = createContext();

export function NavProvider({ children }) {
  const [route, setRoute] = useState("product");
  return (
    <Navigation.Provider value={{ route, setRoute }}>
      {children}
    </Navigation.Provider>
  );
}

export function useNav() {
  return useContext(Navigation);
}
