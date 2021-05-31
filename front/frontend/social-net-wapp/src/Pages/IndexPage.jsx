import { useEffect } from 'react';

const IndexPage = (props) => {
    useEffect(() => {
        const token = sessionStorage.getItem('session');
        if(!token){
            props.history.push('/login');
            console.log('no token');
        }else{
           props.history.push('/chat');
        } 
    });
    return(
        <div className="index__wrap">
            
        </div>
    )
}

export default IndexPage;