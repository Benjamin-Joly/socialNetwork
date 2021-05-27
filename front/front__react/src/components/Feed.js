//components
import DeleteBtn from '../components/DeleteBtn';
import UpdateBtn from '../components/UpdateBtn';
import checkAuthor from '../utils/checkAuthor';
//utils
import deleteReq from '../utils/deleteReq';
import putReq from '../utils/putReq';
import getReq from '../utils/getReq';
//contexts
import { useContext } from 'react';
import { useState } from 'react';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';


const Feed = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const {messages, setMessages} = useContext(PublicFeedCtx);
    const addBtnStatus = () => {
        const userId = sessionStorage.getItem('userId');
        const btns = Array.from(document.querySelectorAll('.message__btn'));
        const disaBtns = btns.filter(x => (x.dataset.author !== userId));
        console.log(disaBtns);
    };  
    const buttons = (message) => {
        const userId = parseInt(sessionStorage.getItem('userId'), 10);
        if(userId === message.messageAuthor){
            return(
                <div className="message__buttons">
                    <DeleteBtn status={isAuth} values={{messId:parseInt(message.messageId), messAuthor:parseInt(message.messageAuthor), messBody:message.messageBody}} />
                    <UpdateBtn status={isAuth} values={{messId:parseInt(message.messageId), messAuthor:parseInt(message.messageAuthor), messBody:message.messageBody}} />
                </div> 
            )
        }
    }
    const whosMessage = (message) => {
        const userId = parseInt(sessionStorage.getItem('userId'), 10);
        if(userId === message.messageAuthor){
            return "__mine"
        }else{
            return "__theirs"
        }
    }
    return (
        <section id="public__feed" className="message__feed">
            <div className="messages__wrap" >
                {messages.map(message => (
                    <div key={message.messageId} id={message.messageId} className={`message__wrap message${whosMessage(message)}`}>
                        <div className="message-author__wrap">
                            <p className="message__author">{message.messageAuthorName}</p>
                            <p className="message__position">{message.messageAuthorPosition}</p>
                        </div>
                        <p id={message.messageId} className="message__body">{message.messageBody}</p>
                        <p className="message__date">{message.messageDate}</p>
                        {buttons(message)}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Feed;