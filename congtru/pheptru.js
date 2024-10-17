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

// Xử lý màu sắc
let colorsSetting = [];
getColorsFromPHP();
function getColorsFromPHP() {
    const xhr = new XMLHttpRequest();
    const url = '../assets/php/setting.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = xhr.responseText;
            colorsSetting = JSON.parse(response);
        } else {
            console.error('Error retrieving colors from PHP');
        }
    };
    xhr.send('action=getColorsSetting');
}

let colors = [];
getColorsUser();
function getColorsUser () {
    const xhr = new XMLHttpRequest();
    const url = '../assets/php/setting.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = xhr.responseText;
            colors = colorsSetting[(response)];
        } else {
            console.error('Error retrieving colors from PHP');
            colors = colorsSetting[0];
        }
    };
    xhr.send('action=getColorsUser');
}

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
