import { Redirect, Route } from 'react-router-dom';
import Exit from './Exit';

const ProtectedRoute = ({ component : Component, ...other}) => {
    //const [isAuth, setAuth] = useState(true);
    const isAuth = sessionStorage.getItem('session');
    console.log('this', isAuth);
    return (
        <Route {...other} render={(props) => 
        isAuth ? <Component {...props} /> : <Redirect to="/auth" />} path='/' exact component={Exit}>   
        </Route>
    )
};

export default ProtectedRoute;