<!DOCTYPE html>
<html lang="en">
    <head>
        <?php 
            include '../assets/php/head.php';
            include '../assets/php/setting.php';
            include 'data.php';
        ?>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="<?php echo FAVICON_URL; ?>" type="image/x-icon" />
        <link rel="stylesheet" href="../<?php echo RESET_CSS_URL; ?>" />
        <link rel="stylesheet" href="../<?php echo STYLE_CSS_PATH; ?>" />
        <link rel="stylesheet" href="../<?php echo POURING_WATER_CSS_PATH; ?>" />
        <link rel="stylesheet" href="./CssNhanbiet.css">
        <script defer src="./nhanbiet.js"></script>
        <title>GAME: ĐỔ NƯỚC (POUR WATER)</title>
    </head>
    <body>
        <div class="popupCheck">
            <div class="popupCheck-win">
                <img src="../media/gold-winner.gif" alt="" class="popupCheck-img popupCheck-img-win">
                <audio src="../media/win.mp3" class="audio-win" type="audio/mp3"></audio>
            </div>
            <div class="popupCheck-lose">
                <img src="../media/lose.gif" alt=""  class="popupCheck-img popupCheck-img-lose">
                <audio src="../media/OhNo.mp3" class="audio-lose" type="audio/mp3"></audio>
            </div>

        </div>
        <div class="setting-groups">
            <audio id="audio" src="../media/anpan.mp3" volume="0.2"></audio>
            <button class="bn632-hover bn26" onclick="openSetting()" style="position: absolute; z-index: 10; right: 10px; top: 10px">Cài đặt</button>
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
                        <button class="bn632-hover bn26 cancel" id="cancelcolor" onclick="cancelcolor()">Huỷ bỏ</button>
                        <button id="muteButton" class="bn632-hover bn26" onclick="cancelcolor()" >Âm thanh</button>
                        <button class="bn632-hover bn26" id="cfmcolor" onclick="cfmcolor()">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="yeucau">
            <h2>Em hãy đổ vào ly nước theo số lần tương ứng trên ly</h2>
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
                        <div class=\"warpper-ly\">
                            <img src=\"../media/nap$i.png\" alt=\"\" class=\"naply\">
                            <div class=\"ly\">
                            </div>
                            <span>{$debai[$i-1]}</span>
                        </div>
                    ";
                }
            ?>
        </main>
        <div class="action">
            <button class="bn632-hover bn26 cancel" onclick="resetGame()">Chơi lại</button>
            <button class="bn632-hover bn26" onclick="checkAnswer()">Nộp bài</button>
        </div>
    </body>
</html>
<script>
    const audio = document.getElementById('audio');
    audio.volume = 0.2; 
    document.getElementById('muteButton').addEventListener('click', function() {
        audio.muted = !audio.muted;
    });
    document.addEventListener('click', function() {
        audio.play();
    });
    audio.addEventListener('ended', function() {
        audio.play();
    });
</script>
