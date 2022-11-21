import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Spinner from "react-bootstrap/esm/Spinner";
import "../styles/pages/ShowPage.scss";
import { AiFillStar } from "react-icons/ai";

const ShowPage = () => {
    const { id } = useParams();
    const [showInfo, setShowInfo] = useState([]);
    const [show, setShow] = useState([]);
    const [idShowList, setIdShowList] = useState([]);

    const [btnStyleChange, setBtnStyleChange] = useState(false);
    const [btnStyleChangeArchive, setBtnStyleChangeArchive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(null);
    const [loading3, setLoading3] = useState(null);
    const [baner, setBaner] = useState("");
    const [slide1, setSlide1] = useState(0);
    const [slide2, setSlide2] = useState(0);

    // Style btn Add list
    const [addListStyle, setAddListStyle] = useState({
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 25,
        width: "max-content",
        borderRadius: 3,
        padding: "5px 10px",
        fontSize: 16,
    });

    // Style btn Add list
    const [addArchiveStyle, setAddArchiveStyle] = useState({
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 25,
        width: "max-content",
        borderRadius: 3,
        padding: "5px 10px",
        fontSize: 16,
    });

    const backgroundBanner = {
        backgroundImage: "",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.5,
        // zIndex: -1,
    };

    useEffect(() => {
        const fetchShow = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/seasons?id=${id}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                console.log(response.data.seasons);
                setShow(response.data.seasons);
                setLoading(false);
            }
        };
        const getListUserShows = async (userId) => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/member?id=${userId}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setIdShowList(response.data.shows);
                if (response.data.shows.length > 0) {
                    response.data.shows.forEach((show) => {
                        if (show.id === parseInt(id)) {
                            setBtnStyleChange(true);
                            setAddListStyle((prev) => ({
                                ...prev,
                                backgroundColor: "#00cc2c",
                                color: "#000",
                            }));
                        }
                    });
                } else {
                    setBtnStyleChange(true);
                    setAddListStyle((prev) => ({
                        ...prev,
                        backgroundColor: "#00cc2c",
                        color: "#fff",
                    }));
                }
            }
        };
        const fetchShowInfo = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/display?id=${id}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                console.log(response.data.show);
                setShowInfo(response.data.show);
                setBaner(response.data.show.images.banner);
                setLoading(false);
            }
        };
        fetchShow();
        getListUserShows(localStorage.getItem("user_id"));
        fetchShowInfo();
    }, []);

    const handleClickSave = async (e, id) => {
        setLoading2(true);
        if (!btnStyleChange) {
            const response = await axios.post(
                `https://api.betaseries.com/shows/show?key=${process.env.REACT_APP_API_KEY}`,
                {
                    id,
                    token: localStorage.getItem("token"),
                }
            );
            if (response.status === 200) {
                setAddListStyle((prev) => ({
                    ...prev,
                    backgroundColor: "#00cc2c",
                    color: "#000",
                }));
                setBtnStyleChange(true);
                setLoading2(false);
            }
        } else {
            const response = await axios.delete(
                `https://api.betaseries.com/shows/show?key=${process.env.REACT_APP_API_KEY}`,
                {
                    data: {
                        id,
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                setAddListStyle((prev) => ({
                    ...prev,
                    backgroundColor: "#fff",
                    color: "#000",
                }));
                setBtnStyleChange(false);
                setLoading2(false);
            }
        }
    };

    const handleClickSaveArchive = async (e, id) => {
        setLoading3(true);
        if (!btnStyleChangeArchive) {
            const response = await axios.post(
                `https://api.betaseries.com/shows/archive?key=${process.env.REACT_APP_API_KEY}`,
                {
                    id,
                    token: localStorage.getItem("token"),
                }
            );
            if (response.status === 200) {
                setAddArchiveStyle((prev) => ({
                    ...prev,
                    backgroundColor: "#00ff37",
                    color: "#000",
                }));
                setBtnStyleChangeArchive(true);
                setLoading3(false);
            }
        } else {
            const response = await axios.delete(
                `https://api.betaseries.com/shows/archive?key=${process.env.REACT_APP_API_KEY}`,
                {
                    data: {
                        id,
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                setAddArchiveStyle((prev) => ({
                    ...prev,
                    backgroundColor: "#fff",
                    color: "#000",
                }));
                setBtnStyleChangeArchive(false);
                setLoading3(false);
            }
        }
    };

    return (
        <div className="home-show">
            {loading ? (
                <div className="loading">
                    <Spinner animation="grow" variant="info" />
                </div>
            ) : (
                <>
                    {/* All infos Serie */}
                    <div className="show-info-container">
                        {/* Background */}
                        <div
                            className="show-banner"
                            style={{
                                ...backgroundBanner,
                                backgroundImage: `url(${baner})`,
                            }}
                        ></div>

                        {/* Title */}
                        <div className="title">
                            <h1>{showInfo.title}</h1>
                        </div>

                        {/* Description */}
                        <div className="show-description">
                            <p>{showInfo.description}</p>
                        </div>

                        {/* Serie Info */}
                        <div className="show-info">
                            <div className="show-info-left">
                                <h3>Genre(s)</h3>
                                {Object.keys(showInfo.genres).map((key) => (
                                    <p key={key}>{showInfo.genres[key]}</p>
                                ))}
                                <h3>Nombre de saisons</h3>
                                <p>{showInfo.seasons}</p>
                                <h3>Nombre d'épisodes</h3>
                                <p>{showInfo.episodes}</p>
                            </div>
                            <div className="show-info-middle">
                                <figure>
                                    <img
                                        className="show-poster"
                                        src={showInfo.images.poster}
                                        alt="poster"
                                    />
                                </figure>
                            </div>
                            <div className="show-info-right">
                                <h3>Notes</h3>
                                <p>
                                    <AiFillStar />{" "}
                                    {`${showInfo.notes.mean.toFixed(2)}`}
                                </p>
                                <h3>Pays</h3>
                                <p>{showInfo.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Button + loading */}
                    <button
                        style={addListStyle}
                        onClick={(e) => handleClickSave(e, id)}
                    >
                        {btnStyleChange
                            ? "Supprimer la série de ma liste"
                            : "Ajouter la série à ma liste"}
                    </button>
                    {loading2 ? (
                        <Spinner animation="grow" variant="info" />
                    ) : null}

                    {/* Button archive */}
                    <button
                        style={addArchiveStyle}
                        onClick={(e) => handleClickSaveArchive(e, id)}
                    >
                        {btnStyleChangeArchive
                            ? "Désarchiver la série"
                            : "Archiver la série"}
                    </button>
                    {loading3 ? (
                        <Spinner animation="grow" variant="info" />
                    ) : null}

                    {/* Button Watch */}

                    {/* Content */}
                    <div className="container-bottom">

                        <div className="icon-slider">
                            <div className="icon-slider__item">
                                <BiLeftArrow
                                    size={25}
                                    color="white"
                                    onClick={() => setSlide1(slide1 - 100)}
                                />
                                <BiRightArrow
                                    size={25}
                                    color="white"
                                    onClick={() => setSlide1(slide1 + 100)}
                                />
                            </div>
                        </div>

                        <div className="container-shows">
                            <div
                                className="slider"
                                style={{ transform: `translateX(-${slide1}%)` }}
                            >
                                {show.map((season, key) => {
                                    return (
                                        <div className="shows-container">
                                            <div className="show-card" key={key}>
                                                <div className="slider__item">
                                                    <img
                                                        className="show-card-img"
                                                        src={season.image}
                                                        alt={season.number}
                                                        onClick={() => {
                                                            window.location.href = `${id}/season/${season.number}/`;
                                                        }}
                                                    />
                                                    <h5>Saison {season.number}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShowPage;
