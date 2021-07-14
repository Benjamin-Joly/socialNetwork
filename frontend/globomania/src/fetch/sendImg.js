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
     }else if(!response.ok){
         return 'veuillez choisir un fichier pesant moins d\'1mo au format .jpeg ou .png';
     }
 };

 export default sendImg;