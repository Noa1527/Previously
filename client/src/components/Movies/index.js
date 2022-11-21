import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./movies.scss";
import Spinner from "react-bootstrap/Spinner";
import NotFound from "../../assets/img/image-not-found.png";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Movies = ({ order, start, limit }) => {
    const [movieList, setMovieList] = useState([]);
    const [movieDiscover, setMovieDiscover] = useState([]);
    const [idMovieList, setIdMovieList] = useState([]);
    let inList = "";
    const [loading, setLoading] = useState(true);
    const [slide1, setSlide1] = useState(0);
    const [slide2, setSlide2] = useState(0);

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
        limit = 30;
    }

    useEffect(() => {
        const fetchListMovies = async () => {
            const res = await axios.get(
                `https://api.betaseries.com/movies/list?order=${order}&start=${start}&limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (res.status === 200) {
                setMovieList(res.data.movies);
                console.log(res.data.movies);
                setLoading(false);
            }
        };
        // const fetchDiscoverMovies = async () => {
        //     const res = await axios.get(
        //         `https://api.betaseries.com/movies/discover?limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
        //     );
        //     if (res.status === 200) {
        //         setMovieDiscover(res.data.movies);
        //         setLoading(false);
        //     }
        // };
        // const getListUserMovies = async (id) => {
        //     const res = await axios.get(
        //         `https://api.betaseries.com/movies/member?id=${id}&key=${process.env.REACT_APP_API_KEY}`
        //     );
        //     if (res.status === 200) {
        //         setIdMovieList(res.data.movies);
        //     }
        // };
        fetchListMovies();
        // fetchDiscoverMovies();
        // getListUserMovies(localStorage.getItem("user_id"));
    }, [limit]);

    console.log(movieList);
    
    const handleClick = async (e, moviesId) => {
        if (e.target.className !== "active") {
            const res = await axios.post(
                `https://api.betaseries.com/movies/show?key=${process.env.REACT_APP_API_KEY}`,
                {
                    id: moviesId,
                    token: localStorage.getItem("token"),
                }
            );
            if (res.status === 200) {
                console.log(res.data);
                e.target.className = "active";
            }
        } else {
            const res = await axios.delete(
                `https://api.betaseries.com/movies/show?key=${process.env.REACT_APP_API_KEY}`,
                {
                    data: {
                        id: moviesId,
                        token: localStorage.getItem("token"),
                    },
                }
            );
            console.log(res);
            if (res.status === 200) {
                console.log(res.data);
                e.target.className = "not-active";
            }
        }
    };

    return (
        <>
            {loading ? (
                <div className="loading">
                    <Spinner animation="grow" variant="info" />
                </div>
            ) : (
                <div className="content-shows-gallery">
                    <div className="fillter-shows">
                        <div className="fillter">
                            <div className="fillter__item">
                                <div className="fillter-genre">
                                    <select name="" id="">
                                        <option value="">Tous</option>
                                    </select>
                                </div>
                            </div>
                            <div className="fillter__item">
                                <div className="fillter-text">
                                    <p>SUR</p>
                                </div>
                            </div>
                            <div className="fillter__item">
                                <div className="fillter-platforme">
                                    <select name="" id="">
                                        <option value="">
                                            Toutes les platformes
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="fillter">
                            <div className="text-infos">
                                <p>
                                    ici vous trouver tout les seris parvenant de
                                    betaseries
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="shows-gallery">
                        {movieList.map((movie, movieKey) => (
                            <div
                                className="shows-gallery__item"
                                key={movieKey}
                                onClick={() => {
                                    window.location.href = `/movies/${movie.id}`;
                                }}
                            >
                                <>
                                    {/* <button
                                        className={inList}
                                        onClick={(e) => handleClick(e, show.id)}
                                    >
                                        Ajouter à la liste de lecture
                                    </button> */}
                                    <div className="shows-gallery__item__img">
                                        {movie.poster !== null ? (
                                            <img
                                                className="show-item-img"
                                                src={movie.poster}
                                                alt={movie.title}
                                            />
                                        ) : (
                                            <img
                                                className="show-item-img"
                                                src={NotFound}
                                                alt={movie.title}
                                            />
                                        )}
                                    </div>
                                    <div className="text-shows">
                                        <h5>
                                            <span>{movie.title}</span> (
                                            <span>{movie.production_year}</span>)
                                        </h5>
                                    </div>
                                </>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

Movies.propTypes = {
    order: PropTypes.string,
    start: PropTypes.number,
    limit: PropTypes.number,
    filter: PropTypes.string,
    platforms: PropTypes.string,
    country: PropTypes.string,
};

export default Movies;