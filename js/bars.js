

function ToogleSidebar () {
  const sideBar = document.querySelector("#sidebar");
  if (sideBar.classList.contains("closed")) {
    sideBar.classList.remove("closed");
  } else {
    sideBar.classList.add("closed");
  }
}