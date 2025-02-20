import { createContext, useCallback, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
const AliensContext = createContext();

const initialState = {
  aliens: [],
  currentAlien: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "alien/loaded":
      return { ...state, currentAlien: action.payload };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function AliensProvider({ children }) {
  const [{ aliens, currentAlien, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getAlien = useCallback(
    async function getAlien(id) {
      console.log("id desde getAlien", id);
      if (Number(id) === currentAlien.id) return;

      try {
        const res = await fetch(`${BASE_URL}/aliensData/${id}`);
        const data = await res.json();
        dispatch({ type: "alien/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentAlien.id],
  );

  return (
    <AliensContext.Provider value={{ currentAlien, getAlien }}>
      {children}
    </AliensContext.Provider>
  );
}

function useAliens() {
  const context = useContext(AliensContext);
  if (!context) {
    throw new Error("useAliens must be used within a AliensProvider");
  }
  return context;
}

export { AliensProvider, useAliens };
