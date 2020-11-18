function updateLastMessage(e) {
  /* prevent the form from reloading */
  e.preventDefault();
  const submitMsg = document.getElementById("submitMsg");
  const lastMsg = document.getElementById("lastMsg");
  const requiredField = document.getElementsByClassName("requiredField")[0]
  if (submitMsg.value == '') {
    requiredField.classList.remove("hidden")
    /* add the hidden class after 3 seconds */
    setTimeout( () => requiredField.classList.add("hidden"), 3000);
  } else {
    lastMsg.innerText = submitMsg.value;
    submitMsg.value = null;
  }
}

const lastMsgForm = document.getElementById("lastMsgForm");
/* submit event must be called on the form HTML object */
lastMsgForm.addEventListener("submit", updateLastMessage);
