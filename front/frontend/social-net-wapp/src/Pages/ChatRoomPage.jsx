import React, { useEffect, useState } from 'react';
import ioClient from 'socket.io-client';
import Profile from '../Components/Profile';
import TextInput from '../Components/TextInput';
import Messages from '../Components/Messages';

const ChatroomPage = (props) => {
    const [ messages, setMessages ] = useState([]);

    const token = sessionStorage.getItem('session');
    const  userDatas  = () => {
        const user = sessionStorage.getItem('user');
        if(user){
            const userDatas = user.split(' ');
            return userDatas;
        }
        else{
            props.history.push('/login');
        }
    }
    const testData = userDatas();
    if(!testData){
        props.history.push('/login');
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


    return(
        <div className="chatroom__wrap">
            <Profile history={props.history} />
            <Messages content={ messages } history={props.history} />
            <TextInput />
        </div>
    )
}

export default ChatroomPage;