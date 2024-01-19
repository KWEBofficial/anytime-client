import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

const CalenderContext = createContext<{ refreshCalender: () => void }>({
  refreshCalender: () => {},
});

export const useCalender = () => useContext(CalenderContext);

export const CalenderProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [, setRefreshCalender] = useState({});

  const refreshCalender = () => {
    setRefreshCalender({});
  };

  return <CalenderContext.Provider value={{ refreshCalender }}>{children}</CalenderContext.Provider>;
};
