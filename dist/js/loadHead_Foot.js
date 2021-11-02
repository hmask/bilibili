/*
 * @Author: your name
 * @Date: 2021-10-21 14:49:18
 * @LastEditTime: 2021-10-28 20:24:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\loadFooter.js
 */
define(["jquery","../libs/swiper-bundle"], ($,Swiper) => {


    function loadHeader() {

        $("header").load("../html/header.html", function () {
            //jsonp 
            $(".nav-header-search-bar").keyup(function () {
                let wd = $('.nav-header-search-bar-wrapper input').val().trim();;
                if (wd != "") {
                    $.ajax({
                            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                            dataType: "jsonp",
                            jsonp: "cb",
                            jsonpCallback: "fn",
                            data: {
                                wd,
                            }
                        })
                        .then(res => {
                            console.log(res);
                            let containerUl = document.querySelector(".suggestion-list");
                            containerUl.innerHTML = "";
                            console.log(res);
                            res.s.forEach(item => {
                                containerUl.innerHTML +=
                                    `<li>${item}</li>`
                            })
                        })

                }
            })
            //点击  之外 的地方触发  将ul里面内容清空
            $(document).bind("click", function (e) {
                var target = $(e.target);

                if (target.closest(".nav-header-search-bar").length == 0) {
                    let containerUl = document.querySelector(".suggestion-list");
                    containerUl.innerHTML = "";
                }
            })
            //注册
            $(".register").click(function () {
                window.location.href = "../html/register.html"
            })
            //登录
            $(".login").click(function () {
                window.location.href = "../html/login.html"
            })
            //判断 出现头像还是登陆注册
            let user = localStorage.getItem("userArr");
            
            if (user) {
                $(".logoin-and-register").hide();
                $(".user-info").show();
            }


            //user图标 显示信息
            $(".user-info").mouseover(function () {
                $(".user-info .profile-img").addClass("active");
                $(".userDetails").stop().slideDown(300);
                //用户id
                let username = JSON.parse(localStorage.getItem("userArr"))[0].username;
                $(".userId").text(username);

                //退出登录
                $(".esc").click(function () {
                    $(".user-info").hide();
                    $(".logoin-and-register").show();
                })
            })
            $(".user-info").mouseleave(function () {
                $(".user-info .profile-img").removeClass("active");
                $(".userDetails").stop().slideUp(300);
            })


        });
    }

    function loadFooter() {
        $("footer").load("../html/footer.html");
    }
    function loadSwiper() {
        $(".swiper").load("../html/swiper.html",function() {
            var mySwiper = new Swiper('.swiper-container', {
                //   direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                speed: 600,
                effect: 'fade',
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                },
        
        
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
        
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
        
            })
            mySwiper.el.onmouseover = function () {
                mySwiper.autoplay.stop();
            }
            mySwiper.el.onmouseout = function () {
                mySwiper.autoplay.start();
            }
        });
    }
    return {
        loadHeader,
        loadFooter,
        loadSwiper
    }

})