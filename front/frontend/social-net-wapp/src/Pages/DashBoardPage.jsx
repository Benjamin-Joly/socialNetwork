import Header from '../Components/Header';
import Profile from '../Components/Profile';
import { useEffect, useState } from 'react';

const DashboardPage = (props) => {
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
                        <label htmlFor='user-name' className="user__name">{user ? user[1] + ' ' + user[2] : <></>}</label>
                        <input className='user__input' type="text" id="user-name" />
                        <button className="cta cta__user-input">modifier</button>
                </div>
                <div className="user__input-wrap">
                    <label htmlFor='user__email' className="user__email">{user ? user[3] : <></>}</label>
                    <input className='user__input' type="text" id="user-email" />
                    <button className="cta cta__user-input">modifier</button>
                </div>
                <div className="user__input-wrap">
                    <label htmlFor='user__position' className="user__position">{user ? user[4] : <></>}</label>
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