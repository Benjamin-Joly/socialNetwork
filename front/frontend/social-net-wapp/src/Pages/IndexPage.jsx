import { useContext } from "react";
import { AuthCtx } from '../Contexts/AuthCtx';

const IndexPage = (props) => {
    const { isAuth, setAuth } = useContext(AuthCtx);
    isAuth === true ? props.history.push('/chat') : props.history.push('/login');
    return(
        <div className="index__wrap">
            
        </div>
    )
}

export default IndexPage;