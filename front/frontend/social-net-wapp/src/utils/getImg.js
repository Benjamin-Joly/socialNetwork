const getImg = async () => {
    //const myImg = img.getAll('image')[0];
    const token = sessionStorage.session;
    const myHeader = {
        //'content-type': 'multipart/form-data',
        'Authorization': `${token}`
      }
     const getOpt = {
         method:'GET',
         headers: myHeader
     }
     const response = await fetch('http://localhost:3000/uploads', getOpt);
     if(!response){
         console.log('no response to your get req :(');
     }
     const data = await response.json();
     if(!data){
         console.log('no data recieved');
     }
     return data;
 };

 export default getImg;