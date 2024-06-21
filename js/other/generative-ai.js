// ------------------------------------------------------------------
function ask(){
  const url = "https://www.vongpichdaraboth.net/ai/message?message=" + this;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    mode: 'no-cors'
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
