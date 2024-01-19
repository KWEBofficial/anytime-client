import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

const TeamTitleContext = createContext<{ refreshTitle: () => void }>({
  refreshTitle: () => {},
});

export const useTeamTitle = () => useContext(TeamTitleContext);

export const TeamTitleProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [, setRefreshTitle] = useState({});

  const refreshTitle = () => {
    setRefreshTitle({});
  };

  return <TeamTitleContext.Provider value={{ refreshTitle }}>{children}</TeamTitleContext.Provider>;
};
