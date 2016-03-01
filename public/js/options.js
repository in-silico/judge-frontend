var open = true;
function display() {
  var sel1 = document.querySelector(".sidebar").style;
  sel1.display = (open)? "block" : "none";
  sel1.height = (screen.height * 0.4) + "px";
  open = !open;

}
