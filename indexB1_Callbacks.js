$('#btnCallbacks').on('click',getData);

function getData() {
    console.log("Sending request now")
    const div = $('#storeData')
    div.html('')
    
    $.ajax({
        type: 'GET',
        url:  'http://localhost:3000/stores',
        success: function(stores){
            console.log('stores:');
            console.log(stores);

            for (const store of stores)
            {
                // adding results to HTML
                const h2 = document.createElement('h2')
                h2.style.backgroundColor = 'grey'
                h2.innerHTML = store.name
    
                $.ajax({
                    type: 'POST',
                    url:  'http://localhost:3000/bulk-departments',
                    data: JSON.stringify(store.departments),
                    contentType: 'application/json',
                    success: function(departments){
                        console.log('departments:');
                        console.log(departments);
                        
                        for (const department of departments)
                        {
                            const ol_dep = document.createElement('ol')
                            ol_dep.style.backgroundColor = 'aquamarine'
                            ol_dep.innerHTML = department.name
              
                            $.ajax({
                                type: 'POST',
                                url:  'http://localhost:3000/bulk-products',
                                data: JSON.stringify(department.products),
                                contentType: 'application/json',
                                success: function(products){
                                    console.log('products:');
                                    console.log(products);

                                    for (const product of products)
                                    {
                                        const ol = document.createElement('ol')
                                        ol.style.backgroundColor = 'lightblue'
                                        ol.innerHTML = product.name
                                        ol_dep.appendChild(ol)    
                                    }
        
                                },
                                error: function(error) {
                                    console.error('products');
                                    console.error(error.status);
                                }
                            })
                            h2.appendChild(ol_dep)
                        }
            
                    },
                    error: function(error) {
                        console.error('departments');
                        console.error(error.status);
                    }
                })

                div.append(h2)
            }
        },
        error: function(error) {
            console.error('stores');
            console.error(error.status);
        }
    })
}