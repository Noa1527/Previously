import React from "react";
import LogIn from "../components/LogIn";
import '../styles/pages/LoginPage.scss';

const LoginPage = () => {




    return (
        <div className="login">
            <div className="container container-login">
                <div className="row row-login">
                    <div className="container-auth">
                        <div className="title">
                            <h1 className="text-light">Login</h1>
                        </div>
                        <div className="user-signin">
                            <LogIn />
                        </div>
                        <div className="user-signon">
                            <a href="https://www.betaseries.com/inscription/?utm_source=website&utm_medium=link&utm_campaign=header" >
                                Vous n'avez pas de compte ?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
