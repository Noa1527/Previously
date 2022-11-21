import React, { useEffect, useState } from "react";
import './show.scss';
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import NotFound from '../../assets/img/image-not-found.png';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const Show = ({ order, limit }) => {
    const [showsList, setShowsList] = useState([]);
    const [showsDiscover, setShowsDiscover] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slide1, setSlide1] = useState(0)
    const [slide2, setSlide2] = useState(0)


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
        const fetchListShows = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/list?order=${order}&limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setShowsList(response.data.shows);
                setLoading(false);
            }
        };
        const fetchDiscoverShows = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/discover?limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setShowsDiscover(response.data.shows);
                console.log(response.data.shows);
                setLoading(false);
            }
        };
        fetchListShows();
        fetchDiscoverShows();
    }, []);

    return (
        <>

            {loading ? (
                <div className="loading">
                    <Spinner animation="grow" variant="info" />
                </div>
            ) : (
                <>
                    <h1>Les series</h1>
                    <div className="background">
                        <div className='icon-slider'>
                            <h3>{order}</h3>

                            <div className='icon-slider__item'>
                                <BiLeftArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide1(slide1 - 100)}
                                />
                                <BiRightArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide1(slide1 + 100)}
                                />

                            </div>
                        </div>


                        <div className="container-shows">
                            <div className="slider" style={{ transform: `translateX(-${slide1}%)`, }}>
                                <div className="shows-container">
                                    {showsList.map((show, showKey) => (
                                        <div className="show-card" key={showKey} onClick={
                                            () => {
                                                window.location.href = `/shows/${show.id}`
                                            }
                                        }>
                                            <div className="slider__item">
                                                <img
                                                    className="show-card-img"
                                                    src={show.images.poster}
                                                    alt={show.title}
                                                />
                                            </div>
                                            <div className="text-shows">
                                                <h5><span>{show.title}</span> (<span>{show.creation}</span>)</h5>
                                            </div>
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
                                    onClick={() => setSlide2(slide2 - 100)}
                                />
                                <BiRightArrow
                                    size={25}
                                    color='white'
                                    onClick={() => setSlide2(slide2 + 100)}
                                />

                            </div>
                        </div>
                        <div className="container-shows">
                            <div className="slider" style={{ transform: `translateX(-${slide2}%)`, }}>
                                <div className="shows-container">
                                    {showsDiscover.map((show, showKey) => (

                                        <div className="show-card" key={showKey} onClick={
                                            () => {
                                                window.location.href = `/shows/${show.id}`
                                            }
                                        }>
                                            <div className="slider__item">

                                                {show.images.poster !== null ?
                                                    (
                                                        <img className="show-card-img" src={show.images.poster} alt={show.title} />
                                                    ) : (
                                                        <img className="show-card-img" src={NotFound} alt={show.title} />
                                                    )

                                                }


                                            </div>
                                            <div className="text-shows">
                                                <h5><span>{show.title}</span> (<span>{show.creation}</span>)</h5>
                                            </div>
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

Show.propTypes = {
    order: PropTypes.string,
    limit: PropTypes.number,
};

export default Show;