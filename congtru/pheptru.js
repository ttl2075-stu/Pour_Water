// KHAI BÁO BIẾN
const mainElement = document.querySelector('main');
const navElement = document.querySelector('nav');
let waterContainer = document.querySelector('#canuoc');
const taskElement = document.querySelector('.assignment');
let glassNames = []; // BIẾN LẤY DATA TỪ CSDL
let glassOffsets = [];
let glassCount;
let glassElements;
let isAnimationRunning = false;
let lyOut = [];

// CÁC HÀM RỜI (KHÔNG THEO FLOW)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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

function remove1waterr(lyAddWater) {
    if (isAnimationRunning) return; // Nếu đang chạy animation thì không cho click
    isAnimationRunning = true;
    // Hiệu ứng đổ nước
    let a = lyAddWater.firstElementChild;

    const newWater = document.createElement('div');
    newWater.className = 'waterr';
    newWater.style.backgroundColor = a.style.backgroundColor;

    a.style.animationName = 'dropWater';
    console.log();
    // document.querySelectorAll('.lyOut')[parseInt(lyAddWater.getAttribute('lystt'))-1];
    // Hiệu ứng nước
    let waterfall = lyAddWater.parentElement.parentElement;
    waterfall = waterfall.querySelector('.waterfall');
    waterfall.style.display = 'block';
    document.querySelectorAll('.lyOut')[parseInt(lyAddWater.getAttribute('lystt')) - 1].appendChild(newWater);

    a.addEventListener('animationend', () => {
        waterfall.style.display = 'none';
        a.remove();
        isAnimationRunning = false;
    });
}


// Gọi hàm callGetDebai để thực hiện AJAX request
callGetDebai();

function renderLy() {
    mainElement.innerHTML = '';
    // Tạo các ly nước
    for (let i = 1; i <= glassCount; i++) {
        mainElement.innerHTML += `
            <div class="ques-ly">
                <div class="question">${glassNames[i - 1][0]} - ${glassNames[i - 1][1]
        } = <span class="answer">?</span></div>
                <div class="warpper-ly">
                    <img src="../media/nap${i}.png" alt="" class="naply">
                    <div class="ly" id="lyid${i}" lySTT="${i}">
                    </div>
                </div>
                <div class="voinuoc">
                    <img src="../media/voi_nuoc.png" alt=""/>
                    <div class="waterfall" style="display: none;">
                        <div class="water">
                            <div class="fall m slow light-blue"></div>
                            <div class="fall s medium teal"></div>
                        </div>
                    </div>
                </div>
            </div>
    `;
        // Tạo các mực nước có sẵn theo giá trị num1
        const lyAddWater = document.getElementById(`lyid${i}`);
        for (j = 1; j <= glassNames[i - 1][0]; j++) {
            const newWater = document.createElement('div');
            newWater.className = 'waterr';
            newWater.style.backgroundColor = getRandomColor();
            lyAddWater.appendChild(newWater);
        }
    }

    glassElements = [...mainElement.querySelectorAll('.warpper-ly')];
    const lyElements = mainElement.querySelectorAll('.ly');
    lyElements.forEach((ele) => ele.addEventListener('click', () => remove1waterr(ele)));

    document.querySelector('.water-out').innerHTML = '';
    for (let i = 1; i <= glassCount; i++) {
        document.querySelector('.water-out').innerHTML += `
            <div class="warpper-ly">
                <div class="ly lyOut" id="lyoutid${i}"></div>
            </div>
        `;
    }
    lyOut = document.querySelectorAll('.lyOut');
    document.querySelector('.action').innerHTML = `
        <button class="bn632-hover bn26" onclick="resetGame()">Chơi lại</button>
        <button class="bn632-hover bn26" onclick="checkAnswer()">Nộp bài</button>
    `;
}

function checkAnswer() {
    glassElements = [...mainElement.querySelectorAll('.warpper-ly')];

    const check = glassElements.every((ele, index) => {
        return ele.querySelectorAll('.waterr').length == glassNames[index][0]-glassNames[index][1];
    });

    if (check) {
        viewAnswer();
        alert('CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG');
    } else {
        alert('BẠN ĐÃ TRẢ LỜI SAI. HÃY THỬ LẠI NHÉ!!!');
    }
}

function resetGame() {
    renderLy();
}

function viewAnswer() {
    const viewAnswerElements = [...mainElement.querySelectorAll('span.answer')];
    viewAnswerElements.forEach((ele, index) => {
        ele.innerHTML = glassNames[index][0]-glassNames[index][1];
    });
}
