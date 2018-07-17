document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

const msgApi = axios.create({
  baseURL: 'http://localhost:3000/messenger'
});

function sendMsg(id){
  msgApi.post(id, {
    childMsgContent: document.getElementById(`${id}-addComment`).value
  })
  .then(response => {
      // console.log(response)
      window.location.reload();
    });
}