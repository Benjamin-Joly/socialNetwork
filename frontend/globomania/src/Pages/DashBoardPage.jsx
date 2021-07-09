//react
import React, { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../Contexts/UserCtx';
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';
import env from "react-dotenv";
//Components
import Header from '../Components/Header';
import Profile from '../Components/Profile';
//vendors
import ioClient from 'socket.io-client';
//utils
import getImg from '../fetch/getImg';
import arrayBufferToBase64 from '../utils/bufferTo64';
import sendImg from '../fetch/sendImg'
import updateProfile from '../fetch/updateProfile';
import deleteSelfReq from '../fetch/deleteSelfReq';



const DashboardPage = (props) => {
    //ctx
    const { userDatas, setUserDatas } = useContext(UserCtx);
    const { profilePic, setProfilePic } = useContext(ProfilePicCtx);
    //states
    const [ file, setFile ] = useState();
    const [ firstNameBody, setFirstNameBody ] = useState();
    const [ lastNameBody, setLastNameBody ] = useState();
    const [ positionBody, setPositionBody ] = useState();
    const [ imgStyle, setImgStyle ] = useState("user__photo");
    const [ ctaStyle, setCtaStyle ] = useState("cta");


    const token = sessionStorage.getItem('session');
    const { userId, username }  = userDatas;
    if(!token){
        props.history.push('/login'); 
    };
    const socket = ioClient(env.URL_SOCKET, {
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
        sessionStorage.clear();
        window.location.reload();
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
        setFile(img);
        setImgStyle("user__photo validation");
        setCtaStyle("cta validation__cta")
    }
    const getProfilePic = async () => {
        const response = await getImg();
        const buff = response.file.fileData.data;
        const data = arrayBufferToBase64(buff);
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
        setImgStyle("user__photo");
        setCtaStyle("cta")
    }
    const updateProfileDatas = async (e) => {
        const firstName = firstNameBody;
        const lastName = lastNameBody;
        const position = positionBody;
        const userId = userDatas.userId;
        const response = await updateProfile(firstName, lastName, userId, position);
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
            const username = response[1] + ' '+ response[2];
            sessionStorage.setItem('user', response[0]+ ' ' + username + ' '+ response[3] + ' '+ response[4] + ' '+ response[5] + ' '+ response[6]);
            setUserDatas(user);
        };
    }

    const userUpdHandleClick = (e) => {
        e.preventDefault();
        updateProfileDatas();
        
    }

    const deleteSelf = async () => {
        const response = await deleteSelfReq();
        if(response.valid === true){
            sessionStorage.clear();
            window.location.reload()
        }
    }

    return(
        <div className="dashboard__wrap">
            <Header history={props.history} />
            <Profile history={props.history} profile={profilePic} />
            <div className="user__wrap">
                <h1 className="user__heading">{userDatas.username}</h1>
                <div className="user__infos">
                    <div className="user__input-wrap">
                        <label htmlFor='user-last-name' className="user__name">Nom</label>
                        <input className='user__input' type="text" id="user-last-name" value={lastNameBody} onChange={e => setLastNameBody(e.target.value)} />
                        <button className="cta cta__user-input" onClick={userUpdHandleClick}>modifier</button>
                    </div>
                    <div className="user__input-wrap">
                        <label htmlFor='user-first-name' className="user__name">Prénom</label>
                        <input className='user__input' type="text" id="user-first-name" value={firstNameBody} onChange={e => setFirstNameBody(e.target.value)} />
                        <button className="cta cta__user-input" onClick={userUpdHandleClick}>modifier</button>
                    </div>
                    <div className="user__input-wrap">
                        <label htmlFor='user__position' className="user__position">Fonction</label>
                        <select name="" id="user-position" className='user__input' value={positionBody} onChange={e => setPositionBody(e.target.value)}>
                            <option value="intern">Stagiaire</option>
                            <option value="employee">Collaborateur</option>
                            <option value="manager">Cadre</option>
                        </select>
                        <button className="cta cta__user-input" onClick={userUpdHandleClick}>modifier</button>
                    </div>
                </div>
                <div className="user-delete__wrap">
                    <button id="user-delete" className="cta__user-delete cta" onClick={deleteSelf}>supprimer mon compte</button>
                </div>
            </div>
            <div className="user__photo-wrap">
                <div className={imgStyle}>
                    <img src={profilePic ? `data:${profilePic.fileType};base64,${profilePic.fileData}` : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Amerikanische_Pekingenten_2013_01%2C_cropped.jpg'} alt="Profile picture" className="user__img" />
                </div>
                <form action="" method="post" encType="multipart/formdata">
                    <label htmlFor="profile__pic" className="cta cta__file-upload">Choisir une photo</label>
                    <input className='disabled' type="file" name="profile__pic" id="profile__pic" onChange={sendPic}/>
                    <button className={ctaStyle} onClick={picClickHandler}>valider</button>
                </form>
            </div>
        </div>
    )
}

export default DashboardPage;