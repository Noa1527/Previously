import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert } from "react-bootstrap";

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [getListFriends, setGetListFriends] = useState([]);
    const [getFriendsRequest, setGetFriendsRequest] = useState([]);
    const [getListFriendsBlocked, setGetListFriendsBlocked] = useState([]);
    const [loading, setLoading] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("emails");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertMessageFriend, setAlertMessageFriend] = useState("");

    useEffect(() => {
        const getFriendsList = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/friends/list?key=${process.env.REACT_APP_API_KEY}`,
                {
                    params: {
                        id: localStorage.getItem("user_id"),
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                setGetListFriends(response.data.users);
            }
        };
        const getFriendsRequestList = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/friends/requests?key=${process.env.REACT_APP_API_KEY}`,
                {
                    params: {
                        received: "true",
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                setGetFriendsRequest(response.data.users);
            }
        };
        const getFriendsListBlocked = async () => {
            const response = await axios.get(
                `https://api.betaseries.com/friends/list?key=${process.env.REACT_APP_API_KEY}`,
                {
                    params: {
                        blocked: "true",
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                setGetListFriendsBlocked(response.data.users);
            }
        };
        getFriendsList();
        getFriendsRequestList();
        getFriendsListBlocked();
    }, []);

    const getFriends = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = {
            type: filter,
            emails: search,
            token: localStorage.getItem("token"),
        };
        const response = await axios.get(
            `https://api.betaseries.com/friends/find?key=${process.env.REACT_APP_API_KEY}`,
            {
                params,
            }
        );
        if (response.status === 200) {
            console.log(response.data.users);
            setFriends(response.data.users);
            setLoading(false);
        }
    };

    const handleSendRequest = async (e, id) => {
        const params = {
            id,
            token: localStorage.getItem("token"),
        };
        const response = await axios.post(
            `https://api.betaseries.com/friends/friend?key=${process.env.REACT_APP_API_KEY}`,
            params
        );
        if (response.status === 200) {
            setAlertMessage("Demande envoyée");
        }
    };

    const handleBlockFriend = async (e, id) => {
        const params = {
            id,
            token: localStorage.getItem("token"),
        };
        const response = await axios.post(
            `https://api.betaseries.com/friends/block?key=${process.env.REACT_APP_API_KEY}`,
            {
                params,
            }
        );
        if (response.status === 200) {
            setAlertMessageFriend("Utilisateur bloqué");
        }
    };

    const handleDeleteFriend = async (e, id) => {
        const params = {
            id,
            token: localStorage.getItem("token"),
        };
        const response = await axios.delete(
            `https://api.betaseries.com/friends/friend?key=${process.env.REACT_APP_API_KEY}`,
            {
                params,
            }
        );
        if (response.status === 200) {
            setAlertMessageFriend("Suppression effectuée");
        }
    };

    return (
        <div className="friends-home">
            <h1>Liste Amis</h1>
            <p>Ajouter une virgule pour ajouter plusieurs personnes</p>
            <form className="search-friends" onSubmit={getFriends}>
                <label htmlFor="search" id="icon">
                    <BiSearch />
                </label>
                <input
                    className="search-bar"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Rechercher un ami.e ou plusieurs ami.e.s"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <select
                    name="search-type"
                    id="search-type"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="emails">Email</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                </select>
            </form>
            <div className="friends-list-search">
                {friends.length > 0 ? (
                    <>
                        <h4>Utilisateur(s) trouvé(s)...</h4>
                        {alertMessage !== "" && (
                            <Alert variant="success">{alertMessage}</Alert>
                        )}
                    </>
                ) : (
                    <h4>Aucun resultats...</h4>
                )}
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    friends.map((friend) => (
                        <div className="friend-section">
                            <div className="friend-item">
                                <p>{friend.login}</p>
                                <button
                                    onClick={(e) =>
                                        handleSendRequest(e, friend.id)
                                    }
                                >
                                    Ajouter en ami
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="friend-list">
                <div className="friend-section">
                    {getListFriends.length > 0 ? (
                        <>
                            <h4>Mes amis</h4>
                            {alertMessageFriend !== "" && (
                                <Alert variant="success">
                                    {alertMessageFriend}
                                </Alert>
                            )}
                        </>
                    ) : (
                        <h4>Aucun ami</h4>
                    )}
                    {getListFriends.map((friend) => (
                        <div className="friend-item">
                            <p>{friend.login}</p>
                            <button
                                onClick={(e) =>
                                    handleDeleteFriend(e, friend.id)
                                }
                            >
                                Supprimer cet ami
                            </button>
                            <button
                                onClick={(e) => handleBlockFriend(e, friend.id)}
                            >
                                Bloquer cet ami
                            </button>
                        </div>
                    ))}
                </div>
                <div className="friend-section">
                    {getListFriends.length > 0 ? (
                        <>
                            <h4>Mes demandes d'amis</h4>
                            {alertMessageFriend !== "" && (
                                <Alert variant="success">
                                    {alertMessageFriend}
                                </Alert>
                            )}
                        </>
                    ) : (
                        <h4>Aucun ami</h4>
                    )}
                    {getFriendsRequest.map((friend) => (
                        <div className="friend-item">
                            <p>{friend.login}</p>
                            <button
                                onClick={(e) => handleSendRequest(e, friend.id)}
                            >
                                Ajouter en ami
                            </button>
                            {/* <button
                                onClick={(e) =>
                                    handleDeleteFriend(e, friend.id)
                                }
                            >
                                Supprimer cet ami
                            </button> */}
                        </div>
                    ))}
                </div>
                
                <div className="friend-section">
                    {getListFriends.length > 0 ? (
                        <>
                            <h4>Comptes bloqué(s)</h4>
                            {alertMessageFriend !== "" && (
                                <Alert variant="success">
                                    {alertMessageFriend}
                                </Alert>
                            )}
                        </>
                    ) : (
                        <h4>Aucun ami</h4>
                    )}
                    {getListFriendsBlocked.map((friend) => (
                        <div className="friend-item">
                            <p>{friend.login}</p>
                            <button
                                onClick={(e) => handleSendRequest(e, friend.id)}
                            >
                                Ajouter en ami
                            </button>
                            {/* <button
                                onClick={(e) =>
                                    handleDeleteFriend(e, friend.id)
                                }
                            >
                                Supprimer cet ami
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;
