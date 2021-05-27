import UpdateInput from '../components/UpdateInput';

import { useState } from 'react';
import { useContext } from 'react';
import { UpdateBoxCtx } from '../Contexts/UpdateBoxCtx';

const UpdateBtn = ( { values }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleHandle = async (e) => {
        const button = document.querySelector('.update__message');
        const target = e.target;
        const toggleChange = setOpen(!isOpen);
    }
    return(
        <div className="update__wrap">
            <button id={values.messId} className="cta update__message message__btn" value={values.messId} data-author={values.messAuthor} onClick={toggleHandle}>update</button>
                <UpdateBoxCtx.Provider value={{isOpen, setOpen}}>
                    {isOpen ? <UpdateInput values={ values } /> : <></>} 
                </UpdateBoxCtx.Provider>
        </div>
    )
};

  
export default UpdateBtn;
