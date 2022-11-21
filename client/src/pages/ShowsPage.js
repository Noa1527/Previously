import React, { useState } from 'react';
import Show from '../components/Show';
import Shows from '../components/Shows';
import { IoIosArrowDown } from "react-icons/io";
import "../styles/pages/ShowsPage.scss";

const ShowsPage = () => {
    const [startSeries, setStartSeries] = useState(30);
    console.log(startSeries);
    return (
        <div className="shows">
            <div className="container container-shows">
                <div className='row row-shows'>
                    <div className='interesting'>
                        <Show order="followers" limit={20} />

                    </div>
                    <div className='all-shows'>
                        <Shows
                            order={"popularity"}
                            start={0}
                            limit={startSeries}
                        // platforms={"all"}
                        // country={"all"}
                        />
                    </div>
                    <div className='click-to-see'>
                        <button
                            onClick={() => setStartSeries(startSeries => startSeries + 30)}
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

export default ShowsPage;