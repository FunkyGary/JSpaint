let cPushArray = []
let cStep = -1
let _intervalId    // used to track the current interval ID
let _center        // the current center to spray
const canvas = document.getElementById('canvas')
const lineWidthchange = document.getElementById('lineWidthchange')
const colorchange = document.getElementById('colorchange')
const clear = document.getElementById('clear')
const selecter = document.getElementById('selecter')
const download = document.getElementById('download')
const undo = document.getElementById("undo")
const redo = document.getElementById("redo")
const spray = document.getElementById("spray")
const pen = document.getElementById("pen")
const context = canvas.getContext('2d')
let mouse = {x: 0, y: 0}
let brushWidth = 10
let density = 50;
let sprayon = false
let penon = true
let md = false
let spraycolor =  '#ff0000'
context.lineWidth = brushWidth;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = '#ff0000'
context.fillStyle = "white";
context.fillRect(0, 0, 600, 400);
pen.classList.add('selected')


canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', toggledraw);
canvas.addEventListener('mousemove',
function(evt) {
  mouse.x = evt.pageX - this.offsetLeft;
  mouse.y = evt.pageY - this.offsetTop;
  draw(canvas, mouse.x, mouse.y);
});

function down() {
  if (penon)
  {
    md = true;
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
  }
  if (sprayon) {
    timeout = setTimeout(function draw() {
    for (var i = density; i--; ) {
      var angle = getRandomFloat(0, Math.PI*2);
      var radius = getRandomFloat(0, brushWidth);
      context.fillStyle = spraycolor
      context.fillRect(
        mouse.x + radius * Math.cos(angle),
        mouse.y + radius * Math.sin(angle),
        1, 1);
    }
    if (!timeout) return;
    timeout = setTimeout(draw, 50);
  }, 50);
  }
}

function toggledraw() {
  md = false;
  canvas.style.cursor= "default";
  cPush() ;
  clearTimeout(timeout);
}
function draw(canvas, posx, posy){
  if(md) {
    canvas.style.cursor= "pointer";
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
    context.strokeStyle = e.target.value;
    spraycolor = e.target.value
    context.fillStyle = spraycolor
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
    cPushArray.push(canvas.toDataURL());
}
// Undo SLICE
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

//Spray
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
spray.addEventListener("click",
  function() {
    penon = false
    sprayon = true
    spray.classList.add('selected')
    pen.classList.remove('selected')

  })
context.fillStyle = '#ff0000';
//pen
pen.addEventListener("click",
  function() {
    penon = true
    sprayon = false
    pen.classList.add('selected')
    spray.classList.remove('selected')
  })
