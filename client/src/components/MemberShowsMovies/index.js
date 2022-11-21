import Axios from 'axios';
import React, { useEffect } from 'react';
import './membershowsmovies.scss'

const MemberShowsMovies = ({ id, order, limit }) => {

    useEffect(() => {
        const fetchFilms = async (id, order, limit) => {
            const res = await Axios.get(
                `https://api.betaseries.com/shows/member?id=${id}&order=${order}&limit=${limit}&key=${process.env.REACT_APP_API_KEY}`
            );
            if (res.status === 200) {
                console.log(res.data);
            }
        };
        fetchFilms(id, order, limit);
    }, []);

    return (
        <>
            <div className='baner-serie-to-see'>
                <div>
                    {
                        <picture>

                        </picture>
                    }

                </div>
                <div className='filter-baner'></div>
            </div>
            <div className='episode-to-see'>

            </div>
            <div className='movie-to-see'>

            </div>
        </>
    );
};

export default MemberShowsMovies;