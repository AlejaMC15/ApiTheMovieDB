import React, { useState, useEffect } from 'react';

const Home = ({ dataApi }) => {
  const [getGender, setGetGender] = useState([]);
  const [genderNameList, setGenderNameList] = useState('');
  const [detailsMovies, setDetailsMovies] = useState([]);
  const [nameActress, setNameActress] = useState([]);

  const url =
    'https://api.themoviedb.org/3/genre/movie/list?api_key=40b79735075518fbb44c19e5036c4a4b';

  const token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI3OTczNTA3NTUxOGZiYjQ0YzE5ZTUwMzZjNGE0YiIsInN1YiI6IjYwMDVmYTgyZTk0MmVlMDAzZWU3NTBkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SW2V6WWQH4AR-lNZmtW1zpRGFqKR6haXXNmxDYqeFw8';

  useEffect(() => {
    const service = () => {
      fetch(url, {
        Headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setGetGender(data.genres);
        });
    };
    service();
  }, []);

  const listIdMovie = (item) => {
    fetch(
      'https://api.themoviedb.org/3/movie/' +
        item +
        '/credits?api_key=40b79735075518fbb44c19e5036c4a4b',
      {
        Headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const nameList = [];
        data.cast &&
          data.cast.map((name) => {
            nameList.push(name.name);
          });
        setNameActress(nameList.toString());
      });
  };

  const getNameGender = (idList) => {
    const nameList = [];
    idList &&
      idList.map((id) => {
        const nameGender = getGender?.find(
          (objectGender) => objectGender.id === id
        );
        nameList.push(nameGender.name);
      });
    setGenderNameList(nameList.toString());
  };

  return (
    <div className="m-5">
      {dataApi.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              getNameGender(item.genre_ids);
              setDetailsMovies(item);
              listIdMovie(item.id);
            }}
            type="button"
            className="btn btn-dark m-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <div className="card m-1" style={{ width: '18rem' }}>
              <img
                src={
                  item.backdrop_path
                    ? 'https://image.tmdb.org/t/p/w500' + item.backdrop_path
                    : 'Image not available'
                }
                className="card-img-top"
                alt="img_movie"
              />
              <div className="card-body">
                <h5 className="card-title text-dark">{item.original_title}</h5>
                <p className="card-text text-dark">
                  Date of publication: {item.release_date}
                </p>
              </div>
            </div>
          </button>
        );
      })}
      //Modal---------
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <img
                src={
                  'https://image.tmdb.org/t/p/w500' +
                  detailsMovies.backdrop_path
                }
                className="card-img-top"
                alt="img_movie"
              />
            </div>
            <p>{detailsMovies.title}</p>
            <p>Gender: {genderNameList}</p>
            <p>Date: {detailsMovies.release_date}</p>
            <p className="m-3">Actress: {nameActress}</p>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
