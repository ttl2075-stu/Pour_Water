// KHAI BÁO BIẾN
const mainElement = document.querySelector('main');
let waterContainer = document.querySelector('#canuoc');
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
let colorss = [
    [
        '#FFDAB9',
        '#FF8C00',
        '#FF4500',
        '#DC143C',
        '#FF1493',
        '#FF69B4',
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
    ],
    [
        '#FF69B4' /* Hot Pink */,
        '#FF8C69' /* Salmon */,
        '#FF6347' /* Tomato */,
        '#FFD700' /* Gold */,
        '#DA70D6' /* Orchid */,
        '#BA55D3' /* Medium Orchid */,
        '#87CEEB' /* Sky Blue */,
        '#40E0D0' /* Turquoise */,
        '#3CB371' /* Medium Sea Green */,
        '#66CDAA' /* Medium Aquamarine */,
        '#F0E68C' /* Khaki */,
        '#FF7F50' /* Coral */,
        '#FF4500' /* Orange Red */,
        '#8B0000' /* Dark Red */,
        '#CD5C5C' /* Indian Red */,
        '#FFA500' /* Orange */,
        '#20B2AA' /* Light Sea Green */,
    ],
    [
        '#FF4500' /* Orange Red */,
        '#FF1493' /* Deep Pink */,
        '#FF6347' /* Tomato */,
        '#FFA07A' /* Light Salmon */,
        '#DB7093' /* Pale Violet Red */,
        '#FF69B4' /* Hot Pink */,
        '#FF7F50' /* Coral */,
        '#FFD700' /* Gold */,
        '#EE82EE' /* Violet */,
        '#BA55D3' /* Medium Orchid */,
        '#9370DB' /* Medium Purple */,
        '#7B68EE' /* Medium Slate Blue */,
        '#4682B4' /* Steel Blue */,
        '#00CED1' /* Dark Turquoise */,
        '#48D1CC' /* Medium Turquoise */,
        '#32CD32' /* Lime Green */,
        '#228B22' /* Forest Green */,
    ],
    [
        '#FF8C00' /* Dark Orange */,
        '#FF4500' /* Orange Red */,
        '#FF1493' /* Deep Pink */,
        '#FF69B4' /* Hot Pink */,
        '#DC143C' /* Crimson */,
        '#B22222' /* Firebrick */,
        '#8B4513' /* Saddle Brown */,
        '#DAA520' /* Goldenrod */,
        '#8A2BE2' /* Blue Violet */,
        '#9400D3' /* Dark Violet */,
        '#9932CC' /* Dark Orchid */,
        '#00BFFF' /* Deep Sky Blue */,
        '#1E90FF' /* Dodger Blue */,
        '#5F9EA0' /* Cadet Blue */,
        '#008B8B' /* Dark Cyan */,
        '#3CB371' /* Medium Sea Green */,
        '#556B2F' /* Dark Olive Green */,
    ],
    [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'orange',
        'pink',
        'brown',
        'black',
        'gray',
    ]
];

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
        alert('CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG');
    } else {
        alert('BẠN ĐÃ TRẢ LỜI SAI. HÃY THỬ LẠI NHÉ!!!');
    }
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

function handleWaterClick(event) {
    const target = event.clientX;
    const indexLy = glassOffsets.findIndex((currentLy) => {
        return currentLy.x1 <= target - 20 && target <= currentLy.x2;
    });

    if (indexLy >= 0) {
        waterContainer.querySelector('.waterfall').style.display = 'block';
        document.removeEventListener('mousemove', mousemove);
        mainElement.removeEventListener('click', handleWaterClick);

        const newWater = document.createElement('div');
        newWater.className = 'waterr';
        newWater.style.backgroundColor = getRandomColor();
        glassElements[indexLy].querySelector('.ly').appendChild(newWater);

        setTimeout(() => {
            waterContainer.querySelector('.waterfall').style.display = 'none';
            mainElement.addEventListener('click', handleWaterClick);
            document.addEventListener('mousemove', mousemove);
        }, 2000);
    }
}

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
