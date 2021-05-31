import React, { useEffect, useState } from 'react';
import ioClient from 'socket.io-client';
import Profile from '../Components/Profile';

const ChatroomPage = (props) => {
    const [ messages, setMessages ] = useState([]);
    const messRef = React.createRef();

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

    const sendMessage = (e) => {
        e.preventDefault();
        if(socket){
            socket.emit('newMessage', {
                    messageBody : messRef.current.value,
                    userId : userId,
                    username : firstName+' '+lastName,
                    position : position
            });
        }
    };

    const deleteMessage = (e) => {
        e.preventDefault();
        const target = parseInt((e.target.id), 10);
        if(socket){
            socket.emit('delete', {
                btnId : target
            });
        }
    }

    const updateMessage = (e) => {
        const target = parseInt((e.target.id), 10);
        if(socket){
            socket.emit('update', {
                btnId : target
            });
        }
    }

    const textResize = () => {
        const text = document.getElementById('message__content');
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
        if(text.value.length === 0){
            text.style.height = 'auto';
        }
    };

    useEffect(() => {
        socket.on('message', data => {
            console.log(data);
            setMessages([...data]);
        });
        socket.on('notAllowed', data => {
            console.log(data);
        });
        socket.on('disconnect', () => {
            props.history.push('/login');
        });
        socket.emit('joinRoom', {
            message : 'welcome message'
        });
        socket.on('newMessage', message => {
            console.log('new');
            setMessages(message);
        });
        return () => {
            socket.emit('leaveRoom', {
                message : 'Byebye message'
            });
        }
    }, []);

    const mineOrTheirs = (message) => {
        if(message.messageAuthor === parseInt((userId), 10)){
            return 'message__wrap message__mine'
        }else{
            return 'message__wrap message__theirs'
        }
    }

    return(
        <div className="chatroom__wrap">
            <Profile history={props.history} />
            <section className="messages__wrap">
                {messages.map((message) => (
                    <div key={message.messageId} id={message.messageId} className={mineOrTheirs(message)}>
                        <p className="message__author">{message.messageAuthorName}</p>
                        <p className="message__body">{message.messageBody}</p>
                        <p className="message__date">{message.messageDate}</p>
                    {message.messageAuthor === parseInt((userId), 10) ? (
                        <div className="btn__wrap">
                            <button id={message.messageId} className="cta" onClick={deleteMessage}>supprimer</button>
                            <p id={message.messageId} className="update__btn" onClick={updateMessage}>update</p>
                        </div>
                    ) : <></>}
                    </div>
                ) )}
            </section>
            <section id="text-area">
                <div id="text-area__wrap">
                    <form action="" method="post" id="post-message">
                        <textarea id="message__content" name="Message" className="message__text-area" onInput={textResize} ref={messRef} />
                        <button id="message-submit" value="temporaire" className="cta" onClick={sendMessage}>Envoyer</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ChatroomPage;