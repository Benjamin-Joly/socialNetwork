import { useEffect } from "react";
import getReq from '../utils/getReq';
import getUsers from '../utils/getUsers';
import { useContext, useState } from 'react';
import { AdminCtx } from '../Contexts/AdminCtx';

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
        console.log(users);
    }
    useEffect(() => {
        getEverything();
    }, []);

    const adminDelete = () => {

    }

    return(
        <div className="admin-page__wrap">
            <div className="admin__box">
                <h1 className="admin__heading">Compte Administrateur</h1>
                <p className="admin__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <form action="post" className="admin__user-form">
                    {users ? users.map(user => (
                    <div key={user.userId} className="admin__user-choice">
                        <label htmlFor={user.userId} className="admin__user-label">{user.firstName + ' ' + user.lastName}</label>
                        <input type="checkbox" name={user.firstName + ' ' + user.lastName} id={user.userId} />
                    </div>
                    )) : <></>}
                </form>
                <form action="post" className="admin__message-form">
                    {messages.map(message => (
                        <div key={message.messageId} className="admin__message-choice">
                            <label htmlFor={message.messageId} className="admin__message-label">{message.messageBody}</label>
                            <input type="checkbox" name='' id={message.messageId} />
                        </div>
                    ))}
                </form>
                <div className="admin__btn-wrap">
                    <button className="admin__delete-btn cta">Supprimer</button>
                    <button className="admin__underline-btn cta">Surligner</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;