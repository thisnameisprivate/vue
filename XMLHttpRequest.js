var Request = new XMLHttpRequest();
Request.open("GET", 'xxx-xxx-xxx');
Request.send();
Request.onreadystatechange = function () {
    if (Request.readyState = 4 && Request.status == 200) {
       // document.getElementsByClassName('div')[0].contentWindow.body.innerHTML = Request.responseText;
        document.getELementsBYClassName('div')[0].contentWindow.document.body.innerHTML = Request.responseText;
    }
}