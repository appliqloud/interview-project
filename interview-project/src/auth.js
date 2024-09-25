import { jwtDecode } from "jwt-decode";

const AuthProvider = () => {
    /* let token = localStorage.getItem('sessiontoken')
    const { exp } = jwtDecode(token)
    // Refresh the token a minute early to avoid latency issues
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
        console.log("exp token");     
    } */
};

export { AuthProvider };