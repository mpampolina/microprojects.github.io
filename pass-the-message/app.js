function updateLastMessage(e) {
  /* prevent the form from reloading */
  e.preventDefault();
  const submitMsg = document.getElementById("submitMsg");
  const lastMsg = document.getElementById("lastMsg");
  lastMsg.innerText = submitMsg.value;
}

const lastMsgForm = document.getElementById("lastMsgForm");
/* submit event must be called on the form HTML object */
lastMsgForm.addEventListener("submit", updateLastMessage);
