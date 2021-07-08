const getImg = async () => {
    const token = sessionStorage.session;
    const myHeader = {
        'Authorization': `${token}`
      }
     const getOpt = {
         method:'GET',
         headers: myHeader
     }
     const response = await fetch('http://localhost:3000/uploads', getOpt);
     const data = await response.json();
     return data;
 };

 export default getImg;