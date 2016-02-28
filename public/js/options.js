var open = true;
function display() {
  var sel1 = document.querySelector("#options").style;
  var sel2 = document.querySelector("#container").style;
  sel1.display = (open)? "block" : "none";
  sel1.height = screen.height + "px";
  if (open) sel2.width = (Math.floor(screen.width) * 0.77).toString() + "px";
  else      sel2.width = (screen.width).toString() + "px";
  open = !open;
  console.log("HOLA");
}
