const Profile = ({ history }) => {
    const logOut = () => {
        sessionStorage.clear();
        history.push('/login');
    };
    return (
        <section id="profile__menu">
            <div className="profile__wrap">
                <div className="profile__pic"></div>
                <div className="profile__settings cta__profile">
                    <svg id="pic__account" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <g data-name="Groupe 62">
                            <path id="Rectangle_24-2" data-name="Rectangle 24-2" class="cls-1" d="M25,4.91h0a8,8,0,0,1,8,8v3a8,8,0,0,1-8,8h0a8,8,0,0,1-8-8v-3A8,8,0,0,1,25,4.91Z"/>
                            <path id="Tracé_29-2" data-name="Tracé 29-2" class="cls-1" d="M25,25.63A15.88,15.88,0,0,1,40.88,41.51c0,2.12-7.78,3.53-15.88,3.58-7.78,0-15.37-1.69-15.88-3.58A15.88,15.88,0,0,1,25,25.63Z"/>
                        </g>
                    </svg>
                </div>
                <div className="log-out cta__profile" onClick={logOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.505" height="25.768" viewBox="0 0 22.505 25.768">
                    <g id="pic__exit" transform="translate(-1278.375 20.067)">
                        <path d="M1294.226-8.547l7.456,7.362-7.456,7.362" transform="translate(-2.936 -2.597)" fill="none" stroke="#e9e9e9" stroke-linecap="round" stroke-width="3"/>
                        <path d="M1298.745-3.782h-18.87V-18.567" fill="none" stroke="#e9e9e9" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </g>
                </svg>
                </div>
            </div>
        </section>
    )
}

export default Profile;