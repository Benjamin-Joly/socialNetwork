const sendImg = async (file) => {
    const token = sessionStorage.session;
    const myHeader = {
        'Authorization': `${token}`
      }
     const postOpt = {
         method:'POST',
         headers: myHeader,
         body: file
     }
     const response = await fetch('http://localhost:3000/uploads', postOpt);
     if(!response){
         console.error('no response to your get req :(');
     }
     const data = await response.text();
     if(!data){
         console.error('no data recieved');
     }
 };

 export default sendImg;