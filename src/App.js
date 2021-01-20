import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/home';
import Header from './components/header';

function App() {
  const [dataApi, setDataApi] = useState([]);

  const url =
    'https://api.themoviedb.org/3/discover/movie/?api_key=40b79735075518fbb44c19e5036c4a4b&language=es-ES';

  const token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI3OTczNTA3NTUxOGZiYjQ0YzE5ZTUwMzZjNGE0YiIsInN1YiI6IjYwMDVmYTgyZTk0MmVlMDAzZWU3NTBkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SW2V6WWQH4AR-lNZmtW1zpRGFqKR6haXXNmxDYqeFw8';

  useEffect(() => {
    const service = () => {
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
  }, []);

  return (
    <div className="App bg-dark">
      <Header />
      <Home dataApi={dataApi} />
    </div>
  );
}

export default App;
