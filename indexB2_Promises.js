$('#btnPromises').on('click',getData);

function getData() {
    console.log("Sending request now")
    const div = $('#storeData')
    div.html('')

    const stores = []
    const departments = []

    PromisifyAjax('GET','http://localhost:3000/stores')
    .then(function(response){

        const promises = []

        for(const store of response){
            stores.push(store)
            promises.push(PromisifyAjax('POST','http://localhost:3000/bulk-departments',store.departments))
        }

        console.log('stores');
        console.log(stores);
         return Promise.allSettled(promises)
    })
    .then(function(responseArr){
        const promises = []
        console.log(responseArr);
        for(const key in responseArr){
            if(responseArr[key].status==="fulfilled"){
                const storeDeps = responseArr[key].value
                stores[key].departments= storeDeps
                for (const dep of storeDeps){
                    dep.store = stores[key].name
                    departments.push(dep)
                    promises.push(PromisifyAjax('POST','http://localhost:3000/bulk-products',dep.products))
                }
            } else {
                console.log(responseArr[key].status);
                console.log(responseArr[key].reason);
            }
        }

        return Promise.allSettled(promises)
    })
    .then(function(responseArr){
        console.log(responseArr);
        for(const key in responseArr){
            if(responseArr[key].status==="fulfilled"){
                departments[key].products = responseArr[key].value
            } else {
                console.log(responseArr[key].status);
                console.log(responseArr[key].reason);
            }
        }
        console.log('stores');
        console.log(stores)
        insertDataToHtml(stores,div)

    })
    .catch(function(error) {
        console.log(error)
    })
}

function insertDataToHtml(stores,div) {
    for(const store of stores){
        const h2 = document.createElement('h2')
        h2.style.backgroundColor = 'grey'
        h2.innerHTML = store.name

        for(const dep of store.departments){
            const ol_dep = document.createElement('ol')
            ol_dep.style.backgroundColor = 'aquamarine'
            ol_dep.innerHTML = dep.name

            for (const product of dep.products){
                const ol = document.createElement('ol')
                ol.style.backgroundColor = 'lightblue'
                ol.innerHTML = product.name
                ol_dep.appendChild(ol)    
            }
            h2.appendChild(ol_dep)
        }
        div.append(h2)
    }
}

function PromisifyAjax(type,url,data = null){
    return new Promise(function(resolve,reject){
        const ajaxObj = {
            type,
            url,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        }

        if (type === 'POST'){
            ajaxObj.contentType = 'application/json; charset=utf-8'
            if (data){
                ajaxObj.data = JSON.stringify(data)
            }
        }
        
        $.ajax(ajaxObj)
    })
}