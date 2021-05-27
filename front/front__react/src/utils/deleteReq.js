const deleteReq = async (button) => {
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const deleteOpt = {
        method:'DELETE',
        headers: myHeader,
        body: JSON.stringify({
            'messageId' : button.value,
            'messageAuthor' : button.dataset.author
        })
     }
     const response = await fetch('http://localhost:3000/messages', deleteOpt);
     const data = await response.text();
     return data;
};

export default deleteReq;