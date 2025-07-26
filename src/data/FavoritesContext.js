// import React, { createContext, useState, useContext, useEffect } from 'react';

// const FavoritesContext = createContext();

// export function FavoritesProvider({ children }) {
//   const [favorites, setFavorites] = useState(() => {
//     const stored = localStorage.getItem('favorites');
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   const addToFavorites = (item) => {
//     setFavorites((prev) => {
//       if (!prev.some(fav => fav.title === item.title)) {
//         return [...prev, item];
//       }
//       return prev;
//     });
//   };

//   const removeFromFavorites = (title) => {
//     setFavorites((prev) => prev.filter(fav => fav.title !== title));
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// }

// export function useFavorites() {
//   return useContext(FavoritesContext);
// }



import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (!prev.some(fav => fav.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter(fav => fav.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
