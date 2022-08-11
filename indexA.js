///////////////////////////////////////////////////////////
//question 1a
const btnGetSync1a = document.querySelector("#getSync1a");
btnGetSync1a.addEventListener("click",getDataSyncXHR);

const btnTest1a = document.querySelector("#test1a");
btnTest1a.addEventListener("click",print1a);

function getDataSyncXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:3000/stores-timeout',false);
    xhr.send();

    if (xhr.status == 200) {
        console.log(xhr.response);
    } else {
        console.error(xhr.status);
    }
    
}

function print1a() {
    console.log("ABCD");
}
///////////////////////////////////////////////////////////
//question 2a
const btnGetSync2a = document.querySelector("#getAsync2a");
btnGetSync2a.addEventListener("click",getDataAsyncXHR);

const btnTest2a = document.querySelector("#test2a");
btnTest2a.addEventListener("click",print2a);

function getDataAsyncXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:3000/stores-timeout');
    
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.response);
        } else {
            console.error(xhr.status);
        }        
    }

    xhr.onprogress = function () {
        console.log('loading');
    }
    
    xhr.send();
}

function print2a() {
    console.log("EFG");
}

///////////////////////////////////////////////////////////
//question 3a
const btnGetSync3a = document.querySelector("#getAsync3a");
btnGetSync3a.addEventListener("click",getDataAsyncAjax);

const btnTest3a = document.querySelector("#test3a");
btnTest3a.addEventListener("click",print3a);

function getDataAsyncAjax() {

    $.ajax({
        type: 'GET',
        url:  'http://localhost:3000/stores-timeout',

        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.error(error.status);
        }
    })

}

function print3a() {
    console.log("HIJK");
}
///////////////////////////////////////////////////////////
//question 4a
const btnPostSync4a = document.querySelector("#postSync4a");
btnPostSync4a.addEventListener("click",postDataSyncXHR);

const btnTest4a = document.querySelector("#test4a");
btnTest4a.addEventListener("click",print4a);

function postDataSyncXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/stores-timeout',false)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

    const data = [ { 
        "name": "Shufersal",
        "departments": [1, 3]
    } ]
    xhr.send(JSON.stringify(data));

    if (xhr.status === 200) {
        console.log(xhr.response);
    } else {
        console.error(xhr.status);
        console.error(xhr.response);
    }
    
}

function print4a() {
    console.log("LMNO");
}

///////////////////////////////////////////////////////////
//question 5a
const btnPostAsync5a = document.querySelector("#postAsync5a");
btnPostAsync5a.addEventListener("click",postDataAsyncXHR);

const btnTest5a = document.querySelector("#test5a");
btnTest5a.addEventListener("click",print5a);

function postDataAsyncXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/stores-timeout')
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.response);
        } else {
            console.error(xhr.status);
        }        
    }

    xhr.onprogress = function () {
        console.log('loading');
    }

    const data = [ { 
        "name": "Shufersal",
        "departments": [1, 3]
    } ]
    xhr.send(JSON.stringify(data));
}

function print5a() {
    console.log("PQR");
}

///////////////////////////////////////////////////////////
//question 6a
const btnPostAsync6a = document.querySelector("#postAsync6a");
btnPostAsync6a.addEventListener("click",postAjaxDataAsyncXHR);

const btnTest6a = document.querySelector("#test6a");
btnTest6a.addEventListener("click",print6a);

function postAjaxDataAsyncXHR() {

    const data = [ { 
        "name": "Shufersal",
        "departments": [1, 3]
    } ]

    $.ajax({
        type: 'POST',
        url:  'http://localhost:3000/stores-timeout',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(data),
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.error(error.status);
        }
    })
}

function print6a() {
    console.log("STU");
}