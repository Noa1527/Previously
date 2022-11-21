import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss';
import Router from "./components/router";
import { UidContext } from './components/Hooks/AppContext';
import axios from 'axios';


const App = () => {
  const [uid, setUid] = useState("")
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const res = await axios({
          method: "get",
          url: `https://api.betaseries.com/members/infos?id=${userId}`,
          headers: {
            "X-BetaSeries-Key": process.env.REACT_APP_API_KEY,
            "X-BetaSeries-Version": "3.0",
          },
        });
        if (res.status === 200) {
          setUid(res.data.member.id);
        }
      };
      fetchUser();
    } else {
      setUid(null);
    }
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Router />
    </UidContext.Provider>
  );
};

export default App;

