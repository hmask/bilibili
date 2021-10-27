/*
 * @Author: your name
 * @Date: 2021-10-21 15:07:18
 * @LastEditTime: 2021-10-22 15:27:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\register.js
 */
require(['./checkReg',"./loadHead_Foot"], (checkReg,load) => {
    load.loadFooter();
    //表单验证
    $("#username").blur(function(){
        checkReg.checkUname();
        checkReg.checkRegister();
    })
    $("#password").blur(function(){
        checkReg.checkPwd();
        checkReg.checkRegister();
    })
    $("#checkPassword").blur(function(){
        checkReg.checkPwd2();
        checkReg.checkRegister();
    })
    $("#checkbox").click(function() {
        checkReg.checkRegister();
    })

    //点击注册
    $("#registerBtn").click(function() {
        let username = $("#username").val();
        let password = $("#password").val();

        let userArr = [];
        var userInfo = {
            username: username,
            password: password
        }
       
        //localStorage 没数据
        if (!localStorage.userArr) {
            localStorage.userArr = JSON.stringify(userArr);
        } else {
            userArr = JSON.parse(localStorage.userArr);
        }
        for (let i = 0; i < userArr.length; i++) {
            if (userArr[i].username = userInfo.username) {
                alert("此用户已注册，请登录！");
                window.location.href = "../html/login.html";
                return false;
            } 
        }
        alert("注册成功！");
        userArr.push(userInfo);
        localStorage.userArr = JSON.stringify(userArr);
        window.location = "../html/login.html";
        return false;
    })
})