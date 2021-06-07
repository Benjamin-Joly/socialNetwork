import React, { useEffect, useState, useContext } from 'react';
import ioClient from 'socket.io-client';
import Profile from '../Components/Profile';
import TextInput from '../Components/TextInput';
import Messages from '../Components/Messages';
import Header from '../Components/Header';
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';


const ChatroomPage = (props) => {
    const [ messages, setMessages ] = useState([]);
    const { isAuth, setAuth } = useContext(AuthCtx);
    const { userDatas, setUserDatas } = useContext(UserCtx);
    //console.log(userDatas);
    useEffect(() => {  
                    const { userId, username, email, position, description, imgUrl } = userDatas;
                    const socket = ioClient('http://localhost:3000', {
                        query : {
                            user :  username,
                            userId : userId
                        },
                        auth : {
                            token : sessionStorage.getItem('session')
                        },
                        forceNew : true
                    });
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
   
    return(
        <div className="chatroom__wrap">
            <Header history={props.history} />
            <Profile history={props.history} />
            <Messages content={ messages } history={props.history} />
            <TextInput />
        </div>
    )
}

export default ChatroomPage;