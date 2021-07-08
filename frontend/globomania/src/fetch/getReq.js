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
     const data = await response.json();
     return data;
 };

 export default getReq;