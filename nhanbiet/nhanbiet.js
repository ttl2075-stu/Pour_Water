// KHAI BÁO BIẾN
const mainElement = document.querySelector('main');
const waterContainer = document.querySelector('#canuoc');
const waterFall = document.querySelector('.waterfall');
const popup = document.querySelector('.popupCheck');
const popupWin = document.querySelector('.popupCheck-win');
const popupLose = document.querySelector('.popupCheck-lose');
const audioWin = document.querySelector('.audio-win');
const audioLose = document.querySelector('.audio-lose');
let glassNames = []; // BIẾN LẤY DATA TỪ CSDL
let glassOffsets = [];
let glassCount;
let glassElements;
let gameMode = '';


glassElements = [...mainElement.querySelectorAll('.warpper-ly')];

setOffsets(); // Xac dinh toa do cua cac ly
window.addEventListener('resize', setOffsets); // Sự kiện khi kích thước trình duyệt thay đổi

// Xác định chế độ chơi
gameMode = 'click';
if (gameMode == 'auto') {
    waterContainer.classList.add('slide');
    mainElement.addEventListener('click', autoPourWater);
} else if (gameMode == 'click') {
    document.addEventListener('mousemove', mousemove); // Sự kiện khi người dùng di chuột thì ca nước chạy theo
    mainElement.addEventListener('click', handleWaterClick);
}

// HÀM XỬ LÝ CÁC SỰ KIỆN
// Hàm xáo trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hàm xác định toạ độ các ly nước
function setOffsets() {
    console.log('Kích thước trình duyệt đã thay đổi');
    glassOffsets = [];
    glassElements.forEach((ele) => {
        glassOffsets.push({ x1: ele.offsetLeft, x2: ele.offsetLeft + ele.offsetWidth });
    });
    console.log(glassOffsets);
}

// Các hàm xử lý setting
function openSetting() {
    document.querySelector('.setting').style.display = 'block';
}
function cancelcolor() {
    document.querySelector('.setting').style.display = 'none';
}
function cfmcolor() {
    const colorSelect = document.querySelector('#colorSetting').value;
    colors = colorss[(colorSelect*1)-1];
    cancelcolor();
}

// Xử lý màu sắc
let colorsSetting;
// const xhr = new XMLHttpRequest();
// xhr.open('GET', '../assets/php/setting.php', true);
// xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         colorsSetting = JSON.parse(xhr.responseText);
//     }
// };
// xhr.send();


let colors = [
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

function checkAnswer() {
    glassElements = [...mainElement.querySelectorAll('.warpper-ly')];

    const check = glassElements.every((ele, index) => {
        return ele.querySelectorAll('.waterr').length == ele.querySelector('span').innerHTML;
    });

    if (check) {
        popup.style.display = 'block';
        popupWin.style.display = 'block';
        audioWin.volume = 1;
        audioWin.play();
    } else {
        popup.style.display = 'block';
        popupLose.style.display = 'block';
        audioLose.volume = 1;
        audioLose.play();
    }
    setTimeout(() => { 
        popup.style.display = 'none';
        popupWin.style.display = 'none';
        popupLose.style.display = 'none';
        audioWin.pause();
        audioLose.pause();
    }, 5000);
}

function resetGame() {
    mainElement.querySelectorAll('.waterr').forEach((ele) => {
        ele.remove();
    });
}

// Di chuyển ca nước theo con trỏ chuột
function mousemove(event) {
    const mouseX = event.clientX;
    waterContainer.style.left = mouseX - 80 + 'px';
}

function animationNapLy(quesLyDiv) {
    const naply = quesLyDiv.querySelector('.naply');
    naply.style.animation = 'moNapLy 0.54s linear';

    setTimeout(() => {
        naply.style.animation = '';
        naply.style.left = '100%';
    }, 540);
}

function animationDebai(quesLyDiv) {
    const debai = quesLyDiv.querySelector('span');
    debai.style.animation = 'moDebai 0.54s linear';

    setTimeout(() => {
        debai.style.animation = '';
        debai.style.left = '150%';
    }, 540);
}

function handleWaterClick(event) {
    const target = event.clientX;
    const indexLy = glassOffsets.findIndex((currentLy) => {
        return currentLy.x1 <= target - 20 && target <= currentLy.x2;
    });

    if (indexLy >= 0) {
        waterContainer.querySelector('.waterfall').style.display = 'block';
        document.removeEventListener('mousemove', mousemove);
        mainElement.removeEventListener('click', handleWaterClick);
        const quesLyDiv = glassElements[indexLy];
        animationNapLy(quesLyDiv);
        animationDebai(quesLyDiv);

        const newWater = document.createElement('div');
        newWater.className = 'waterr';
        const colorRandom = getRandomColor();
        newWater.style.backgroundColor = colorRandom;
        waterFall.style.backgroundColor = colorRandom;
        glassElements[indexLy].querySelector('.ly').appendChild(newWater);

        setTimeout(() => {
            waterContainer.querySelector('.waterfall').style.display = 'none';
            mainElement.addEventListener('click', handleWaterClick);
            document.addEventListener('mousemove', mousemove);
            quesLyDiv.querySelector('.naply').style.animation = 'dongNapLy 0.5s linear';
            quesLyDiv.querySelector('.naply').style.left = '0%';
            quesLyDiv.querySelector('span').style.animation = 'dongDebai 0.5s linear';
            quesLyDiv.querySelector('span').style.left = '50%';
        }, 2000);
    }
}

// Chưa xử lý
function autoPourWater(event) {
    const targett = document.querySelector('#canuoc').offsetLeft;
    const target = targett + 72;
    const indexLy = glassOffsets.findIndex((currentLy) => {
        return currentLy.x1 <= target - 20 && target <= currentLy.x2;
    });

    if (indexLy >= 0) {
        waterContainer.querySelector('.waterfall').style.display = 'block';
        mainElement.removeEventListener('click', autoPourWater);
        waterContainer.style.animationPlayState = 'paused';

        const newWater = document.createElement('div');
        newWater.className = 'waterr';
        newWater.style.backgroundColor = getRandomColor();
        glassElements[indexLy].querySelector('.ly').appendChild(newWater);

        setTimeout(() => {
            waterContainer.querySelector('.waterfall').style.display = 'none';
            mainElement.addEventListener('click', autoPourWater);
            waterContainer.style.animationPlayState = 'running';
        }, 2000);
    }
}
