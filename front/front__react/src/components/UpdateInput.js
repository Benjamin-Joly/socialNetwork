import getReq from '../utils/getReq';
import putReq from '../utils/putReq';

import { useContext } from 'react';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';
import { UpdateBoxCtx } from '../Contexts/UpdateBoxCtx';


const UpdateInput = ({ values }) => {
    console.log(values);
    const {messages, setMessages} = useContext(PublicFeedCtx);
    const {isOpen, setOpen} = useContext(UpdateBoxCtx);
    const textResize = () => {
        const text = document.getElementById('update__content');
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
        if(text.value.length === 0){
            text.style.height = 'auto';
        }
    }
    const click = async (e) => {
        const target = e.target;
        const text = document.getElementById('update__content');
        const obj = {
            body : text.value,
            id : text.dataset.id,
            author : text.dataset.author
        }
        const response = await putReq(obj);
        const valid = await validHandler(response);
    }
    const keyValid = async (e) => {
        const key = e.key;
        if(key === 'Enter'){
            const text = document.getElementById('update__content');
            const obj = {
                body : text.value,
                id : text.dataset.id,
                author : text.dataset.author
            }
            const response = await putReq(obj);
            const valid = await validHandler(response);
        }
    }
    const validHandler = async (response) => {
        if(response===true){
            const rerender = await getReq();
            console.log(rerender);
            setMessages(rerender);
            setOpen(false);
        }
    }
    const keyBoardEvent = (e) => {
        const key = e.key;
        key === 'Enter' ? console.log('enter pressed') : console.log(key);
        key === 'Backspace' ? console.log('bs pressed') : console.log(key);
    }
    return(
        <div className="update__input-wrap">
            <textarea id="update__content" name="Message" className="message__text-area" onInput={textResize} data-author={values.messAuthor} data-id={values.messId} defaultValue={values.messBody} onKeyDown={keyValid}></textarea>
            <button id='update__btn' value={values.messId}  data-author={values.messAuthor} data-id={values.messId} className='cta' onClick={click} >send</button>
        </div>
    )
}

export default UpdateInput;

