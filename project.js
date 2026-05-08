// Sidebar and Popups
let isOpen = false;

function openMenu() {

  let sidebar = document.getElementById("sidebar");

  if (isOpen) {

    sidebar.style.left = "-250px";

    isOpen = false;

  } else {

    sidebar.style.left = "0";

    isOpen = true;
  }
}
function openLogin() {
    document.getElementById("loginPopup").style.display = "block";
}
function openRegister() {
    document.getElementById("registerPopup").style.display = "block";
}
function closePopup() {
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("registerPopup").style.display = "none";
}

// Slider Logic
let currentPosition = 0;

function moveSlider(direction) {
    const track = document.getElementById('javaSlider');
    const cards = document.querySelectorAll('.slider-card');
    const cardWidth = cards[0].offsetWidth + 15; // Width + gap
    const visibleWidth = document.querySelector('.slider-wrapper').offsetWidth;
    const totalWidth = track.scrollWidth;

    currentPosition += (direction * cardWidth);

    // Clamp values so it doesn't slide into empty space
    if (currentPosition > 0) {
        currentPosition = 0;
    } else if (Math.abs(currentPosition) > (totalWidth - visibleWidth)) {
        currentPosition = -(totalWidth - visibleWidth);
    }

    track.style.transform = `translateX(${currentPosition}px)`;
}
