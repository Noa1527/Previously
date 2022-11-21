import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import "../styles/pages/ShowsPage.scss";
import Movie from '../components/Movie';
import Movies from '../components/Movies';

const MoviesPage = () => {
    const [startMovies, setStartMovies] = useState(30);

    return (
       <div className="movies">
            <div className="container container-movies">
                <div className='row row-movies'>
                    <div className='interesting'>
                    <Movie type="popular" order="followers" limit={20} />

                    </div>
                    <div className='all-movies'>
                        <Movies
                            order={"popularity"}
                            start={0}
                            limit={startMovies}
                        />
                    </div>
                    <div className='click-to-see'>
                        <button
                            onClick={() => setStartMovies(startMovies => startMovies + 30)}
                            className="btn btn-primary btn-add"
                        >
                            <span>
                                <IoIosArrowDown
                                    size={20}
                                />
                            </span>
                            <p>
                                Voir plus
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;