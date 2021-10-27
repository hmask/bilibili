/*
 * @Author: your name
 * @Date: 2021-10-22 15:29:44
 * @LastEditTime: 2021-10-26 15:08:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\login.js
 */
require(['./jquery'],()=> {
    $(".btn-tologin").click(function() {
    
        let username = $("#username").val();
        let password = $("#password").val();

        let userArr = JSON.parse(localStorage.getItem("userArr")) || [];
        let userInfo = {
            username: username,
            password: password,
        }
        if (userArr.length == 0) {
            alert("账号或密码错误")
        }
        for(let i = 0; i < userArr.length; i++) {
            if (username == userArr[i].username && password == userArr[i].password) {
                window.location.href = "../index.html"
            } else {
                alert("账号或密码错误")
            }
        }
    })
    $(".btn-toregister").click(function() {
        window.location.href = "./register.html";
    })
})