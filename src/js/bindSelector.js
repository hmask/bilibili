/*
 * @Author: your name
 * @Date: 2021-10-21 10:55:39
 * @LastEditTime: 2021-10-22 17:48:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\bindList.js
 */
define(['jquery'], () => {

    function getCityList() {
        $.ajax({
            url: "/bilibili/api/ticket/city/list?channel=4",
            success(res) {
                console.log(res);
                list = res.data.list;
                citys = list.splice(0, 9);
                
                citys.forEach((item, index) => {

                    $(".city-list").eq(0).append(` <li class="city-item " >${item.name}</li>`)
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
                    $(".city-list").eq(1).append(` <li class="city-item-type ${ index === 0 && 'active' }" >${item.value} </li>`)
                });
                filter.forEach((item, index) => {
                    $(".city-list").eq(2).append(` <li class="city-item-type ${ index === 0 && 'active' }" >${item.value} </li>`)
                })

            }
        })

    }

    function bindList() {
        $.ajax({
            url: "/bilibili/api/ticket/project/listV2?version=134&page=1&pagesize=16&area=-1&filter=&platform=web&p_type=%E5%85%A8%E9%83%A8%E7%B1%BB%E5%9E%8B",
            success: data => {
                data = data.data;
                data.result.forEach((item, index) => {
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
            }
        })
    }

    function getPage() {
        $(".whole-pagination-wrapper").append(`
        <div class="pagination-wrapper ">
        <div class="iconfont icon-fanhui pagination-rigth"></div>

        <div class="pagination">

            <span class="pageNum active">1</span><span class="pageNum">2</span><span
                class="pageNum">3</span><span class="pageNum">4</span> <span class="pageNum">...</span> <span
                class="pageNum">45</span></div>
        <div class="iconfont icon-arrow-right pagination-left"></div>
    </div> 
        `)
    }
    //获取筛选信息
    function getFilterMessage() {

    }
    // 筛选功能
    function filterDate() {

    }


    return {
        getCityList,
        getTypeList,
        bindList,
        getPage,
    }

})