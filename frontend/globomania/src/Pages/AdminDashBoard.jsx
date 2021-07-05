import { useContext, useState, useEffect } from 'react';
import { AdminCtx } from '../Contexts/AdminCtx';

import getReq from '../fetch/getReq';
import getUsers from '../fetch/getUsers';
import deleteUser from '../fetch/deleteUser';
import deleteMessage from '../fetch/deleteMessage';

const AdminDashboard = (props) => {
    const { adminAuth, setAdminAuth } = useContext(AdminCtx);
    const [ messages, setMessages ] = useState([]);
    const [ users, setUsers ] = useState();
    console.log(adminAuth);  
    adminAuth === true ? <></> : props.history.push('/login/admin');
    const getEverything = async () => {
        const messagesArr = await getReq();
        const usersArr = await getUsers();
        const pack = {
            messages : messagesArr,
            users : usersArr
        }
        setMessages(pack.messages);
        setUsers(pack.users);
    }
    useEffect(() => {
        getEverything();
    }, []);

    const selectValues = (e) => {
        const target = e.target;
        console.log(target.checked);   

    }
    const getUsersChecked = () => {
        const inputs = Array.from(document.querySelectorAll('.admin__user-input'));
        const checked = inputs.filter(input => input.checked === true);
        const query = checked.map(input => parseInt(input.id, 10));
        return query;
    }
    const getMessagesChecked = () => {
        const inputs = Array.from(document.querySelectorAll('.admin__message-input'));
        const checked = inputs.filter(input => input.checked === true);
        const query = checked.map(input => parseInt(input.id, 10));
        return query;
    }
    const handleClickDeleteUsers = async () => {
        const query = getUsersChecked();
        console.log(query);
        const response = await deleteUser(query);
    }
    const handleClickDeleteMessages = async () => {
        const query = getMessagesChecked();
        console.log(query);
        const response = await deleteMessage(query);
    }

    return(
        <div className="admin-page__wrap">
            <div className="admin__box">
                <h1 className="admin__heading">Compte Administrateur</h1>
                <p className="admin__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <form action="post" className="admin__user-form">
                    <h2>Utilisateurs</h2>
                    {users ? users.map(user => (
                    <div key={user.userId} className="admin__user-choice">
                        <label htmlFor={user.userId} className="admin__user-label">{user.firstName + ' ' + user.lastName}</label>
                        <input type="checkbox" className='admin__user-input' name={user.firstName + ' ' + user.lastName} id={user.userId} />
                    </div>
                    )) : <></>}
                </form>
                <div className="admin__btn-wrap">
                    <button className="admin__delete-btn cta cta__admin" onClick={handleClickDeleteUsers}>Supprimer</button>
                    {/* <button className="admin__underline-btn cta cta__admin">Surligner</button> */}
                </div>
                <hr />
                <form action="post" className="admin__message-form">
                <h2>Messages</h2>
                    {messages.map(message => (
                        <div key={message.messageId} className="admin__message-choice">
                            <label htmlFor={message.messageId} className="admin__message-label">{message.messageBody}</label>
                            <input type="checkbox" name='' id={message.messageId} value={message.messageId} className='admin__message-input' />
                        </div>
                    ))}
                </form>
                <div className="admin__btn-wrap">
                    <button className="admin__delete-btn cta cta__admin" onClick={handleClickDeleteMessages}>Supprimer</button>
                    {/* <button className="admin__underline-btn cta cta__admin">Surligner</button> */}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;