<?php

header('content-type:text/html;charset="utf-8"');
if (!isset($_GET['username']) || !isset($_GET['password'])) {
    $arr = array("message" => "请按照规则携带参数", "code" => 0);
    echo json_encode($arr);
    exit;
}
$username = $_GET['username'];
$password = $_GET['password'];
$link = mysqli_connect("127.0.0.1", "root", "Silly1021", "gp20", "3308");
$sql = "SELECT * FROM `users` WHERE `username` = '$username' AND `password` = '$password'";
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
// echo json_encode($data);
if (count($data)) {
    $arr = array(
        "message" => "登陆成功",
        "code" => 1
    );
    //存储的cookie 要长时间有效
    // session_set_cookie_params(30, session_name(), session_id());
    // //向 session 里面存储一个数据
    // session_start();
    // $_SESSION['login'] = 1;
} else {
    $arr = array(
        "message" => "登陆失败",
        "code" => 2
    );
}
echo json_encode($arr);
