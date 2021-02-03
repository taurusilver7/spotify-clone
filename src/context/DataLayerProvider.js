import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();
// prepare the data layer

// wrap the appllication & provide the data layer
export const DataLayerProvider = ({ reducer, intialState, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, intialState)}>
    {children}
  </DataLayerContext.Provider>
);

// Pull information from data layer.
export const useDataLayerValue = () => useContext(DataLayerContext);
