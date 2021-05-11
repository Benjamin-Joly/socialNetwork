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
 }

validBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
       getReq();    
    })
});

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
})
