/*
 * @Author: your name
 * @Date: 2021-10-21 19:27:20
 * @LastEditTime: 2021-10-22 19:00:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\details.js
 */
require(['./getDetailsData',"./loadHead_Foot"],(request,load)=> {
    
    request.request();
    request.bindHtml();
    load.loadHeader();
    load.loadFooter();
    
})