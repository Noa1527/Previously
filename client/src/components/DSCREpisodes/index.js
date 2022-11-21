import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from "react-bootstrap/esm/Spinner";
import { AiFillStar } from "react-icons/ai";

import './dscrepisodes.scss'

const DSCREpisodes = () => {
    const [episode, setEpisode] = useState([]);
    const [picture, setPicture] = useState([]);
    const [loading, setLoading] = useState(null);
    const [loading2, setLoading2] = useState(null);
    const [btnStyleChange, setBtnStyleChange] = useState(false);
    const [data, setData] = useState("");
    const [data2, setData2] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const episodesData = useSelector((state) => state.episode.episode);
    const params = useParams();
    const { id } = useParams();
    let height = 400;
    let width = 400;
    let notes = parseInt(rating)

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

    useEffect(() => {
        const fetchEpisodes = async () => {

            const res = await axios.get(
                `https://api.betaseries.com/episodes/display?id=${params.epId}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (res.status === 200) {
                console.log(res.data.episode);
                setEpisode(res.data.episode);
                setTitle(res.data.episode.show.title);
                setRating(res.data.episode.note.mean);
                setLoading(false);
            }
        };
        const fetchPictures = async () => {
            const res = await axios.get(
                `https://api.betaseries.com/pictures/episodes?id=${params.epId}&width=${width}&height=${height}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (res.status === 200) {
                setPicture(res.request.responseURL);
                setLoading(false);
            }
        }

        fetchPictures();
        fetchEpisodes();
        if (episodesData !== null) {
            setData(episodesData[0].show.title)
        }
        if (episode.show !== undefined) {
            setData2(episode.show.title)
        }
    }, []);

    const fetchWatched = async (e, id) => {
        if (!btnStyleChange) {
            const res = await axios.post(
                `https://api.betaseries.com/episodes/watched?id=${params.epId}&key=${process.env.REACT_APP_API_KEY}`,
                {
                    id,
                    token: localStorage.getItem("token"),
                }
            );
            if (res.status === 200) {
                console.log(res);
                setAddListStyle((prev) => ({
                    ...prev,
                    backgroundColor: "#00cc2c",
                    color: "#000",
                }));
                setBtnStyleChange(true);
                setLoading2(false);
            }
        } else {
            const res = await axios.delete(
                `https://api.betaseries.com/episodes/watched?id=${params.epId}&key=${process.env.REACT_APP_API_KEY}`,
                {
                    data: {
                        id,
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (res.status === 200) {
                setAddListStyle((prev) => ({
                    ...prev,
                    backgroundColor: "#fff",
                    color: "#000",
                }));
                setBtnStyleChange(false);
                setLoading2(false);
            }
        }
    }
    return (
        <>
            {loading ? (
                <>
                    <div className="loading">
                        <Spinner animation="grow" variant="info" />
                    </div>
                </>
            ) : (
                <>
                    <div className='container-fluid container-episode'>
                        <div className='row row-episode'>
                            <div className='col-12 col-episode'>
                                <div className='info-episode'>

                                    <div className='title-ep'>
                                        <div className='return-to-presedent-season'></div>
                                        <div className='title'>
                                            <h1>{title} - Saison {params.number} Episode {episode.episode}</h1>
                                            <h2>{episode.title} date de diffusion {episode.date}</h2>
                                            <h3><AiFillStar /> {`${notes.toFixed(2)}`} / 5 </h3>
                                        </div>
                                    </div>

                                    <div className='description-episode'>
                                        <div className='image-episode'>
                                            <img src={picture} alt='image episode' />
                                        </div>

                                        <div className='descri-episode'>
                                            <div className='description'>
                                                <h4>épisode déscription</h4>
                                                <p>{episode.description}</p>
                                            </div>

                                            <button
                                                style={addListStyle}
                                                onClick={(e) => fetchWatched(e, id)}
                                            >
                                                {btnStyleChange
                                                    ? "X"
                                                    : "V"}
                                            </button>
                                            {loading2 ? (
                                                <Spinner animation="grow" variant="info" />
                                            ) : null}

                                            <div className='button-archive'>
                                                <button className='btn btn-primary'>Archiver</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default DSCREpisodes;