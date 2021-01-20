import React, { useState, useEffect } from 'react';

const Home = ({ dataApi }) => {
  const [getGender, setGetGender] = useState([]);
  const [genderNameList, setGenderNameList] = useState('');
  const [detailsMovies, setDetailsMovies] = useState([]);

  const url =
    'https://api.themoviedb.org/3/genre/movie/list?api_key=40b79735075518fbb44c19e5036c4a4b';

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
          setGetGender(data.genres);
        });
    };
    service();
  }, []);

  const getNameGender = (idList) => {
    const name = [];
    idList &&
      idList.map((id) => {
        const nameGender = getGender?.find(
          (objectGender) => objectGender.id === id
        );
        name.push(nameGender.name);
      });
    setGenderNameList(name.toString());
  };

  console.log(detailsMovies, dataApi);

  return (
    <div>
      {dataApi.map((item, index) => {
        return (
          <div key={index} className="container ">
            <div className="row">
              <div className="col m-3">
                <button
                  onClick={() => {
                    getNameGender(item.genre_ids);
                    setDetailsMovies(item);
                  }}
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <div className="card" style={{ width: '18rem' }}>
                    <img
                      src={
                        item.backdrop_path
                          ? 'https://image.tmdb.org/t/p/w500' +
                            item.backdrop_path
                          : 'Image not available'
                      }
                      className="card-img-top"
                      alt="img_movie"
                    />

                    <div className="card-body">
                      <h5 className="card-title text-dark">
                        {item.original_title}
                      </h5>
                      <p className="card-text text-dark">
                        Date of publication: {item.release_date}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="d-flex justify-content-center ">
        <nav aria-label="Page navigation example ">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      //Modal---------
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close justify-content-right"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
