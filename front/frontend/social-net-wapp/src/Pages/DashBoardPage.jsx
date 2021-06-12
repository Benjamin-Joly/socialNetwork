//react
import React, { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../Contexts/UserCtx';
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';
//Components
import Header from '../Components/Header';
import Profile from '../Components/Profile';
//vendors
import ioClient from 'socket.io-client';
//utils
import getImg from '../utils/getImg';
import arrayBufferToBase64 from '../utils/bufferTo64';
import sendImg from '../utils/sendImg'
import updateProfile from '../utils/updateProfile';



const DashboardPage = (props) => {
    //ctx
    const { userDatas, setUserDatas } = useContext(UserCtx);
    const { profilePic, setProfilePic } = useContext(ProfilePicCtx);
    //states
    const [user, setUser] = useState();
    const [ file, setFile ] = useState();
    //ref
    const inputPic = React.createRef();
    const inputFirstName = React.createRef();
    const inputLastName = React.createRef()
    const inputPosition = React.createRef();

    //socket.io block could be refactored. (not DRY)
    const token = sessionStorage.getItem('session');
    const { userId, username, email, position, description, imgUrl }  = userDatas;
    if(!token){
        props.history.push('/login'); 
    };
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
    socket.on('disconnect', () => {
        props.history.push('/login');
    });
    

    //comp logic
    const profilePicUpdate = (type, data) => {
        if(socket){
            socket.emit('imgUpdate', {
                fileData:`data:${type};base64,${data}`,
                author : userId
            });
        };
    };
    const sendPic = (e) => {
        const img = e.target.files[0];
        setFile(img)
        //
    }
    const getProfilePic = async () => {
        const response = await getImg();
        const buff = response.file.fileData.data;
        const data = arrayBufferToBase64(buff);
        //const data = buff.toString('base64');
        const profileObj = {
            fileAuthor : response.file.fileAuthor,
            fileData : data,
            fileName : response.file.fileName,
            fileType : response.file.fileType,
            idfile : response.file.idfile
        };
    setProfilePic(profileObj);
    profilePicUpdate(response.file.fileType, data);
}
    const picClickHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        const send = await sendImg(formData);
        getProfilePic();
    }
    const updateProfileDatas = async (e) => {
        const firstName = inputFirstName.current.value;
        const lastName = inputLastName.current.value;
        const position = inputPosition.current.value;
        const userId = userDatas.userId;
        console.log(firstName, lastName, userId, position);
        const response = await updateProfile(firstName, lastName, userId, position);
        console.log(response);
        if(socket){
            socket.emit('userUpdate', {
                userId : response[0],
                username : response[1] + ' '+ response[2],
                position : response[4],
            });
            const user = {
                userId : response[0],
                username : response[1] + ' '+ response[2],
                email : response[3],
                position : response[4],
                description : response[5],
                imgUrl : 'imgUrl'
            };
            setUserDatas(user);
        };

        //{userDatas ? userDatas.username : <></>}
        //{userDatas ? userDatas.position : <></>}
    }

    const userUpdHandleClick = (e) => {
        e.preventDefault();
        updateProfileDatas();
        
        console.log(userDatas);
    }
    console.log(userDatas);

    return(
        <div className="dashboard__wrap">
            <Header history={props.history} />
            <Profile history={props.history} profile={profilePic} />
            <div className="user__wrap">
                <h1 className="user__heading">Mon compte</h1>
                <div className="user__infos">
                    <div className="user__input-wrap">
                        <label htmlFor='user-last-name' className="user__name">Nom</label>
                        <input className='user__input' type="text" id="user-last-name" ref={inputLastName} />
                        <button className="cta cta__user-input" onClick={userUpdHandleClick}>modifier</button>
                    </div>
                    <div className="user__input-wrap">
                        <label htmlFor='user-first-name' className="user__name">Prénom</label>
                        <input className='user__input' type="text" id="user-first-name" ref={inputFirstName} />
                        <button className="cta cta__user-input" onClick={userUpdHandleClick}>modifier</button>
                    </div>
                    <div className="user__input-wrap">
                        <label htmlFor='user__position' className="user__position">Fonction</label>
                        <select name="" id="user-position" className='user__input' ref={inputPosition}>
                            <option value="intern">Stagiaire</option>
                            <option value="employee">Collaborateur</option>
                            <option value="manager">Cadre</option>
                        </select>
                        <button className="cta cta__user-input" onClick={userUpdHandleClick}>modifier</button>
                    </div>
                </div>
            </div>
            <div className="user__photo-wrap">
                <div className="user__photo">
                    <img src={profilePic ? `data:${profilePic.fileType};base64,${profilePic.fileData}` : ''} alt="Profile picture" className="user__img" />
                </div>
                <form action="" method="post" encType="multipart/formdata">
                    <label htmlFor="profile__pic" className="cta cta__file-upload">Choisir une photo</label>
                    <input className='disabled' type="file" name="profile__pic" id="profile__pic" ref={inputPic} onChange={sendPic}/>
                    <button className="cta" onClick={picClickHandler}>valider</button>
                </form>
            </div>
        </div>
    )
}

export default DashboardPage;