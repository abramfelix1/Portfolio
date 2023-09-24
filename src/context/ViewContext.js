import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [showLanding, setShowLanding] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <ViewContext.Provider
      value={{
        showLanding,
        setShowLanding,
        showLoading,
        setShowLoading,
        showMainMenu,
        setShowMainMenu,
        showWarning,
        setShowWarning,
        showProjects,
        setShowProjects,
        showAbout,
        setShowAbout,
        showContact,
        setShowContact,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
