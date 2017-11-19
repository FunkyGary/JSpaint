let md = false;
let cPushArray = new Array();
let cStep = -1;
const canvas = document.getElementById('canvas')
const lineWidthchange = document.getElementById('lineWidthchange')
const colorchange = document.getElementById('colorchange')
const clear = document.getElementById('clear')
const selecter = document.getElementById('selecter')
const download = document.getElementById('download')
const undo = document.getElementById("undo")
const redo = document.getElementById("redo")
const context = canvas.getContext('2d');
let mouse = {x: 0, y: 0};
let brushWidth = 10;
let brushColor = '#ff0000';

canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', toggledraw);
canvas.addEventListener('mousemove',
function(evt) {
  mouse.x = evt.pageX - this.offsetLeft;
  mouse.y = evt.pageY - this.offsetTop;
  draw(canvas, mouse.x, mouse.y);
});
context.lineWidth = brushWidth;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = brushColor;
context.fillStyle = "white";
context.fillRect(0, 0, 600, 400);
function down() {
  md = true;
  context.beginPath();
  context.moveTo(mouse.x, mouse.y);
}
function toggledraw() {
  md = false;
  canvas.style.cursor= "default";
  cPush() ;
}
function draw(canvas, posx, posy){

  if(md) {
    canvas.style.cursor= "pointer";
    // context.fillRect(posx, posy, size, size)
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
  }
}
// lineWidth
lineWidthchange.addEventListener("change",
  function(e) {
    brushWidth = e.target.value;
    context.lineWidth = brushWidth;
})
// brushStyle
colorchange.addEventListener("change",
  function(e) {
    brushColor = e.target.value;
    context.strokeStyle = brushColor;
})
// clear
clear.addEventListener("click",
  function(e) {
    context.fillStyle = "white";
    context.fillRect(0, 0, 600, 400);
  })
// download
download.addEventListener('click', function() {
      downloadCanvas(this, 'canvas', 'paint');
  }, false);
function downloadCanvas(link, canvasId, filename) {
  let  e =selecter.options[selecter.selectedIndex].value;
  if (e === "png")
      link.href = document.getElementById(canvasId).toDataURL();
      link.download = filename;
  if (e === "jpg")
      link.href = document.getElementById(canvasId).toDataURL("image/jpeg");
      link.download = filename;
}
// Savestep
function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('canvas').toDataURL());
}
// Undo
undo.addEventListener("click", function () {
    if (cStep > 0) {
        cStep--;
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
    }
})
// Redo
redo.addEventListener("click", function () {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
    }
})



// function savestep(){
//   let e=context.getImageData(0,0,600,400);
//   // E.width=D.width,
//   // E.height=D.height,
//   // E.style.width=D.width+"px",
//   // E.style.height=D.height+"px",
//   // v.style.left=D.width+"px",
//   // v.style.top=D.height+"px",
//   // a(),d(),
//   S.putImageData(e,0,0),
//   r()}
// function r(){
//   var e=S.getImageData(0,0,E.width,E.height);
//   Y<X.length-1&&(X=X.slice(0,Y+1)),
//   X.push(e),Y=X.length-1,c()}
// function u(e){
//   var t=Y+e;t<0||t>=X.length||(Y=t,c(),
//   D.width===X[Y].width&&D.height===X[Y].height||(D.width=X[Y].width,
//   D.height=X[Y].height,
//   E.width=D.width,E.height=D.height,E.style.width=D.width+"px",
//   E.style.height=D.height+"px",v.style.left=D.width+"px",
//   v.style.top=D.height+"px",d()),S.putImageData(X[Y],0,0))}
// function c(){y.disabled=Y<=0,Y>=X.length-1?w.disabled=!0:w.disabled=!1}
