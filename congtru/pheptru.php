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
        <link rel="stylesheet" href="<?php echo RESET_CSS_URL; ?>" />
        <link rel="stylesheet" href="../<?php echo STYLE_CSS_PATH; ?>" />
        <link rel="stylesheet" href="../<?php echo POURING_WATER_CSS_PATH; ?>" />
        <link rel="stylesheet" href="./CssCongtru.css">
        <script defer src="./pheptru.js"></script>
        <title>GAME: ĐỔ NƯỚC (POUR WATER)</title>
    </head>
    <body>
        <div class="action">
            <button class="bn632-hover bn26" onclick="resetGame()">Chơi lại</button>
            <button class="bn632-hover bn26" onclick="checkAnswer()">Nộp bài</button>
        </div>
        <main>
            <?php 

            ?>
        </main>
        <div class="water-out">
            
        </div>
    </body>
</html>
