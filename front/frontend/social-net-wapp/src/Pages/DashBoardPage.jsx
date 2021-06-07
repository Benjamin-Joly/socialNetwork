import Header from '../Components/Header';
import Profile from '../Components/Profile';
import { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../Contexts/UserCtx';

const DashboardPage = (props) => {
    const { userDatas, setUserDatas } = useContext(UserCtx);
    const [user, setUser] = useState();
    console.log(props);
    return(
        <div className="dashboard__wrap">
            <Header history={props.history} />
            <Profile history={props.history} />
            <div className="user__wrap">
                <h1 className="user__heading">Mon compte</h1>
                <div className="user__infos">
                    <div className="user__input-wrap">
                        <label htmlFor='user-name' className="user__name">{userDatas ? userDatas.username : <></>}</label>
                        <input className='user__input' type="text" id="user-name" />
                        <button className="cta cta__user-input">modifier</button>
                </div>
                <div className="user__input-wrap">
                    <label htmlFor='user__position' className="user__position">{userDatas ? userDatas.position : <></>}</label>
                    <input className='user__input' type="text" id="user-position" />
                    <button className="cta cta__user-input">modifier</button>
                </div>
                </div>
            </div>
            <div className="user__photo-wrap">
                <div className="user__photo"></div>
                <label htmlFor="profile__pic" className="cta cta__file-upload">Choisir une photo</label>
                <input className='disabled' type="file" name="profile__pic" id="profile__pic" />
            </div>
        </div>
    )
}

export default DashboardPage;