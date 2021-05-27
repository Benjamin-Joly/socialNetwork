import { useContext } from 'react';
import { UpdateBoxCtx } from '../Contexts/UpdateBoxCtx';

const Settings = ({user}) => {
    const [id, name, position] = user;
    const { settingsOpen, setSettingsOpen} = useContext( UpdateBoxCtx );
    let pseudo;
    const clickHandler = (e) => {
        setSettingsOpen(false);
    }
    return(
        <section className="settings__menu">
            <div id="settings" className="settings__box">
                    <div className="settings__close-bar">
                        <div className="close__btn" onClick={clickHandler}>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="settings">
                    <h2 className="settings__heading">Mon compte</h2>
                    <hr />
                        <div className="settings__wrap">
                                <div className="typo">
                                <h3 className="settings__pseudonyme">{pseudo ? pseudo : ''}</h3>
                                <h3 className="settings__name">{name}</h3>
                                <p className="settings__position">{position}</p>
                            </div>
                            <div className="img__container">
                                <img id="profile-picture" src="" alt="profile picture" srcSet="" />
                            </div>
                        </div>
                        <button className="cta settings__cta">Valider</button>
                    </div>
                </div>
        </section>
    )
}

export default Settings;