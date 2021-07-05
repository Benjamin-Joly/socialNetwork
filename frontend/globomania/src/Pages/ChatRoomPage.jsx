//react
import React, { useEffect, useState, useContext } from 'react';
//ctx
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';
//vendors
import ioClient from 'socket.io-client';
//components
import Profile from '../Components/Profile';
import TextInput from '../Components/TextInput';
import Messages from '../Components/Messages';
import Header from '../Components/Header';
//utils
import getImg from '../fetch/getImg';
import arrayBufferToBase64 from '../utils/bufferTo64';



const ChatroomPage = (props) => {
    //ctx
    const { isAuth, setAuth } = useContext(AuthCtx);
    const { userDatas, setUserDatas } = useContext(UserCtx);
    const { profilePic, setProfilePic } = useContext(ProfilePicCtx);
    //state
    const [ messages, setMessages ] = useState([]);
    console.log(userDatas);
    //component logic
    const getProfilePic = async () => {
        const response = await getImg();
        if(response.file){
            const buff = response.file.fileData.data;
            const data = arrayBufferToBase64(buff);
            const profileObj = {
                fileAuthor : response.file.fileAuthor,
                fileData : data,
                fileName : response.file.fileName,
                fileType : response.file.fileType,
                idfile : response.file.idfile
            };
            setProfilePic(profileObj)
        }
    }
    useEffect(() => {  
                    getProfilePic(); 
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
                        setMessages([...data]);
                        window.scroll({
                            top: 0, 
                            left: 0, 
                            behavior: 'smooth'
                          });
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
                    socket.on('imgUpdate', message => {
                        console.log('new', message);
                        setMessages(message);
                    });
                    socket.on('userUpdate', message => {
                        console.log('new');
                        setMessages(message);
                    });
                    socket.on('connection-data', data => {
                        console.log('new user connected', data.message);
                        //setMessages(message);
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