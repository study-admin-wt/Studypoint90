let isOpen = false;
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
function openMenu() {
  let sidebar = document.getElementById("sidebar");

  if (!sidebar) return; // 👈 safety

  if (isOpen) {
    sidebar.style.left = "-250px";
    isOpen = false;
  } else {
    sidebar.style.left = "0";
    isOpen = true;
  }
}
