import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/home';
import Header from './components/header';

function App() {
  const [dataApi, setDataApi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const url =
    'https://api.themoviedb.org/3/discover/movie/?api_key=40b79735075518fbb44c19e5036c4a4b&language=es-ES' +
    '&page=' +
    currentPage;

  const token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI3OTczNTA3NTUxOGZiYjQ0YzE5ZTUwMzZjNGE0YiIsInN1YiI6IjYwMDVmYTgyZTk0MmVlMDAzZWU3NTBkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SW2V6WWQH4AR-lNZmtW1zpRGFqKR6haXXNmxDYqeFw8';

  useEffect(() => {
    const service = (page) => {
      fetch(url, {
        Headers: {
          Autorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDataApi(data.results);
        });
    };
    service();
  }, [currentPage]);

  return (
    <div className="App bg-dark">
      <Header />
      <Home dataApi={dataApi} />
      <div className="d-flex justify-content-center ">
        <nav aria-label="Page navigation example ">
          <ul className="pagination">
            <li className="page-item">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                className="page-link"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item">
              <button
                onClick={() => setCurrentPage(1)}
                className="page-link"
                href="#"
              >
                1
              </button>
            </li>
            <li className="page-item">
              <button
                onClick={() => setCurrentPage(2)}
                className="page-link"
                href="#"
              >
                2
              </button>
            </li>
            <li className="page-item">
              <button
                onClick={() => setCurrentPage(3)}
                className="page-link"
                href="#"
              >
                3
              </button>
            </li>
            <li className="page-item">
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                className="page-link"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
