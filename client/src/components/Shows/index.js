import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./shows.scss";
import Spinner from "react-bootstrap/Spinner";
import NotFound from "../../assets/img/image-not-found.png";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Shows = ({ order, start, limit }) => {
    const [showsList, setShowsList] = useState([]);
    const [showsDiscover, setShowsDiscover] = useState([]);
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
        const fetchListShows = async () => {
            const res = await axios.get(
                `https://api.betaseries.com/shows/list?order=${order}&start=${start}&limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (res.status === 200) {
                setShowsList(res.data.shows);

                console.log(res.data.shows);
                setLoading(false);
            }
        };
        const fetchDiscoverShows = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/discover?limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setShowsDiscover(response.data.shows);
                
                setLoading(false);
            }
        };
        fetchListShows();
        fetchDiscoverShows();
    }, [limit]);


    console.log(showsList);
    
    const handleClick = async (e, showId) => {
        if (e.target.className !== "active") {
            const response = await axios.post(
                `https://api.betaseries.com/shows/show?key=${process.env.REACT_APP_API_KEY}`,
                {
                    id: showId,
                    token: localStorage.getItem("token"),
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                e.target.className = "active";
            }
        } else {
            const response = await axios.delete(
                `https://api.betaseries.com/shows/show?key=${process.env.REACT_APP_API_KEY}`,
                {
                    data: {
                        id: showId,
                        token: localStorage.getItem("token"),
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
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
                                    Ici vous trouvez toutes les series provenant
                                    de betaseries
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="shows-gallery">
                        {showsList.map((show, showKey) => (
                            <div className="shows-gallery__item" key={showKey}>
                                <>
                                    <div className="shows-gallery__item__img">
                                        {show.images.poster !== null ? (
                                            <img
                                                className="show-item-img"
                                                src={show.images.poster}
                                                alt={show.title}
                                                onClick={() => {
                                                    window.location.href = `/shows/${show.id}`;
                                                }}
                                            />
                                        ) : (
                                            <img
                                                className="show-item-img"
                                                src={NotFound}
                                                alt={show.title}
                                                onClick={() => {
                                                    window.location.href = `/shows/${show.id}`;
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="text-shows">
                                        <h5>
                                            <span>{show.title}</span> (
                                            <span>{show.creation}</span>)
                                            <span>Genre {}</span>
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

Shows.propTypes = {
    order: PropTypes.string,
    start: PropTypes.number,
    limit: PropTypes.number,
    filter: PropTypes.string,
    platforms: PropTypes.string,
    country: PropTypes.string,
};

export default Shows;