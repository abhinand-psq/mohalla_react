import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';
import CommunityPage from './components/CommunityPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import CreatePostModal from './components/CreatePostModal';
import ShopPage from './components/ShopPage';
import { CreatePostProvider } from './context/CreatePostContext';
import './App.css';

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import { Toaster } from 'sonner';

function App() {
  return (
    <CreatePostProvider>
      <Toaster position="top-right" richColors />
      <CreatePostModal />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Feed />
              <RightSidebar />
            </>
          } />
          <Route path="r/:subreddit" element={<CommunityPage />} />
        </Route>
        <Route path="/shop/:shopId/:shopName" element={<ShopPage />} />
      </Routes>
    </CreatePostProvider>
  );
}

export default App;
