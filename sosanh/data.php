<?php 
$dau = 'less';
$debai = [1,2,3];
$countDebai = count($debai);

function getDebai () {
    return json_encode($GLOBALS['debai']);
}
function getDau () {
    return json_encode($GLOBALS['dau']);
}
if (isset($_POST['action']) && $_POST['action'] == 'getDebai') {
    echo getDebai();
} else if (isset($_POST['action']) && $_POST['action'] == 'getDau') {
    echo getDau();
}