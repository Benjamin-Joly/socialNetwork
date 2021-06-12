const sendImg = async (file) => {
    console.log(file);
    //const myImg = img.getAll('image')[0];
    const token = sessionStorage.session;
    const myHeader = {
        //'content-type': 'multipart/form-data',
        'Authorization': `${token}`
      }
     const postOpt = {
         method:'POST',
         headers: myHeader,
         body: file
     }
     const response = await fetch('http://localhost:3000/uploads', postOpt);
     if(!response){
         console.log('no response to your get req :(');
     }
     const data = await response.text();
     if(!data){
         console.log('no data recieved');
     }
 };

 export default sendImg;