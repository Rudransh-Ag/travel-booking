import { createContext, useContext, useReducer } from "react";

const TravelContext = createContext();

const initialState = {
  searchQuery: "",
  selectedCategory: "All",
  sortBy: "popular",
};

function travelReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

export function TravelProvider({ children }) {
  const [state, dispatch] = useReducer(travelReducer, initialState);
  return (
    <TravelContext.Provider value={{ state, dispatch }}>
      {children}
    </TravelContext.Provider>
  );
}

export function useTravelContext() {
  return useContext(TravelContext);
}