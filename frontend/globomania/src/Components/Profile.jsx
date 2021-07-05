//react
import { useContext } from 'react';
//ctx
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';


const Profile = ({ history }) => {
    //ctx
    const { profilePic, setProfilePic } = useContext(ProfilePicCtx);
    //component logic
    const logOut = () => {
        sessionStorage.clear();
        window.location.reload()
    };
    const goToDashB = () => {
       history.push('/profile');
    }
    return (
        <section id="profile__menu">
            <div className="profile__wrap">
                <div className="profile__pic">
                <img src={profilePic ? `data:${profilePic.fileType};base64,${profilePic.fileData}` : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Amerikanische_Pekingenten_2013_01%2C_cropped.jpg'} alt="Profile picture" className="profile__img" />
                </div>
                <div className="profile__settings cta__profile" onClick={goToDashB}>
                    <svg id="pic__account" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <g data-name="Groupe 62">
                            <path id="Rectangle_24-2" data-name="Rectangle 24-2" className="cls-1" d="M25,4.91h0a8,8,0,0,1,8,8v3a8,8,0,0,1-8,8h0a8,8,0,0,1-8-8v-3A8,8,0,0,1,25,4.91Z"/>
                            <path id="Tracé_29-2" data-name="Tracé 29-2" className="cls-1" d="M25,25.63A15.88,15.88,0,0,1,40.88,41.51c0,2.12-7.78,3.53-15.88,3.58-7.78,0-15.37-1.69-15.88-3.58A15.88,15.88,0,0,1,25,25.63Z"/>
                        </g>
                    </svg>
                </div>
                <div className="log-out cta__profile" onClick={logOut}>
                <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <g>
                        <g>
                        <path class="exit" d="M18.28,9.31,24,15l-5.76,5.69"/>
                        <path class="exit-2" d="M24,15H9.45"/>
                        </g>
                        <polyline class="exit-2" points="13.94 5 5.96 5 5.96 25 13.94 25"/>
                    </g>
                </svg>
                </div>
            </div>
        </section>
    )
}

export default Profile;