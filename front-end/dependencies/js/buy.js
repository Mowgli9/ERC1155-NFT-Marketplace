import { buyAndSellContract, getFreeItemsContract } from './interacting.js'


const FreeItemsContract = getFreeItemsContract()
const SellAndBuyContract = buyAndSellContract()

const containerRow = document.getElementById("containerRow")
const confirmedBuyBtn = document.getElementById("confirmedBuyBtn")


function renderCards(title, nftId, price, src,productId) {
    document.getElementById("containerRow").innerHTML += `

     <div class="col onsellCol">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
  
                <h5 class="card-title cardTitle">${title}</h5>
                <span class="card-text">Nft Id : <span id="nft-player-id" >${nftId}</span></span><br>
                <span class="card-text">Price: <span id="nft-player-id">${price}</span> Eth</span><br>
                <button class="btn btn-danger" id="buyBtn" data-id="${productId}" data-price=${price}>Buy</button>
                <button class="btn btn-dark" id="auctionBtn">Bid</button>
            </div>
        </div>        
    </div>`
}
window.onload = renderRifles()


async function renderRifles() {
    ItemTitle.textContent = "All availabe Rifles"
    rifles1.style.visibility = "hidden"
    bullets1.style.visibility = "visible"
    players1.style.visibility = "visible"

    const rifleImg = "dependencies/img/rifle(1).png"
    const allOnSellProduct = await SellAndBuyContract.getTotalProductCreated()
    for (let index = 1; index <= allOnSellProduct; index++) {
        const product = await SellAndBuyContract.getProductDetail(index)
        const item = await FreeItemsContract.getItemDetails(product.itemId)
        if (item._type == 1 && product.isSold === false) {

            renderCards("Rifle", item.id, ethers.utils.formatEther(product.price), rifleImg,product.id)
        }
    }
}
async function renderPlayers() {
    ItemTitle.textContent = "All availabe Palyers"
    rifles1.style.visibility = "visible"
    bullets1.style.visibility = "visible"
    players1.style.visibility = "hidden"

    const playerImg = "dependencies/img/soldier(1).png"
    const allOnSellProduct = await SellAndBuyContract.getTotalProductCreated()
    for (let index = 1; index <= allOnSellProduct; index++) {
        const product = await SellAndBuyContract.getProductDetail(index)
        const item = await FreeItemsContract.getItemDetails(product.itemId)
        if (item._type == 2 && product.isSold === false) {

            renderCards("Rifle", item.id, ethers.utils.formatEther(product.price), playerImg,product.id)
        }
    }
}
async function renderBullet() {
    ItemTitle.textContent = "All availabe Bullets Proof"
    rifles1.style.visibility = "visible"
    bullets1.style.visibility = "hidden"
    players1.style.visibility = "visible"

    const bulletImg = "dependencies/img/bullet-proof(1).png"
    const allOnSellProduct = await SellAndBuyContract.getTotalProductCreated()
    for (let index = 1; index <= allOnSellProduct; index++) {
        const product = await SellAndBuyContract.getProductDetail(index)
        const item = await FreeItemsContract.getItemDetails(product.itemId)
        if (item._type == 3 && product.isSold === false) {

            renderCards("Bullet Proof", item.id, ethers.utils.formatEther(product.price), bulletImg,product.id)
        }
    }
}


document.getElementById("rifles1").addEventListener("click", () => {
    containerRow.innerHTML = ""
    renderRifles()
})
document.getElementById("players1").addEventListener("click", () => {
    containerRow.innerHTML = ""
    renderPlayers()
})
document.getElementById("bullets1").addEventListener("click", () => {
    containerRow.innerHTML = ""
    renderBullet()
})

document.addEventListener('click', async function expendModal(e) {
    if (e.target && e.target.id == 'buyBtn') {
        const id = e.target.getAttribute("data-id")
        const price = e.target.getAttribute("data-price")
        const amount = { value: ethers.utils.parseEther(price) }
        try {
            console.log("id",id,"price",amount);
            $(document.getElementById('waitingModal')).modal("show")
            const buy = await SellAndBuyContract.purchaseProduct(1,amount)
        } catch (error) {
            $(document.getElementById('waitingModal')).modal("hide")
           console.log(error);
        }

    }

}
)




SellAndBuyContract.on("ItemsSold", () => {
    $(document.getElementById('waitingModal')).modal('hide')

})