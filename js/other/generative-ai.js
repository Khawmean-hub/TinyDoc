// ------------------------------------------------------------------
function ask(message, callback) {
  const url = "https://www.vongpichdaraboth.net/ai/message?message=" + message;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    mode: 'no-cors'
  };

  fetch(url, options)
    .then(callback)
    .then((data)=>{
      console.log('>> ',data);
    })
    .catch((error)=>{
      console.log(error);
    });
}
