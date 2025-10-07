import React from 'react';

const Header = () => {
  return (
    <nav className="top-nav">
      <div className="logo">
        <img
          src="/doubletick-logo.png"
          alt="DoubleTick Logo"
          className="doubletick-logo-img"
        />
      </div>
      <div className="user-menu"></div>
    </nav>
  );
};

export default Header;