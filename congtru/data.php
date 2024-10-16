<?php 
$debai = [
    [1,1],
    [1,0],
];
$countDebai = count($debai);

function getDebai () {
    return json_encode($GLOBALS['debai']);
}
if (isset($_POST['action']) && $_POST['action'] == 'getDebai') {
    echo getDebai();
}