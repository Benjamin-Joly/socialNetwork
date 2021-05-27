const signupInputs = Array.from(document.querySelectorAll('.signup__input'));
const loginInputs = Array.from(document.querySelectorAll('.login__input'));
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');


signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupInputs.forEach((input) => {
            console.log(input.value);
    });
    signupReq();
})

const signupReq = async () => {
    const [firstName, lastName, email, position, password] = signupInputs;

    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            firstName:firstName.value,
            lastName:lastName.value,
            email:email.value,
            position:position.value,
            password:password.value
        })
    }
    const response = await fetch('http://localhost:3000/signup', postOpt);
    if(!response){
        console.log('no response');
    }
    const data = await response;
    if(!data){
        console.log('no data loaded');
    }
};

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginInputs.forEach((input) => {
            console.log(input.value);
    });
    loginReq();
})

const loginReq = async () => {
    const [email, password] = loginInputs;
    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            email:email.value,
            password:password.value
        })
    }
    const response = await fetch('http://localhost:3000/login', postOpt);
    if(!response){
        console.log('no response :(');
    }
    const data = await response.text();
    if(!data){
        console.log('no data sent');
    }
    const session = data.split('__')[2];
    console.log(session);
    sessionStorage.setItem('session', session);
    console.log(sessionStorage.session);
};

const validBtn = Array.from(document.querySelectorAll('.valid__s'));
const postBtn = Array.from(document.querySelectorAll('.post__s'));

const getSessionId = () => {
    const token = sessionStorage.session;
    if(token){ return token };
}

const getReq = async () => {
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const postOpt = {
         method:'GET',
         headers: myHeader
     }
     const response = await fetch('http://localhost:3000/messages', postOpt);
     if(!response){
         console.log('no response to your get req :(');
     }
     const data = await response.json();
     if(!data){
         console.log('no data recieved');
     }
     mapData(data);
 }

const mapData = (array) => {
    const messagesContainer = document.createElement('section');
    messagesContainer.classList.add('messages__container');
    const body = document.querySelector('body');
    const messages = array.map(x => {
        const {messageId, messageBody, messageAuthor, reactions, response, isUp, imgUrl, messageDate} = x;
        console.log(messageId, messageBody, messageAuthor);
        return (`
        <section id="message__${messageId}" class="message__container">
            <div class="message__wrap">
                <p class="message__body">${messageBody}</p>
                <p class="message__author">${messageAuthor}</p>
                <p class="message__date">${messageDate}</p>
            </div>
            <div class="message__modify">
                <button id="modify__${messageId}" class="cta update__message" value="${messageId}" data-author="${messageAuthor}">update</button>
                <button id="delete__${messageId}" class="cta delete__message" value="${messageId}" data-author="${messageAuthor}">delete</button>
            </div>
        </section>
        `)
    });
    messagesContainer.innerHTML = '<h3 class="messages__container--heading">Messages</h3>' + messages.join(``);
    body.appendChild(messagesContainer);
}

validBtn.forEach((button) => {
    console.log(button);
    button.addEventListener('click', (e) => {
       fireDeleteReq();
    })
});

const fireDeleteReq = async () => {
    const getData = await getReq();
    const deleteBtns = Array.from(document.querySelectorAll('.delete__message'));
    const updateBtns = Array.from(document.querySelectorAll('.update__message'));
    deleteBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            deleteReq(button);
        });
    });
    updateBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            putReq(button);
        });
    });
}

const postReq = async () => {
    const messageInputs = Array.from(document.querySelectorAll('.message__input'));
    const [body] = messageInputs;
    console.log(body.value);
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const postOpt = {
         method:'POST',
         headers: myHeader,
         body: JSON.stringify({
            body:body.value
        })
     }
     const response = await fetch('http://localhost:3000/messages', postOpt);
     if(!response){
         console.log('no response to your get req :(');
     }
     const data = await response.text();
     if(!data){
         console.log('no data recieved');
     }
 };

 postBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        postReq();    
    })
});

const logOutBtn = document.getElementById('log-out');

logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    document.location.reload();
}); 

const deleteReq = async (button) => {
    console.log(button.value);
    console.log(button.dataAuthor);
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const deleteOpt = {
        method:'DELETE',
        headers: myHeader,
        body: JSON.stringify({
            'messageId' : button.value,
            'messageAuthor' : button.dataset.author
        })
     }
     const response = await fetch('http://localhost:3000/messages', deleteOpt);
     const data = await response.text();
     console.log(data);
}

const putReq = async (button) => {
    console.log(button.value);
    console.log(button.dataset.author);
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const deleteOpt = {
        method:'PUT',
        headers: myHeader,
        body: JSON.stringify({
            'messageId' : button.value,
            'messageAuthor' : button.dataset.author
        })
     }
     const response = await fetch('http://localhost:3000/messages', deleteOpt);
     const data = await response.text();
     console.log(data);
}


