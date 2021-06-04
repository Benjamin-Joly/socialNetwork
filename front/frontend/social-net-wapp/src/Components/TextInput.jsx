import ioClient from 'socket.io-client';
import React, { useState } from 'react';
import getUserData from '../utils/getUserDatas';

const TextInput = (props) => {
    const [ gifs, setGifs ] = useState([]);
    const [ isOpen, setOpen ] = useState(false);
    const messRef = React.createRef();
    const searchRef = React.createRef();
    const token = sessionStorage.getItem('session');
    const [ userId, firstName, lastName, position ] = getUserData();
    if(!token){
        props.history.push('/login');
    };
    const socket = ioClient('http://localhost:3000', {
        query : {
            user :  firstName + ' ' + lastName,
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
                    messageBody : messRef.current.value,
                    userId : userId,
                    username : firstName+' '+lastName,
                    position : position
            });
        };
        messRef.current.value = '';
    };

    const sendGif = (e) => {
        e.preventDefault();
        const target = parseInt((e.target.id), 10);
        const fullGif = e.target.dataset.fullsize;
        console.log(fullGif);
        if(socket){
            socket.emit('newGif', {
                    messageBody : `${firstName} has sent a Gif`,
                    userId : userId,
                    username : firstName+' '+lastName,
                    position : position,
                    messageGifId : `${target}`,
                    gifUrl : fullGif
            });
        };
    };

    const textResize = () => {
        const text = document.getElementById('message__content');
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
        if(text.value.length === 0){
            text.style.height = 'auto';
        }
    }

    const getSomeGif = async (e) => {
        e.preventDefault();
        const apikey = 'X8RUJQXYVKTC';
        const lmt = 20;
        const searchTerm = searchRef.current.value;

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
             console.log(gifs);
         }
    };

    const getNextGifs = async (e) => {
        e.preventDefault();
        const apikey = 'X8RUJQXYVKTC';
        const lmt = 20;
        const searchTerm = searchRef.current.value;

        const myHeader = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        const url = "https://g.tenor.com/v1/search?q=" + searchTerm + "&key=" +
            apikey + "&limit=" + lmt + "&pos=" + lmt +"&locale" + "&media_filter";
         const response = await fetch(url, myHeader);
         if(response){
            const data = await response.json();
            console.log(data);
        }
    }
    const toggleGifMenu = (e) => {
        e.preventDefault();
        setOpen(!isOpen);
    }
    return (
        <section id="text-area">
                <div id="text-area__wrap">
                    <form action="" method="post" id="post-message">
                        <textarea id="message__content" name="Message" className="message__text-area" onInput={textResize} ref={messRef} />
                        <button id="message-submit" value="temporaire" className="cta__message" onClick={sendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33.938" height="30.003" viewBox="0 0 33.938 30.003">
                                <path id='pic__send' d="M14.639,3.929a1.543,1.543,0,0,1,2.828,0L30.925,34.781a1.543,1.543,0,0,1-1.414,2.159L15.643,29.079,2.6,36.941a1.543,1.543,0,0,1-1.414-2.159Z" transform="translate(36.941 -1.052) rotate(90)"/>
                            </svg>
                        </button>
                        <button id="gif-submit" value="temporaire" className="cta__gif" onClick={toggleGifMenu}>gif</button>
                    </form>
                    <div className={isOpen ? 'gif-preview__wrap' : 'gif-preview__wrap disabled'}>
                    <div className='gif-search__wrap'>
                                <input className='gif-search__input' type="text" ref={searchRef} onInput={getSomeGif} placeholder='Search your Gif here' />
                    </div>
                        {gifs.map((gif) => (
                            <img key={gif.id} id={gif.id} src={gif.media[0].nanogif.url} data-fullSize={gif.media[0].tinygif.url} alt="" className='gif-preview__gif' onClick={sendGif} />
                        ))}
                        <div className="gif-more">
                            <button className='cta gif-more__btn disabled' onClick={getNextGifs}>Plus</button>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default TextInput;