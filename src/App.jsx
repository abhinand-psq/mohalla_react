import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuctionDetails from './components/Auctions/AuctionDetails';
import MyAuctions from './components/Auctions/MyAuctions';
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
import SignupLoading from './components/SignupLoading';

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
          <Route path="auction/:auctionId" element={<AuctionDetails />} />
        </Route>
        <Route path="/shop/:shopId/:shopName" element={<ShopPage />} />
        <Route path="/my-auctions" element={<MyAuctions />} />
        <Route path="/check" element={<SignupLoading />} />
      </Routes>
    </CreatePostProvider>
  );
}

export default App;
