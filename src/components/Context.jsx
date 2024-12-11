import { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [friends, setFriedns] = useState(null);
  const [groups, setGroups] = useState(null);
  return (
    <MovieContext.Provider
      value={{
        profile,
        setProfile,
        friends,
        setFriedns,
        groups,
        setGroups,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
