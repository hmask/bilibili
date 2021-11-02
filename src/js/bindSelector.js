/*
 * @Author: your name
 * @Date: 2021-10-21 10:55:39
 * @LastEditTime: 2021-10-28 22:13:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\bindList.js
 */
define(['jquery'], () => {
    const listInfo = {
        page: "1",
        pagesize: 16,
        area: -1,
        filter: "", //本周 10-0
        platform: "web",
        p_type: "全部类型"
    }

    function getCityList() {
        $.ajax({
            url: "/bilibili/api/ticket/city/list?channel=4",
            success(res) {

                list = res.data.list;
                citys = list.splice(0, 9);

                citys.forEach((item, index) => {

                    $(".city-list").eq(0).append(` <li class="city-item " dataId="${item.id}">${item.name}</li>`)
                })
            }
        })
    }

    function getTypeList() {
        $.ajax({
            url: "/bilibili/api/ticket/project/listconf?city_id=-1",
            success: data => {
                tags = data.data.tags;
                filter = data.data.filter;
                tags.forEach((item, index) => {
                    $(".city-list").eq(1).append(` <li class="city-item-type type ${ index === 0 && 'active' }" >${item.value} </li>`)
                });
                filter.forEach((item, index) => {
                    $(".city-list").eq(2).append(` <li class="city-item-type filter ${ index === 0 && 'active' }" filterId="10-${index}" >${item.value} </li>`)
                })

            }
        })

    }

    function request() {
        $.ajax({
            url: "/bilibili/api/ticket/project/listV2?version=134",
            data: listInfo,
            success: data => {
                data = data.data;
                bindList(data);
            }
        })
    }

    //渲染主体
    function bindList(data) {
        $(".project-list").html("");
        data.result.forEach((item) => {
            $(".project-list").append(`
                    <a href="html/details.html?id=${item.id}">
                    <div class="project-list-item" dataset="${item.id}">
                    <div class="project-list-item-img" style="background-image:url(https://images.weserv.nl/?url=${item.cover})"></div>
                    <div class="project-list-item-detail">
                        <div class="project-list-item-title">${item.project_name}</div>
                        <div class="project-list-item-time">
                            <span class="icon time-icon"></span>
                            ${item.start_time} - ${item.end_time}
                        </div>
                        <div class="project-list-item-address">
                            <span class="icon address-icon"></span>
                            <span class="venue-name-and-address">${item.city}  ${item.venue_name}</span>
                        </div>
                        <div class="project-list-item-price">
                            <div class="not-free">
                                <span class="price-symbol">¥</span>
                                <span class="price">${item.price_low / 100}</span>
                                <span class="start">起</span>
                                <!--  -->
                                <span class="promo-item">独家</span>
                            </div>
                        </div>
                    </div>
                </div></a>
                    `)
        })
        getPage(data);
    }
    //渲染分页
    function getPage(data) {
    
        $(".whole-pagination-wrapper").html("");   
            $(".whole-pagination-wrapper").append(`

            <div class="pagination-wrapper ">
                <div class="iconfont icon-fanhui pagination-right"></div>
                    <div class="pagination">
                     
                        <span class="pageNum active">${data.page && data.page}</span>
                        <span class="pageNum">${data.page + 1}</span>
                        <span class="pageNum">${data.page + 2}</span>
                        <span class="pageNum">${data.page + 3}</span> 
                        <span class="pageNum">...</span> 
                        <span class="pageNum">${data.numPages}</span>
                    </div>
                <div class="iconfont icon-arrow-right pagination-left"></div>
            </div> 
                `)
    }
    // <span class="pageNum">${data.page - 3  > 0 && data.page - 3}</span>
    // <span class="pageNum">${data.page - 2 > 0 && data.page - 2}</span>
    // <span class="pageNum">${data.page - 1 > 0 && data.page - 1}</span> 
    //获取城市筛选信息

    function getFilterMessage() {
        //获取筛选信息
        $(".selector-wrapper").on("click", ".city-item", function () {
            // request();
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            let cityId = $(this).attr("dataId")
            listInfo.area = cityId || -1;
            filterDate(listInfo)
        })
        $(".selector-wrapper").on("click", ".city-item-type.type", function () {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            let type = $(this).text().trim();
            listInfo.p_type = String(type);
            filterDate(listInfo)
        })
        $(".selector-wrapper").on("click", ".city-item-type.filter", function () {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            let filterId = $(this).attr("filterId")

            listInfo.filter = filterId;
            filterDate(listInfo)
        })
        //获取分页信息
        let pagination = document.querySelector(".whole-pagination-wrapper");
        pagination.addEventListener("click", e => {
            e = e || window.event;
            let target = e.target || e.srcElement;
            console.log(target.className)
            //减page
            // if (target.className == "iconfont icon-fanhui pagination-right") {
            //     $(".pageNum.active").removeClass("active").prev().addClass("active");
            //     let currentPage = $(".pageNum.active").text() - 0;
            //     console.log(currentPage)
            //     if (currentPage == 1) {
            //         return false;
            //     } else {
            //         listInfo.page = currentPage;
            //         filterDate(listInfo)
            //     }
            // }
            //增加page
            if (target.className == "iconfont icon-arrow-right pagination-left") {
                $(".pageNum.active").removeClass("active").next().addClass("active");
                let currentPage = $(".pageNum.active").text() - 0;
                listInfo.page = currentPage;
         
                filterDate(listInfo);
            }
        })


    }
    // 筛选功能
    function filterDate(listInfo) {
        $.ajax({
            url: "/bilibili/api/ticket/project/listV2?version=134",
            data: listInfo,
            success: data => {
                data = data.data;
                bindList(data);
            }
        })
    }

    return {
        getCityList,
        getTypeList,
        request,
        getPage,
        getFilterMessage,
    }

})