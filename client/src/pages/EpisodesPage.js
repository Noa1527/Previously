import React, { useEffect } from "react";
import "../styles/pages/EpisodesPage.scss";
import Episodes from "../components/Episodes";
import DSCREpisodes from "../components/DSCREpisodes";
import Personnages from "../components/Personnages";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";

const EpisodesPage = () => {
    const [episode, setEpisode] = React.useState([]);
    const [picture, setPicture] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [rating, setRating] = React.useState("");
    const params = useParams();
    const episodesData = useSelector((state) => state.episode.episode);
    const picturesData = useSelector((state) => state.pictures.pictures);
    let notes = parseInt(rating)

    useEffect(() => {

        if (episodesData !== null && picturesData !== null) {
            setEpisode(episodesData[0]);
            setPicture(picturesData[0]);
            setTitle(picturesData[0].show.title);
            setRating(picturesData[0].note.mean);


        }
    }, []);
    console.log(episode);

    return (
        <div className="home-series">
            <div className="container container-home-series">
                <div className="row-home-series">
                    <div className="description-episode">
                        {params.epId
                            ? <DSCREpisodes />
                            :
                            <>
                                <div className='container-fluid container-episode'>
                                    <div className='row row-episode'>
                                        <div className='col-12 col-episode'>
                                            <div className='info-episode'>

                                                <div className='title-ep'>
                                                    <div className='return-to-presedent-season'></div>
                                                    <div className='title'>

                                                        <h1>{ title } - Saison {params.number} Episode {episode.episode}</h1>
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
                                                        <div className='button-add'>
                                                            <button className='btn btn-primary'>Ajouter à ma liste</button>
                                                        </div>
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
                        }
                    </div>
                    <div className="episode-slider">
                        <Episodes />
                    </div>
                    <div className="personnages">
                        <Personnages />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodesPage;
