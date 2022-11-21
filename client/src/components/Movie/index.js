import React, { useEffect, useState } from "react";
import './movie.scss';
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const Movie = ({ type, order, limit }) => {
    const [filmsList, setFilmsList] = useState([]);
    const [filmsDiscover, setFilmsDiscover] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slide3, setSlide3] = useState(0)
    const [slide4, setSlide4] = useState(0)

    if (!order || order === "") {
        order = "followers";
    }

    if (order === "followers") {
        order = "followers";
    } else if (order === "popularity") {
        order = "popularity";
    } else {
        order = "alphabétique";
    }

    if (!limit || limit <= 0) {
        limit = 20;
    }

    useEffect(() => {
        const fetchFilms = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/movies/list?order=${order}&limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setFilmsList(response.data.movies);
                setLoading(false);
            }
        };
        const fetchDiscoverFilms = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/movies/discover?type=${type}&limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setFilmsDiscover(response.data.movies);
                setLoading(false);
            }
        };
        fetchFilms();
        fetchDiscoverFilms();
    }, []);
    return (
        <>

            {loading ? (
                <div className="loading">
                    <Spinner animation="grow" variant="info" />
                </div>
            ) : (
                <>
                    <h1>Les filmes</h1>
                    <div className="background">


                        <div className='icon-slider'>
                            <h3>{order}</h3>

                            <div className='icon-slider__item'>
                                <BiLeftArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide3(slide3 - 100)}
                                />
                                <BiRightArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide3(slide3 + 100)}
                                />

                            </div>
                        </div>
                        <div className="container-movies">
                            <div className="slider" style={{ transform: `translateX(-${slide3}%)`, }}>
                                <div className="films-container">
                                    {filmsList.map((film, filmKey) => (
                                        <div className="film-card" key={filmKey} onClick={
                                            () => {
                                                window.location.href = `/movies/${film.id}`
                                            }
                                        }>
                                            {film.poster !== null &&
                                                film.title !== "" ? (
                                                <>
                                                    <div className="slider__item">
                                                        <img
                                                            className="show-card-img"
                                                            src={film.poster}
                                                            alt={film.title}
                                                        />
                                                    </div>
                                                    <div className="text-shows">
                                                        <h5><span>{film.title}</span>(<span>{film.production_year}</span>)</h5>
                                                    </div>
                                                </>

                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="background">

                        <div className='icon-slider'>
                            <h3>Découverte</h3>

                            <div className='icon-slider__item'>
                                <BiLeftArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide4(slide4 - 100)}
                                />
                                <BiRightArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide4(slide4 + 100)}
                                />

                            </div>
                        </div>
                        <div className="container-movies">
                            <div className="slider" style={{ transform: `translateX(-${slide4}%)`, }}>
                                <div className="films-container">
                                    {filmsDiscover.map((film, filmKey) => (
                                        <div className="film-card" key={filmKey} onClick={
                                            () => {
                                                window.location.href = `/movies/${film.id}`
                                            }
                                        }>
                                            {film.poster !== null &&
                                                film.title !== "" ? (
                                                <>
                                                    <div className="slider__item">
                                                        <img
                                                            className="show-card-img"
                                                            src={film.poster}
                                                            alt={film.title}
                                                        />
                                                    </div>
                                                    <div className="text-shows">
                                                        <h5><span>{film.title}</span>(<span>{film.production_year}</span>)</h5>
                                                    </div>
                                                </>

                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

Movie.propTypes = {
    type: PropTypes.string,
    order: PropTypes.string,
    limit: PropTypes.number,
};

export default Movie;
