function LoadCategories() {
    var div = document.createElement('div')
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
            data.unshift("ALL")
            data.map(items => {

                var button = document.createElement('button')

                button.innerHTML = items.toUpperCase()
                div.id = "buttons"
                button.className = "btn border border-dark m-1"
                button.addEventListener('click', function () {
                    if (button.innerHTML == "ALL") {
                        LoadProducts('https://fakestoreapi.com/products')
                    } else {
                        LoadProducts(`https://fakestoreapi.com/products/category/${items}`)
                    }
                })
                div.appendChild(button)
                document.getElementById('categories').appendChild(div)
            })
        })
}

function LoadProducts(url) {
    document.getElementById('products').innerHTML = ""
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.map(items => {
                var div = document.createElement('div')
                div.style.margin = '10px'

                div.style.width = "250px"




                div.innerHTML = `
            <div class='card d-flex flex-wrap w-100' >
            <div class="card-header card-img-top"><img src=${items.image} height="200" width="200""></div>
            <div class="card-body" style="height:100px">${items.title}</div>
            <div class="card-footer d-flex justify-content-between">
            <div>$${items.price}</div>
            <div><button class="btn btn-danger" onclick="AddClick(${items.id})">Add To Cart</button></div>
            
            </div>
            </div>
            `

                document.getElementById('products').appendChild(div)
            })
        })
}
function LoadBody() {
    LoadCategories()
    LoadProducts('https://fakestoreapi.com/products')
}

var cart = []
function GetCartCount() {
    document.getElementById('cartCount').innerHTML = cart.length
}

function AddClick(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
            cart.push(data)
            GetCartCount()
        })
}

function ShowCart() {
    document.querySelector('tbody').innerHTML = ""
    document.querySelector('tfoot').innerHTML = ""
    var price = 0
    
    cart.map(items => {
        let tr = document.createElement('tr')
        let tdTitle = document.createElement('td')
        let tdImage = document.createElement('td')
        let tdPrice = document.createElement('td')
        let tdRemove = document.createElement('td')


        tdTitle.innerHTML = items.title
        tdImage.innerHTML = `<img src=${items.image} height=100 width=100>`
        tdPrice.innerHTML = "$" + +items.price
        tdPrice.style.fontWeight = 'bold'
        price += items.price
        tdRemove.innerHTML=`<button class="btn btn-danger" onclick="RemoveClick(${items.id})"><span class="bi bi-trash-fill"></span></button>`

        tr.appendChild(tdTitle)
        tr.appendChild(tdImage)
        tr.appendChild(tdPrice)
        tr.appendChild(tdRemove)

        document.querySelector('tbody').appendChild(tr)
          
    })
       
        let trfoot = document.createElement('tr')
        let tdSpace = document.createElement('td')
         let tdTotal = document.createElement('td')
        let tdfinal = document.createElement('td')
        let tdSpace1 = document.createElement('td')
        tdTotal.innerHTML = "Total"
        tdTotal.className = 'fw-bold'
        tdfinal.innerHTML = '$'+''+price
        tdfinal.className = "fs-3 fw-b"

        trfoot.appendChild(tdSpace)
        trfoot.appendChild(tdSpace1)
         trfoot.appendChild(tdTotal)
         trfoot.appendChild(tdfinal)
         document.querySelector('tfoot').appendChild(trfoot)
    

   
}    
 function RemoveClick(item){
    fetch(`https://fakestoreapi.com/products/${item}`)
    .then(res=>res.json())
    .then(data=>{
       
        cart.splice(data,1)
       
    
    }
       
    )
    ShowCart()
    GetCartCount()
 }
