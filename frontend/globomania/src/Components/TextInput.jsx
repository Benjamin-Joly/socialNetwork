//react
import React, { useState, useContext } from 'react';
import env from "react-dotenv";
//vendors
import ioClient from 'socket.io-client';
//ctx
import { UserCtx } from '../Contexts/UserCtx';
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';

const TextInput = (props) => {
    //ctx
    const { userDatas, setUserDatas } = useContext(UserCtx);
    const { profilePic, setProfilePic } = useContext(ProfilePicCtx);
    //states
    const [ gifs, setGifs ] = useState([]);
    const [ isOpen, setOpen ] = useState(false);
    const [ nextGifs, setNextGifs ] = useState(0);
    const [ messageBody, setMessageBody ] = useState('');
    const [ searchBody, setSearchBody ] = useState('');
    //component logic
    const dataString = `data:${profilePic ? profilePic.fileType : ''};base64,${profilePic ? profilePic.fileData : ''}`;
    const token = sessionStorage.getItem('session');
    const { userId, username, email, position, description, imgUrl }  = userDatas;
    if(!token){
        props.history.push('/login'); 
    };
    const socket = ioClient(env.URL_SOCKET, {
        query : {
            user :  username,
            userId : userId
        },
        auth : {
            token : sessionStorage.getItem('session')
        },
        forceNew : true
    });

    const sendMessage = (e) => {
        e.preventDefault();
        if(socket){
            socket.emit('newMessage', {
                    messageBody : messageBody,
                    userId : userId,
                    username : username,
                    position : position,
                    profilePicData : dataString
            });
            setMessageBody('');
        };       
    };
    const sendGif = (e) => {
        e.preventDefault();
        const target = parseInt((e.target.id), 10);
        const fullGif = e.target.dataset.fullsize;
        if(socket){
            socket.emit('newGif', {
                    messageBody : ``,
                    userId : userId,
                    username : username,
                    position : position,
                    messageGifId : `${target}`,
                    gifUrl : fullGif,
                    profilePicData : dataString
            });
        };
    };
    const textResize = (e) => {
        const text = e.target;
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
        if(text.value.length === 0){
            text.style.height = 'auto';
        }
    }

    const getSomeGif = async (e) => {
        e.preventDefault();
        //dotenv
        const apikey = `${env.API_KEY}`;
        const lmt = 20;
        const searchTerm = searchBody;
        sessionStorage.setItem('gifPosition', 0);

        const myHeader = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        const url = "https://g.tenor.com/v1/search?q=" + searchTerm + "&key=" +
            apikey + "&limit=" + lmt;
         const response = await fetch(url, myHeader);
         if(response){
             const data = await response.json();
             data ? setGifs(data.results) : console.log('no datas');
             const next = parseInt(data.next, 10);
             setNextGifs(next)
         }
    };
    const getNextGifs = async (e) => {
        e.preventDefault();
        const apikey = `${env.API_KEY}`;
        const lmt = 20;
        const searchTerm = searchBody;
        const myHeader = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        const url = "https://g.tenor.com/v1/search?q=" + searchTerm + "&key=" +
            apikey + "&limit=" + lmt + "&pos=" + nextGifs +"&locale" + "&media_filter";
         const response = await fetch(url, myHeader);
         if(response){
            const data = await response.json();
            console.log(data);
            data ? setGifs(data.results) : console.log('no datas');
            const next = parseInt(data.next, 10);
            setNextGifs(next)
        }
    }
    const toggleGifMenu = (e) => {
        e.preventDefault();
        setOpen(!isOpen);
    }

    const handleGifSend = (e) => {
        sendGif(e);
        toggleGifMenu(e);
    }
    return (
        <section id="text-area">
                <div id="text-area__wrap">
                    <form action="" method="post" id="post-message">
                        <textarea id="message__content" name="Message" className="message__text-area" onInput={textResize} value={messageBody} onChange={e => setMessageBody(e.target.value)} placeholder={`${username}, exprime-toi je t'en prie`}/>
                        <button type='submit' id="message-submit" value="temporaire" className="cta__message" onClick={sendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33.938" height="30.003" viewBox="0 0 33.938 30.003">
                                <path id='pic__send' d="M14.639,3.929a1.543,1.543,0,0,1,2.828,0L30.925,34.781a1.543,1.543,0,0,1-1.414,2.159L15.643,29.079,2.6,36.941a1.543,1.543,0,0,1-1.414-2.159Z" transform="translate(36.941 -1.052) rotate(90)"/>
                            </svg>
                        </button>
                        <button id="gif-submit" value="temporaire" className="cta__gif" onClick={toggleGifMenu}>gif</button>
                    </form>
                    <div className={isOpen ? 'gif-preview__wrap' : 'gif-preview__wrap disabled'}>
                    <div className='gif-search__wrap'>
                                <input className='gif-search__input' type="text" value={searchBody} onChange={e => setSearchBody(e.target.value)} onInput={getSomeGif} placeholder='cherche ton gif ici' />
                    </div>
                        {gifs.map((gif) => (
                            <img key={gif.id} id={gif.id} src={gif.media[0].nanogif.url} data-fullsize={gif.media[0].tinygif.url} alt="" className='gif-preview__gif' onClick={handleGifSend}/>
                        ))}
                        <div className="gif-more">
                            <button className='cta cta__gif-more' onClick={getNextGifs}>Plus</button>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default TextInput;