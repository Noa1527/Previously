import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../helpers/LinkNavData';
import { UidContext } from '../Hooks/AppContext';
import './nav.css';

const Nav = () => {
    const uid = useContext(UidContext);

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <>
            <nav className='nav'>
                <div className='container-nav container'>
                    <div className='content-nav'>
                        <h1 className='text-light fs-4'><NavLink to={'/'}>FollowSeries</NavLink></h1>
                        {links.map(link => (
                            <div key={link.path} className="menu-item">
                                <link.icons
                                    size={20}
                                />
                                <NavLink to={link.path}>{link.text}</NavLink>
                            </div>
                        ))}
                        <div className="menu-empty"></div>
                        <div className="menu-item">
                            {uid 
                                ? <NavLink to={'/'} onClick={handleLogout}>se déconecter</NavLink>
                                : <NavLink to={'/login'}>Connexion</NavLink>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;