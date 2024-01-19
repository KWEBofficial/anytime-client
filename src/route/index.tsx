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
      <Route path="/notice/:teamId" element={<NoticePage />} />
    </Routes>
  );
}
