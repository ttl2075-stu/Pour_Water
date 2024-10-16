<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://hnue.edu.vn/Portals/0/logo_blue.svg" />
        <link rel="stylesheet" href="https://resetcss.long.pro.vn/base.css" />
        <link rel="stylesheet" href="../style.css" />
        <link rel="stylesheet" href="../pouring-water.css" />
        <link rel="stylesheet" href="./CssCongtru.css">
        <script defer src="./phepcong.js"></script>
        <title>GAME: ĐỔ NƯỚC (POUR WATER)</title>
        <?php 
            include 'data.php';
        ?>
    </head>
    <body>
        <div>
            <button onclick="openSetting()" style="position: absolute; z-index: 10; right: 10px; top: 10px">Cài đặt</button>
            <div class="setting">
                <div class="setting-container">
                    <h1>CÀI ĐẶT</h1>
                    <h2>Màu sắc</h2>
                    <select name="colorSetting" id="colorSetting">
                        <option value="1">Màu sắc 1</option>
                        <option value="2">Màu sắc 2</option>
                        <option value="3">Màu sắc 3</option>
                        <option value="4">Màu sắc 4</option>
                        <option value="5">Màu sắc 5</option>
                    </select>
                    <div>
                        <button id="cancelcolor" onclick="cancelcolor()">Huỷ bỏ</button>
                        <button id="cfmcolor" onclick="cfmcolor()">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <nav>
            <div id="canuoc">
                <img src="../media/ca-nuoc.png" alt="" />
                <div class="waterfall">
                    <div class="water">
                        <div class="fall m slow light-blue"></div>
                        <div class="fall s medium teal"></div>
                    </div>
                </div>
            </div>
        </nav>
        <main>
            <?php 
                for ($i = 1; $i <= $countDebai; $i++) {
                    echo "
                        <div class='ques-ly'>
                            <div class='question'>
                                <span class='num1'>{$debai[$i-1][0]}</span>
                                <span class='command'>+</span>
                                <span class='num2'>{$debai[$i-1][1]}</span>
                                <span>=</span>
                                <span class='answer'>?</span></div>
                            <div class='warpper-ly'>
                                <img src=\"../media/nap$i.png\" alt='' class='naply'>
                                <div class='ly'>
                                </div>
                            </div>
                        </div>
                    ";
                }
            ?>
        </main>
        <div class="action">
            <button class="bn632-hover bn26" onclick="resetGame()">Chơi lại</button>
            <button class="bn632-hover bn26" onclick="checkAnswer()">Nộp bài</button>
        </div>
    </body>
</html>
