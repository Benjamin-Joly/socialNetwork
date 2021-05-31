const putReq = async ({ body, id, author }) => {
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
            'messageId' : id,
            'messageAuthor' : author,
            'messageBody' : body
        })
     }
     const response = await fetch('http://localhost:3000/messages', deleteOpt);
     const data = await response.json();
     return data;
}
export default putReq;