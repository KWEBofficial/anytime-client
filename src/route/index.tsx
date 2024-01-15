import { Route, Routes } from 'react-router-dom';
import React from 'react';

import TeamPage from '../pages/team';
import SearchTeamPage from '../pages/SearchTeam';
import RegisterPage from '../pages/Register';
import PrivateSchedulePage from '../pages/PrivateSchedule';
import NoticePage from '../pages/Notice';
import MyPage from '../pages/MyPage';
import MainPage from '../pages/Main';
import LoginPage from '../pages/Login';
import AdminPage from '../pages/Admin';

/**
 * 어느 url에 어떤 페이지를 보여줄지 정해주는 컴포넌트입니다.
 * Routes 안에 Route 컴포넌트를 넣어서 사용합니다.
 */
export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/main" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />

      <Route path="/team/:teamId" element={<TeamPage />} />
      <Route path="/team/:teamId/schedule" element={<PrivateSchedulePage />} />
      <Route path="/team/:teamId/admin" element={<AdminPage />} />
      <Route path="/team/search" element={<SearchTeamPage />} />
      <Route path="/team/:teamId/notice" element={<NoticePage />} />
      <Route path="/notice/:teamId" element={<NoticePage />} />
    </Routes>
  );
}

// /*
// <Route path="/" element={<MainPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/list/:age" element={<ListPage />} />
// */
