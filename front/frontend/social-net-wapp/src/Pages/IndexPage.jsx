import { useContext } from "react";
import { AuthCtx } from '../Contexts/AuthCtx';

const IndexPage = (props) => {
    const { isAuth, setAuth } = useContext(AuthCtx);

    if(isAuth === true){
        props.history.push('/chat');
    }
    return(
        <div className="index__wrap">
            
        </div>
    )
}

export default IndexPage;