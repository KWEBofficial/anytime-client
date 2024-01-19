import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

const SidebarContext = createContext<{ refresh: () => void }>({
  refresh: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [, setRefresh] = useState({});

  const refresh = () => {
    setRefresh({});
  };

  return <SidebarContext.Provider value={{ refresh }}>{children}</SidebarContext.Provider>;
};
