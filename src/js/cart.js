/*
 * @Author: your name
 * @Date: 2021-10-22 16:29:36
 * @LastEditTime: 2021-10-26 19:46:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\cart.js
 */
require(['./getDetailsData',"./loadHead_Foot"],(request,load)=> {
    
   
   request.cartRequest();
   load.loadHeader();
   load.loadFooter();
    
})