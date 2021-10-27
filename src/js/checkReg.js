/*
 * @Author: your name
 * @Date: 2021-10-21 15:16:09
 * @LastEditTime: 2021-10-21 17:37:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\checkReg.js
 */
define(['../libs/jquery.min'],()=> {
    function checkUname() {
        let reg = /^[\u4e00-\u9fa5]{2,4}$/  
        let username = $("#username").val();
        if (!reg.test(username)) {
            $("#username").parent().addClass("has-error");
            return false
        } else {
            $("#username").parent().removeClass("has-error").addClass("has-success");
            return true;
        }
    }
    function checkPwd() {
        let reg = /^[a-z]\w{5,7}$/;
        let password = $("#password").val();
        if (!reg.test(password)) {
            $("#password").parent().addClass("has-error");
            return false;
        } else {
            $("#password").parent().removeClass("has-error").addClass("has-success");
            return true;
        }
    }
    function checkPwd2() {
        let password = $("#password").val();
        let password2 = $("#checkPassword").val();
        if (password === password2) {
            $("#checkPassword").parent().removeClass("has-error").addClass("has-success");
            return true;
        } else {
            $("#checkPassword").parent().addClass("has-error");
            return false;
        }
    }
    function checkbox() {
        return document.getElementById("checkbox").checked;
    }
    function checkRegister() {
        checkUname();
        checkPwd();
        checkPwd2();
        if(checkUname() && checkPwd() && checkPwd2() && checkbox()) {
            $("#registerBtn").removeAttr("disabled")
        } else {
            $("#registerBtn").attr("disabled","disabled")
        }
    }
    
    return {
        checkUname,
        checkPwd,
        checkPwd2,
        checkbox,
        checkRegister
    }
})
      
