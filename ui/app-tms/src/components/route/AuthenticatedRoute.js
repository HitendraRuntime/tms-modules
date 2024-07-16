import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../services/AuthService";

const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
        return children;
    }

    return <Navigate to="/" />

}
export default AuthenticatedRoute;