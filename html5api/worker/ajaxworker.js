//此文件会通过一个新的Worker()来载入，因此，它是运行在独立的线程中的，
//可以放心地使用同步XMLHttpRequest API
//消息是URL数组的形式。以字符串形式同步获取每个URL指定的内容，
//并将这些字符串数组传递回去。
onmessage = function(e) {
    var urls = e.data; //输入：要获取的URL
    var contents = []; //输出：URL指定的内容
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i]; //每个URL
        var xhr = new XMLHttpRequest(); //开始一个HTTP请求
        xhr.open("GET", url, false); //false则表示进行同步请求
        xhr.send(); //阻塞住，一直到响应完成
        if (xhr.status !== 200) //如果请求失败则抛出错误
            throw Error(xhr.status + "" + xhr.statusText + ":" + url);
        contents.push(xhr.responseText); //否则，存储通过URL获取得到的内容
    }
    //最后，将这些URL内容以数组的形式传递回主线程
    postMessage(contents);

}
