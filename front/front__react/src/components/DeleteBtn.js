import { useContext } from 'react';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';

import deleteReq from '../utils/deleteReq';
import getReq from '../utils/getReq';

const DeleteBtn = ({ status, values }) => {
    const {messages, setMessages} = useContext(PublicFeedCtx);
    const deleteHandler = async(e) => {
        const button = e.target;
        const response = await deleteReq(button);
        if(response === 'Access denied, login to continue'){
            e.preventDefault();
        }else{
            const data = await getReq();
            setMessages(data);
        }
    }
    return(
        <button disabled={status} id={values.messId} className="cta delete__message message__btn" value={values.messId} data-author={values.messAuthor} onClick={deleteHandler}>delete</button>
    )
}


export default DeleteBtn;