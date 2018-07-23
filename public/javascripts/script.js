document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//SEE if you can start ajax before the page renders to ensure no hiccups

const friendApi = axios.create({
  baseURL: process.env.DOMAIN  + 'friends'
});

const msgApi = axios.create({
  baseURL: process.env.DOMAIN  + 'messenger'
});

function deleteUser(id, myId){
  const rmId = {friendReq: {_id: id} };
  console.log(`${rmId.friendReq._id} and ${id} anddd ${myId} `)

  friendApi.put(`/${id}/delete`, rmId)

  //console.log(`This reject: ${id}`)
  .then(response => {
    //console.log(response)
    window.location.reload();
  });
}

function laAccept(id, myId){
  const rmId = {friendReq: {_id: id} };
  console.log(`${rmId.friendReq._id} and ${id} anddd ${myId} `)

  friendApi.post(`/${id}/accepted`, rmId)

  //console.log(`This reject: ${id}`)
  .then(response => {
    //console.log(response)
    window.location.reload();
  });
}

// document.getElementById("LaRejects").onclick = f
function laReject(id, myId){
  const rmId = {friendReq: {_id: id} };
  console.log(`${rmId.friendReq._id} and ${id} anddd ${myId} `)

  friendApi.put(`/${id}/rejected`, rmId)

  //console.log(`This reject: ${id}`)
  .then(response => {
    //console.log(response)
    window.location.reload();
  });
}

function sendMsg(id){
  msgApi.post(id, {
    childMsgContent: document.getElementById(`${id}-addText`).value
  })
  .then(response => {
      // console.log(response)
      window.location.reload();
  });
}