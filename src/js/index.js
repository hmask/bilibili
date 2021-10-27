/*
 * @Author: your name
 * @Date: 2021-10-21 10:27:11
 * @LastEditTime: 2021-10-26 20:34:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\index.js
 */
// require(['./a', './b'], (render, modB)=>{
//     console.log(render.num)
//     console.log(modB.num)
//     render.tab()
//     modB.cart()
//     render.hide()
// })

require(['./config'],function(){
    require(['bindSelector','loadHead_Foot','getDetailsData','swiper'],(render,load,getDetailsData,swiper)=> {
        load.loadHeader();
        load.loadSwiper();
        render.getCityList();
        render. getTypeList();
        render.bindList();
        render.getPage();
        load.loadFooter();
    })
})