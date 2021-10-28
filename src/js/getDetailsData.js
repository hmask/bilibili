/*
 * @Author: your name
 * @Date: 2021-10-21 19:28:23
 * @LastEditTime: 2021-10-28 16:09:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Java Webd:\apacheServer\nginx\www\bilibili\src\js\getDetailsData.js
 */
define(["./jquery"], () => {
    // function getId() {
    //     $(".project-list").on("click",".project-list-item",function() {
    //         let id = $(this).attr("dataset");
    //         return id;
    //     })
    // }
    //查询字符串转对象
    function getQuery(name) {
        let id = location.search.slice(1);
        let arr = id.split("&");
        let obj = {};
        arr.forEach(item => {
            let newArr = item.split("=");
            obj[newArr[0]] = newArr[1];
        })
        return obj[name];
    }
    //cart request
    function cartRequest() {
        let id = getQuery("id");
        let count = getQuery("count");
        let url = "/bilibili/api/ticket/project/get?version=134&id=" + id;
        $.ajax({
            url: url,
            success(res) {
                let data = res.data;
                let ticketList = data.screen_list[0].ticket_list;
                console.log(ticketList)
                renderCart(data, ticketList, count);
            }
        })
    }

    function renderCart(data, ticketList, count) {
        //通过priceId 找到对应价格数据
        let priceId = getQuery("priceId");
        console.log(priceId)
        let list = ticketList.find((item) => {
            return item.id == priceId
        })
        console.log(list);
        let cover = "https:" + data.cover;
        $("#cartImg").attr("src", cover);

        $(".content-right").append(`
        <h5>${data.name}</h5>
        <p>${data.place_info.name}</p>
        <p class="ticket-name"><span title="">${list.screen_name}</span>
            <span></span></p>
        <p>单日预售票</p>
        <i class="iconfont icon-fapiao"><span>电子票</span></i>
        `)

        $(".cartTableTr").append(
            `
            <td>￥${list.price / 100}(${list.desc})</td>
            <td class="count">${count}张</td>
            <td class="price">
                <p>￥${list.price / 100 * count}</p>
                <span>不含运费</span>
            </td>
            `
        )
    }

    function request() {
        let id = getQuery("id");
        let url = "/bilibili/api/ticket/project/get?version=134&id=" + id;
        if (!id) {
            location.href = "../index.html";
            return false;
        } else {
            $.ajax({
                url: url,
                success(res) {
                    let data = res.data
                    renderDetails(data);
                }
            })
        }
    }

    function renderDetails(data) {
        console.log("data", data);
        let cover = "https:" + data.cover;
        let imgDetails = data.performance_desc.list[0].details;
        //详情cover 图片
        $("#imgId").attr("src", cover);
        //详情
        $(".whole-details .right").append(template('goodsTmp', {
            data
        }))
        //嘉宾
        $(".guest-list").append(template('guests', {
            data
        }))

        //图片详情
        $("#imgDetails").append(imgDetails);
    }

    function bindHtml() {
        
        console.log($(".selectable-option.price"));
        //给选中的增加active类名
        $(".right").on("click", ".selectable-option", function () {
            // $(this).css("style","").siblings().css("style","");
            $(this).addClass("active");

            $(this).siblings().removeClass("active");
        })

        let rightDiv = document.querySelector(".right");
        rightDiv.addEventListener("click", e => {
            e = e || window.event;
            var target = e.target || e.srcElement;

            let countBox = document.querySelector(".num");
            let count = document.querySelector(".num").innerHTML - 0;
            //商品数据自增
            if (target.className == "count-add") {
                count++;
                countBox.innerHTML = count;
                if (count >= 10) {
                    return false;
                }
            }
            //商品数量自减
            if (target.className == "count-reduce") {
                let count = document.querySelector(".num").innerHTML - 0;
                if (count == 1) {
                    return false;
                } else {
                    count--;
                    countBox.innerHTML = count;
                }
            }
              
            //立即提交
            if (target.className == "buy") {
                let count = document.querySelector(".num").innerHTML - 0;
                let id = getQuery("id");
                //获取想要提交的id 在价格上面绑定id
                let priceId = $(".selectable-option.price.active").attr("dataset");
                
                let url = "../html/cart.html?id=" + id + "&priceId=" + priceId + "&count=" + count;
                window.location.href = url;
            }
        })
        
        $(".tabs-item").eq(0).click(function() {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            let containerHeight = $(".container").height();
            window.scrollTo({
                top:containerHeight,
                behavior:"smooth"
            })
        }) 
        $(".tabs-item").eq(1).click(function() {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            let containerHeight = $(".container").height() +$(".tabs").height() + $(".guest-list").height();
            console.log( $(".guest-list").height())
            window.scrollTo({
                top:containerHeight,
                behavior:"smooth"
            })
        })
    }



    return {
        request,
        bindHtml,
        cartRequest,
    }

})