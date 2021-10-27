<?php
/*
 * @Author: your name
 * @Date: 2021-10-08 11:54:56
 * @LastEditTime: 2021-10-21 18:37:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\Web\bootstrap\server\register.php
 */

header('content-type:text/html;charset="utf-8"');

$username = $_GET['username'];
$password = $_GET['password'];
$link = mysqli_connect("127.0.0.1", "root", "Silly1021", "gp20", "3308");
$sql = "SELECT * FROM `users` WHERE `username` = '$username' AND `password` = '$password'";
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
// echo json_encode($data);
if (count($data)) {

    $arr = array(
        "message" => "此用户名已存在！",
        "code" => 201
    );
    echo json_encode($arr);
    //存储的cookie 要长时间有效
    // session_set_cookie_params(30, session_name(), session_id());
    // //向 session 里面存储一个数据
    // session_start();
    // $_SESSION['login'] = 1;
} else {
    $sql2 = "INSERT INTO `users` VALUES(null,'$username','$password')";
    $res2 = mysqli_query($link, $sql2);
    if ($res2) {
        $arr = array(
            "message" => "注册成功",
            "code" => 200
        );
        echo json_encode($arr);
    }
    
}
?>
