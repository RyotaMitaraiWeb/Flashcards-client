import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function GuetGuard({ children }) {
    const id = useSelector(state => state.user.id);
    if (id !== '') {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
}