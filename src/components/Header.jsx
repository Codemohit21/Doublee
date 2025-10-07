// import React from 'react';

// const Header = () => {
//   return (
//     <nav className="top-nav">
//       <div className="logo">
//         <img
//           src="/doubletick-logo.png"
//           alt="DoubleTick Logo"
//           className="doubletick-logo-img"
//         />
//       </div>
//       <div className="user-menu"></div>
//     </nav>
//   );
// };

// export default Header;

import React from 'react';

const Header = () => {
  return (
    // Top navigation bar container
    <nav className="top-nav">
      {/* Logo section on the left */}
      <div className="logo">
        <img
          src="/doubletick-logo.png"
          alt="DoubleTick Logo"
          className="doubletick-logo-img"
        />
      </div>

      {/* Placeholder for user menu or profile options on the right */}
      <div className="user-menu"></div>
    </nav>
  );
};

export default Header;
