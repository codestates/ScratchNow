import './style.css';

import Header from './components/UI/Header';
import { JoinPage, LoginPage, MainPage, MyPage, OtherUserPage } from './pages';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const [isHeaderOn, setIsHeaderOn] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const exceptHeaderList = ['/join', '/login'];
    if (exceptHeaderList.includes(location.pathname)) {
      setIsHeaderOn(false);
    } else {
      setIsHeaderOn(true);
    }
  }, [location.pathname]);

  return (
    <>
      {isHeaderOn && <Header />}
      <section id={isHeaderOn ? 'container' : 'no_header_container'}>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/join"
            element={<JoinPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/my"
            element={<MyPage />}
          />
          <Route
            path="/other"
            element={<OtherUserPage />}
          />
        </Routes>
      </section>
    </>
  );
}
