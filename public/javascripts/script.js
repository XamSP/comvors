document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//SEE if you can start ajax before the page renders to ensure no hiccups

const msgApi = axios.create({
  baseURL: 'http://localhost:3000/messenger'
});

function sendMsg(id){
  msgApi.post(id, {
    childMsgContent: document.getElementById(`${id}-addText`).value
  })
  .then(response => {
      // console.log(response)
      window.location.reload();
    });
}