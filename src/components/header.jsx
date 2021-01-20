import React from 'react';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://image.tmdb.org/t/p/w500/srYya1ZlI97Au4jUYAktDe3avyA.jpg"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-top "
            />
            Movies Vtex
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
