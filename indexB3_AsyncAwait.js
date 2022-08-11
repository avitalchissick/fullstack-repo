$('#btnAsyncAwait').on('click',getData);

async function getData() {
    console.log("Sending request now")
    const div = $('#storeData')
    div.html('')

    const storesData = []
    const depData = []

    try {

        //getting stores data
       const storesObj = await createFetchObj('GET','http://localhost:3000/stores') 
       const storesReply = await storesObj.json()
       const promises = []
       for (const store of storesReply){
            storesData.push(store)

            promises.push(createFetchObj('POST','http://localhost:3000/bulk-departments',store.departments))
       }

        //getting departments data
        const depsObj = await Promise.allSettled(promises)
        const depsReply = await jsonAll(depsObj)

        // clearing promises array for re-use
        promises.splice(0,promises.length)

        //processing depeartments and preparing call for products data
        for(const key in depsReply) {
            const dep = depsReply[key]
            if (dep.status === 'fulfilled') {
                storesData[key].departments = dep.value
                for (const key1 in dep.value) {
                    promises.push(createFetchObj('POST','http://localhost:3000/bulk-products',dep.value[key1].products))
                    dep.value[key1].store= storesData[key]
                    depData.push(dep.value[key1])
                }

            } else {
                console.error(dep.status);
                console.error(dep.reason);
            }
        }

        // processing products
        const productsObj = await Promise.allSettled(promises)
        const productsReply = await jsonAll(productsObj)
        for(const key in productsReply) {
            const product = productsReply[key]
            if (product.status === 'fulfilled') {
                // console.log('product')
                // console.log(product.value)

                depData[key].products = product.value

            } else {
                console.error(product.status);
                console.error(product.reason);
            }
        }
    
        console.log('Deps:')
        console.log(depData)

        insertDataToHtml(depData,div)

    } catch (error) {
        console.error(error);
    }

}

function insertDataToHtml(departments,div) {
    for(const dep of departments){
        const h2 = document.createElement('h2')
        h2.style.backgroundColor = 'grey'
        h2.innerHTML = dep.store.name

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

        div.append(h2)
    }
}

async function jsonAll(responses) {
    const promises = []
    for (const response of responses) {
      if (response.status === 'fulfilled') {
        promises.push(response.value.json())
      } else {
        console.error(response.status)
        console.error(response.reason)
      }
    }
    return await Promise.allSettled(promises)
  }

async function createFetchObj(method, url, data = null) {
    const obj = {
      method,
    }
  
    if (method === 'POST') {
        if (data) {
            obj.body = JSON.stringify(data)
          }
        obj.headers = {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
  
    return await fetch(url, obj)
  }