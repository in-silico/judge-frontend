var open = true;
function display() {
  var sel1 = document.querySelector("#options").style;
  sel1.display = (open)? "block" : "none";
  sel1.height = screen.height + "px";
  open = !open;
  console.log("HOLA");
}
