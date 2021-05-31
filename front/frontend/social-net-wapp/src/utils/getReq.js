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
     return data;
 };

 export default getReq;