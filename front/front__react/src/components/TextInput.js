import getReq from '../utils/getReq';
import postReq from '../utils/postReq';
import { useContext } from 'react';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';

const TextInput = () => {
    const textResize = () => {
        const text = document.getElementById('message__content');
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
        if(text.value.length === 0){
            text.style.height = 'auto';
        }
    }
    const {messages, setMessages} = useContext(PublicFeedCtx);
    const clickHandler = async (e) => {
        const message = document.getElementById('message__content');
        e.preventDefault();
        postReq();
        const data = await getReq();
        setMessages(data);
        message.value = '';
        message.style.height = 'auto';
    }
    const keyBoardHandler = async (e) => {
        if(e.key === 'Enter'){
           const fire = await clickHandler(e);
        }
    }
    return (
        <section id="text-area">
            <div id="text-area__wrap">
                <form action="" method="post" id="post-message">
                    <textarea id="message__content" name="Message" className="message__text-area" onInput={textResize} onKeyDown={keyBoardHandler} />
                    <button id="message-submit" value="temporaire" className="cta" onClick={clickHandler}>Envoyer</button>
                </form>
            </div>
        </section>
    )
}

export default TextInput;