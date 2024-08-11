const modeBtn = document.querySelector('#mode-btn');
const eraseBtn = document.querySelector('#erase-btn');
const clearBtn = document.querySelector('#clear-btn');
const saveBtn = document.querySelector('#save-btn');
const canvas = document.querySelector('canvas');
const fileInput = document.querySelector('#file');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = document.querySelectorAll('.color-option');
const textInput = document.querySelector('#text');

canvas.width = 640;
canvas.height = 640;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;

function onMove(e) {
    if (isPainting && !isFilling) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return
    } else {
        ctx.moveTo(e.offsetX, e.offsetY);
    }
}

function onCanvasClick(e) {
    if (isFilling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function startPainting(e) {
    isPainting = true;
    ctx.beginPath();
}

function cancelPainting(e) {
    isPainting = false;
}

function changeLineWidth(e) {
    ctx.lineWidth = lineWidth.value;
}

function changeColor(e) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(e) {
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(e) {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = 'Fill';
    } else {
        isFilling = true;
        modeBtn.innerText = 'Draw';
    }
}

function onEraseClick(e) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    color.value = '#ffffff';
}

function onFileChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        fileInput.value = null;
    }
}

function onDoubleClick(e) {
    const text = textInput.value;
    if (text !== '') {
        ctx.font = `${lineWidth.value * 5}px sans-serif`;
        ctx.fillText(text, e.offsetX, e.offsetY);
    }
}

function onSaveClick(e) {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'paint';
    link.click();
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('dblclick', onDoubleClick);
lineWidth.addEventListener('change', changeLineWidth);
color.addEventListener('change', changeColor);
colorOptions.forEach(color => color.addEventListener('click', onColorClick));
modeBtn.addEventListener('click', onModeClick);
clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
eraseBtn.addEventListener('click', onEraseClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);