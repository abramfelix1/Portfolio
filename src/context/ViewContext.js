import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [showLanding, setShowLanding] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  return (
    <ViewContext.Provider
      value={{
        showLanding,
        setShowLanding,
        showLoading,
        setShowLoading,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
