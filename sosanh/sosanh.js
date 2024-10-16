// KHAI BÁO BIẾN
const mainElement = document.querySelector('main');
const navElement = document.querySelector('nav');
let waterContainer = document.querySelector('#canuoc');
const taskElement = document.querySelector('.assignment');
let glassNames = []; // BIẾN LẤY DATA TỪ CSDL
let glassOffsets = [];
let glassCount;
let glassElements;
let key = '';
let type = '';
const pathNapLy = [
    './media/nap1.png',
    './media/nap2.png',
    './media/nap3.png',
    './media/nap4.png',
    './media/nap5.png',
    './media/nap6.png',
    './media/nap7.png',
    './media/nap7.png',
];

// CÁC HÀM RỜI (KHÔNG THEO FLOW)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const colors = [
    '#FFDAB9',
    '#FF8C00',
    '#FF4500',
    '#DC143C',
    '#FF1493',
    '#FFA07A',
    '#8B4513',
    '#8A2BE2',
    '#DA70D6',
    '#B8860B',
    '#FFD700',
    '#7FFFD4',
    '#00CED1',
    '#00FF7F',
    '#1E90FF',
    '#32CD32',
    '#4682B4',
];
const usedColors = [];
function getRandomColor() {
    const remainColors = colors.filter((color) => !usedColors.includes(color));
    let color = remainColors[Math.floor(Math.random() * remainColors.length)];
    usedColors.push(color);
    return color;
}

/*
HÀM THEO THỨ TỰ XỬ LÝ BÀI:

*/
function callGetDebai() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "data.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Xử lý phản hồi từ server.php
            glassNames = JSON.parse(xhr.responseText);
            glassCount = glassNames.length;
            renderLy();
        }
    };

    // Gửi yêu cầu với tham số action
    xhr.send("action=getDebai");
}

function callGetDau() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "data.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Xử lý phản hồi từ server.php
            type = JSON.parse(xhr.responseText);
        }
    };

    // Gửi yêu cầu với tham số action
    xhr.send("action=getDau");
}

callGetDau();
callGetDebai();


function renderLy() {
    // Trộn lại đề:
    glassNames = shuffleArray(glassNames);
    for (let i = 1; i <= glassCount; i++) {
        mainElement.innerHTML += `
        <div class="warpper-ly">
            <img src="../media/nap${i}.png" alt="" class="naply">
            <div class="ly" id="ly${glassNames[i - 1]}">
            </div>
            <span class="answer">${glassNames[i - 1]}</span>
        </div>
        `;
        // Tạo khối nước
        const ly = document.querySelector(`#ly${glassNames[i - 1]}`);
        const k = glassNames[i - 1] * 1;
        for (let j = 1; j <= k; j++) {
            let waterElement = document.createElement('div');
            waterElement.className = 'waterr';
            waterElement.style.backgroundColor = getRandomColor();
            ly.appendChild(waterElement);
        }
    }

    glassElements = [...mainElement.querySelectorAll('.warpper-ly')];
    glassElements.forEach((element) => {
        element.addEventListener('click', () => chooseAnswer(element));
    });
}

function chooseAnswer(element) {
    const answer = element.querySelector('.answer').innerHTML * 1;
    if (answer == getKey()) {
        alert('Bạn đã trả lời đúng!');
    } else {
        alert('Bạn đã trả lời sai!');
    }
}

function getKey() {
    let number = glassNames;
    number.pop();
    if (type == 'more' || type == 'most') {
        return Math.max(...number);
    } else if (type == 'less' || type == 'least') {
        return Math.min(...number);
    }
}