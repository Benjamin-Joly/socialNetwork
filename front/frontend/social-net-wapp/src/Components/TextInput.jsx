import ioClient from 'socket.io-client';
import React, { useState } from 'react';

const TextInput = (props) => {
    const messRef = React.createRef();

    const textResize = () => {
        const text = document.getElementById('message__content');
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
        if(text.value.length === 0){
            text.style.height = 'auto';
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('session');
        const  userDatas  = () => {
            const user = sessionStorage.getItem('user');
            if(user){
                const userDatas = user.split(' ');
                return userDatas;
            }
        }
        const [ userId, firstName, lastName, position ] = userDatas();
        if(!token){
            props.history.push('/login');
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
    if(socket){
        socket.emit('newMessage', {
            message : messRef.current.value
        });
    }
    }
    return (
        <section id="text-area">
            <div id="text-area__wrap">
                <form action="" method="post" id="post-message">
                    <textarea id="message__content" name="Message" className="message__text-area" onInput={textResize} ref={messRef} />
                    <button id="message-submit" value="temporaire" className="cta" onClick={sendMessage}>Envoyer</button>
                </form>
            </div>
        </section>
    )
}

export default TextInput;