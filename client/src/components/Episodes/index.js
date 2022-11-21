import React, { useState, useEffect } from 'react';
import './episodes.scss';
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { setPicturesData } from '../../features/picturesSlice';
import { setEpisodeData } from '../../features/episodeSlice';
import { useDispatch } from 'react-redux';


const Episodes = () => {
    const { id, number } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingImg, setLoadingImg] = useState(true);
    const urlPictureEpisodes = `https://api.betaseries.com/pictures/episodes?key=${process.env.REACT_APP_API_KEY}`;
    const [imgArray, setImgArray] = useState([]);
    const [slide1, setSlide1] = useState(0);
    const params = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchEpisodes = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/shows/episodes?id=${id}&season=${number}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (response.status === 200) {
                setEpisodes(response.data.episodes);
                dispatch(setEpisodeData(response.data.episodes));
                setLoading(false);
            }
        };
        fetchEpisodes();
    }, []);

    useEffect(() => {
        const fetchPictures = async (url, id) => {

            const response = await axios.get(url, {
                params: {
                    id: id,
                },
            });
            if (response.status === 200) {


                return `${response.config.url}&id=${response.config.params.id}`;
            }
        };
        const fetchPicturesArray = async () => {
            const array = [];
            for (let i = 0; i < episodes.length; i++) {
                array.push(
                    await fetchPictures(urlPictureEpisodes, episodes[i].id)
                );
            }
            setImgArray(array);
            dispatch(setPicturesData(array));
            setLoadingImg(false);
        };
        fetchPicturesArray();
    }, [episodes]);

    // console.log(imgArray);

    return (
        <>
            {loading ? (
                <div className="loading">
                    <Spinner animation="grow" variant="info" />
                </div>
            ) : (
                <>

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
                    <div className="episodes">
                        <h3>Sesson {params.number} de "{episodes[0].show.title}"</h3>
                        <div
                            className="slider"
                            style={{
                                transform: `translateX(-${slide1}%)`,
                            }}
                        >
                            {episodes.map((episode, key) => {
                                return (
                                    <div key={key}>
                                        {loadingImg ? (
                                            <Spinner
                                                animation="grow"
                                                variant="info"
                                            />
                                        ) : (
                                            <div className="slider__item__episodes">
                                                <a
                                                    href={`/shows/${episodes[0].show.id}/season/${params.number}/episode/${episode.id}`}
                                                    // onClick={() => {
                                                    //     window.location.href = `/episode/${episode.thetvdb_id}`;
                                                    // }}
                                                    className="container-episode">
                                                    <h4>
                                                        Episode{" "}
                                                        {episode.episode}
                                                    </h4>
                                                    <div className="img-container">
                                                        <img
                                                            src={imgArray[key]}
                                                            alt={episode.title}
                                                        />
                                                    </div>
                                                    <div className="title">
                                                        <p>
                                                            {episode.title}
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Episodes;