import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "../api/users.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./User.jsx";

export function Header() {
    const [token, setToken] = useAuth();

    const { sub } = token ? jwtDecode(token) : {};
    const userInfoQuery = useQuery({
        queryKey: ["users", sub],
        queryFn: () => getUserInfo(sub),
        enabled: Boolean(sub),
    });
    const userInfo = userInfoQuery.data;

    if (token && userInfo) {
        return (
            <div>
                <h1>Ball State Real-Time Recipe Blog</h1>
                <p>Final Project For CS 618 - Written By Christian Hering</p>
                Logged in as <User {...userInfo} />
                <br />
                <button onClick={() => setToken(null)}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Ball State Real-Time Recipe Blog</h1>
            <p>Final Project For CS 618 - Written By Christian Hering</p>
            <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
        </div>
    );
}
