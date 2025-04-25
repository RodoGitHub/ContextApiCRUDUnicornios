import { GlobalContext } from './GlobalContext';

const GlobalProvider = ({ children }) => {
  
  return (
    <GlobalContext.Provider value={{  }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
