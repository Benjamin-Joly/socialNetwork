const Header = ({ history }) => {
    const getBack = () => {
        history.push('/chat');
    }
    return (

        <header id="header">
            <div id="logo" onClick={getBack}>
            </div>
            {/* <nav id="navigation">
                <li>Messages</li>
                <li>Mon compte</li>
                <li>Se déconnecter</li>
            </nav> */}
        </header>
    )
} 

export default Header;