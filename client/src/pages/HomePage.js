import React, { useContext } from "react";
import { UidContext } from "../components/Hooks/AppContext";
import MemberShowsMovies from "../components/MemberShowsMovies";
import Movie from "../components/Movie";
import Show from "../components/Show";
import "../styles/pages/HomePage.scss";

export default function HomePage() {
    const uid = useContext(UidContext);
    return (
        <div className="home">
            <div className="container container-news">
                <div className='row row-home'>
                    {uid
                        ?   <MemberShowsMovies
                                id={uid}
                                order="remaining_episodes"
                                limit={50}
                                // statut="active"
                            />
                        : <>
                            <Show
                                order="followers"
                                limit={20}
                            />
                            <Movie
                                type="popular"
                                order="followers"
                                limit={20}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
}