/*
 * @Author: your name
 * @Date: 2021-09-28 20:47:02
 * @LastEditTime: 2021-10-21 14:45:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\Web\bilibili会员购\js\index.js
 */
(function (window) {
    getCityList();
    getTypeList();
    getResult();
    getPage();
    console.log(parseQueryString("/bilibili/api/ticket/project/listV2?version=134&page=1&pagesize=16&area=-1&filter=&platform=web&p_type=%E5%85%A8%E9%83%A8%E7%B1%BB%E5%9E%8B"))
  
    const listInfo = {
        version: 134,
        page: 1,
        pagesize: 16,
        area: -1,
        filter: "",
        platform: "web",
        p_type: "全部类型"
    }
    /**
     * 解析查询字符串
     * @param { STRING } str 要解析的查询字符串
     * @return { OBJECT } 解析后的结果
     *  area: "-1"
        bilibili/api/ticket/project/listV2?version: "134"
        filter: ""
        p_type: "%E5%85%A8%E9%83%A8%E7%B1%BB%E5%9E%8B"
        page: "1"
        pagesize: "16"
        platform: "web"
     */
    
    function parseQueryString(str) {
        var obj = {}
        if (str) {
            var tmp = str.slice(1).split('&')
            tmp.forEach(function (item) {
                var t = item.split('=')
                obj[t[0]] = t[1]
            })
        }
        return obj
    }

    function getCityList() {
        $.ajax({
            url: "/bilibili/api/ticket/city/list?channel=4",
            success(res) {
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

    function getResult() {
        $.ajax({
            url: "/bilibili/api/ticket/project/listV2?version=134&page=1&pagesize=16&area=-1&filter=&platform=web&p_type=%E5%85%A8%E9%83%A8%E7%B1%BB%E5%9E%8B",
            success: data => {
                data = data.data;
                bindList(data);
            }
        })
    }

    function bindList(data) {
        console.log(data);
        data.result.forEach((item, index) => {
            $(".project-list").append(`

            <div class="project-list-item">
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
                        <span class="price">65</span>
                        <span class="start">起</span>
                        <!--  -->
                        <span class="promo-item">独家</span>
                    </div>
                </div>
            </div>
        </div>
            `)
        })
    }

    function getPage() {
            $(".whole-pagination-wrapper").append( `
            <div class="pagination-wrapper ">
            <div class="iconfont icon-fanhui pagination-rigth"></div>

            <div class="pagination">

                <span class="pageNum active">1</span><span class="pageNum">2</span><span
                    class="pageNum">3</span><span class="pageNum">4</span> <span class="pageNum">...</span> <span
                    class="pageNum">45</span></div>
            <div class="iconfont icon-arrow-right pagination-left"></div>
        </div> 
            `)
        
        let page = $("[class='pageNum active']").text();
        let url = `/bilibili/api/ticket/project/listV2?version=134&page=${page}&pagesize=16&area=-1&filter=&platform=web&p_type=%E5%85%A8%E9%83%A8%E7%B1%BB%E5%9E%8B`;
    }
    
})(window)