import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <ViewContext.Provider
      value={{
        showLanding,
        setShowLanding,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
