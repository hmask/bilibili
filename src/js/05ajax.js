/*
 * @Author: your name
 * @Date: 2021-08-29 16:23:20
 * @LastEditTime: 2021-09-28 16:43:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端基础第一天d:\apacheServer\Web\05ajax.js
 */
 function creXhr() {
            
            var xhr = null;
            //根据各种判断，来给xhr赋值
            var flag = false;
            var arr = [
                function a() {
                    return new XMLHttpRequest();
                },
                function b() {
                    return new ActiveXObject("Microsoft.XMLHTTP");

                },
                function c() {
                    return new ActiveXObject("Msxml.XMLHTTP");
                },
                function d() {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
            
            ]
            for (let i = 0; i < arr.length; i++) {
                try {
                    xhr = arr[i]();
                    creXhr = arr[i];
                    flag = true;
                    break;
                } catch(e) {} 
            }

            if (!flag) {
                xhr = "您的浏览器不支持ajax，请更换浏览器重试；";
                throw new Error(xhr);

            }
            //返回xhr
            return xhr;

        }
    

    function ajax(options = {}) {
      // options = {} 目的: 为了保证你的 options 是一个对象
      // 我执行 options.xxx 的时候不会报错
      // options.success 和 error 式两个函数数据类型或者没传递

      // 1. 参数验证
      // 1-1. 验证 url
      if (!options.url) {
        throw new Error('url 为必填选项')
      }

      // 1-2. 验证 type
      if (!(options.type == undefined || options.type.toUpperCase() === 'GET' || options.type.toUpperCase() === 'POST')) {
        throw new Error('目前只接收 GET 或者 POST 请求方式, 请期待更新')
      }

      // 1-3. 验证 async
      if (!(options.async == undefined || typeof options.async === 'boolean')) {
        throw new Error('async 需要一个 Boolean 数据类型')
      }

      // 1-4. 验证 dataType
      if (!(options.dataType == undefined || options.dataType === 'string' || options.dataType === 'json')) {
        throw new Error('目前只支持 string 和 json 格式解析, 请期待更新')
      }

      // 1-5. 验证 data
      if (!(options.data == undefined || typeof options.data === 'string' || Object.prototype.toString.call(options.data) === '[object Object]')) {
        throw new Error('data 参数只支持 string 和 object 数据类型')
      }

      // 1-6. 验证 success 和 error
      if (!(options.success == undefined || typeof options.success === 'function')) {
        throw new Error('success 传递一个函数类型')
      }

      if (!(options.error == undefined || typeof options.error === 'function')) {
        throw new Error('error 传递一个函数类型')
      }

      // 代码来到这里, 说明 options.success 和 error 肯定是一个 undefined 或者 function

      // 2. 设置一套默认值
      var _default = {
        url: options.url,
        // 代码能来到这里, 说名 undefined  get  post
        type: options.type || 'GET',
        // 代码能来到这里, 说明 undefined true false
        // 三元表达式, 如果你式个 布尔值, 那么就用你的, 否则用 true
        async: typeof options.async === 'boolean' ? options.async : true,
        // 代码能来到这里, 说明 undefined 'string' 'json'
        dataType: options.dataType || 'string',
        // 代码能来到这里, 说明 undefined '' {}
        data: options.data || '',
        // 如果你传递了是一个 function, 就用你传递的, 否则我就给一个默认函数
        success: options.success || function () {},
        error: options.error || function () {}
      }

      // 到这里, _default.success 和 error 肯定式一个函数

      // 2-2. 单独调整一下 data
      // 能来到这里, _default.data 只能是 '' {}
      if (typeof _default.data === 'object') {
        // 准备一个空字符串
        var str = ''
        for (var key in _default.data) {
          str += key + '=' + _default.data[key] + '&'
        }
        // 拼接完毕以后, 把最后一位去掉, 从新赋值给 _default.data
        _default.data = str.slice(0, -1)
      }


      // 3. 发送请求
      var xhr = creXhr()

      // 3-1. 请求地址, 如果是 get 请求 url + '?' + data
      //               如果式 post 请求 url
      // 判断, 如果是 get 请求, 那么我把 _default.url 修改一下
      if (_default.type.toUpperCase() === 'GET' && _default.data) {
        _default.url += '?' + _default.data
      }
      xhr.open(_default.type, _default.url, _default.async)
      xhr.onreadystatechange = function () {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.readyState === 4) {
          // 3-3. 判断 dataType 如果式 json 要解析
          if (_default.dataType === 'json') {
            // 成功, 不需要打印
            // 调用 _default.success()
            var res = JSON.parse(xhr.responseText)
            // 要吗调用的式你传递进来的函数, 要吗调用的式默认函数
            // 调用的如果式默认函数, 那么就相当于什么都没执行
            // 如果调用的式你传递进来的函数, 那么你在函数里面写什么就执行什么
            _default.success(res)
          } else if (_default.dataType === 'string') {
            _default.success(xhr.responseText)
          }
        }

        if (xhr.readyState === 4 && xhr.status >= 400) {
          _default.error(xhr.status)
        }
      }

      // 3-2. 判断是不是 post 请求
      if (_default.type.toUpperCase() === 'POST') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
      }
      xhr.send(_default.data)
    }

