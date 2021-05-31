const Profile = ({ history }) => {
    const logOut = () => {
        sessionStorage.clear();
        history.push('/login');
    };
    return (
        <section id="profile__menu">
            <div className="profile__wrap">
                <div className="profile__pic"></div>
                <div className="profile__settings profile__btn">
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
        </section>
    )
}

export default Profile;