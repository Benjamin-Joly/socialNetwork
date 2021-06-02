import React from 'react';
import ioClient from 'socket.io-client';
import getUserData from '../utils/getUserDatas';
import { useState } from 'react';

const Messages = ({ content, history }) => {
    const messRef = React.createRef();
    const [updateBody, setUpdateBody] = useState('');
    const messages = content;
    const token = sessionStorage.getItem('session');
    const [ userId, firstName, lastName, position ] = getUserData();
    if(!token){
        history.push('/login');
    }
    const socket = ioClient('http://localhost:3000', {
        query : {
            user :  firstName + ' ' + lastName,
            userId : userId
        },
        auth : {
            token : sessionStorage.getItem('session')
        },
        forceNew : true
    });
    const mineOrTheirs = (message) => {
        if(message.messageAuthor === parseInt((userId), 10)){
            return 'message__wrap message__mine'
        }else{
            return 'message__wrap message__theirs'
        }
    };
    const updateMessage = (e) => {
        const target = parseInt((e.target.id), 10);
        const input = e.target.previousElementSibling;
        const div = e.target.parentElement;
        if(socket){
            socket.emit('update', {
                btnId : target,
                messageBody : updateBody
            });
        }
        input.value = '';
        div.className = 'update__wrap disabled'
    };
    const deleteMessage = (e) => {
        e.preventDefault();
        const target = parseInt((e.target.id), 10);
        if(socket){
            socket.emit('delete', {
                btnId : target
            });
        }
        setUpdateBody('');
    };
    const toggleUpdateInput = (e) => {
        const target = e.target.nextElementSibling;
        if(target.className === 'update__wrap'){
            target.className = 'update__wrap disabled'
        }else{
            target.className = 'update__wrap'
        }
    }

    return(
        <section className="messages__wrap">
                {messages.map((message) => (
                    <div key={message.messageId} id={message.messageId} className={mineOrTheirs(message)}>
                        <p className="message__author">{message.messageAuthorName}</p>
                        <p className="message__body">{message.messageBody}</p>
                        {message.gifUrl ? <img id={message.messageGifId} src={message.gifUrl} alt="" className='gif-message__gif' /> : <></>}
                        <p className="message__date">{message.messageDate}</p>
                    {message.messageAuthor === parseInt((userId), 10) ? (
                        <div className="btn__wrap">
                            <button id={message.messageId} className="cta" onClick={deleteMessage}>supprimer</button>
                            <p id={message.messageId} className="update__link" onClick={toggleUpdateInput}>update</p>
                            <div key={message.messageId} className='update__wrap disabled'>
                                <input  id={message.messageId} className='update__input' type="text" onInput={e => setUpdateBody(e.target.value)} ref={messRef} />
                                <button id={message.messageId} className="update__btn cta" onClick={updateMessage}>modifier</button>
                            </div>
                        </div>
                    ) : <></>}
                    </div>
                ) )}
        </section>
    )
}

export default Messages;