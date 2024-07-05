// ------------------------------------------------------------------
function ask(request, callback) {
  const url = "https://tinynotie-api.vercel.app/openai/text?text=" + request.message + "&random=" + request.random;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  fetch(url, options)
    .then(res=>res.json())
    .then((data)=>{
      console.log('>> ',data);
      callback(data)
    })
    .catch((error)=>{
      console.log(error);
    });
}
