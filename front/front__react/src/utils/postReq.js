const postReq = async () => {
    const messageInput = document.getElementById('message__content');
    const body = messageInput.value;
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
            body:body
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

 export default postReq;