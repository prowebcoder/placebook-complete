import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useCallback, useState } from "react";
import Nav from "./common/Nav";
import Users from "./user/component/Users";
import Places from "./places/component/Places";
import PageNotFound from "./PageNotFound";
import UserPlaces from "./places/component/UserPlaces";
import NewPlace from "./places/component/NewPlace";
import Auth from "./user/pages/Auth";
import UpdatePlace from "./places/component/UpdatePlace";

import { AuthContext } from "./context/log-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/places" exact element={<Places />} />
        <Route path="/places" exact element={<Places />} />
        <Route path="/places/add-place" element={<NewPlace />} />
        <Route path="/:userID/:name/places" exact element={<UserPlaces />} />
        <Route path="/places/:placeID" element={<UpdatePlace />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/places" exact element={<Places />} />
        <Route path="/:userID/:name/places" exact element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        userId: userID,
      }}
    >
      <Nav />
      <main>{routes}</main>
    </AuthContext.Provider>
  );
};

export default App;
