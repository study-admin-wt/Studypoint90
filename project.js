function openLogin() {
  document.getElementById("loginPopup").style.display = "block";
  document.getElementById("registerPopup").style.display = "none";
}

function openRegister() {
  document.getElementById("registerPopup").style.display = "block";
  document.getElementById("loginPopup").style.display = "none";
}

function closePopup() {
  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("registerPopup").style.display = "none";
}
