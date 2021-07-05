//react
import React, { useState, useContext } from 'react';
//vendors
import ioClient from 'socket.io-client';
//ctx
import { UserCtx } from '../Contexts/UserCtx';
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';

const Messages = ({ content, history }) => {
    //ctx
    const { userDatas, setUserDatas } = useContext(UserCtx);
    //states
    const [updateBody, setUpdateBody] = useState('');
    //component logic
    const messages = content;
    //socket.io block can be refactored (not DRY)
    const token = sessionStorage.getItem('session');
    console.log(userDatas);
    if(!token){
        history.push('/login');
    }
    const socket = ioClient('http://localhost:3000', {
        query : {
            user :  userDatas.username,
            userId : userDatas.userId
        },
        auth : {
            token : sessionStorage.getItem('session')
        },
        forceNew : true
    });
    const mineOrTheirs = (message) => {
        if(message.messageAuthor === parseInt((userDatas.userId), 10)){
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
                        <div className="message__author-wrap">
                        <img src={message.profilePicData ? `${message.profilePicData}` : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Amerikanische_Pekingenten_2013_01%2C_cropped.jpg'} alt="Profile picture" className="message__author-img" />
                        <p className="message__author">{message.messageAuthorName}</p>
                    </div>
                        <p className="message__body">{message.messageBody}</p>
                        {message.gifUrl ? <img id={message.messageGifId} src={message.gifUrl} alt="" className='gif-message__gif' /> : <></>}
                        <p className="message__date">{message.messageDate}</p>
                    {message.messageAuthor === parseInt((userDatas.userId), 10) ? (
                        <div key={message.messageId} className="btn__wrap">
                            <button id={message.messageId} className="cta" onClick={deleteMessage}>supprimer</button>
                            <p id={message.messageId} className="update__link" onClick={toggleUpdateInput}>modifier</p>
                            <div key={message.messageId} className='update__wrap disabled'>
                                <input  id={message.messageId} className='update__input' type="text" value={updateBody} onChange={e => setUpdateBody(e.target.value)}/>
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