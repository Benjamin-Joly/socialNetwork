import Settings from '../components/Settings';
import getUser from '../utils/getUser';

import { useState } from 'react';
import { useContext } from 'react';
import { UpdateBoxCtx } from '../Contexts/UpdateBoxCtx';

const Profile = (props) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const userString = sessionStorage.getItem('user');
    const user = userString.split(',');
    const [ id, name, position ] = user;
    const clickHandler = () => {
        setSettingsOpen(!settingsOpen);
    }
    const logOut = () => {
        sessionStorage.clear();
        document.location.reload();
    };
    return (
        <section id="profile__menu">
            <div className="profile__wrap">
                <div className="profile__pic"></div>
                <div className="profile__settings profile__btn" onClick={clickHandler}>
                    <p className="profile__text">
                        S
                    </p>
                </div>
                <div className="log-out profile__btn" onClick={logOut}>
                <p className="profile__text">
                        E
                    </p>
                </div>
            </div>
            <UpdateBoxCtx.Provider value={{settingsOpen, setSettingsOpen}}>
                {settingsOpen ? <Settings user={ user }/> : <></>}
            </UpdateBoxCtx.Provider>
        </section>
    )
}

export default Profile;