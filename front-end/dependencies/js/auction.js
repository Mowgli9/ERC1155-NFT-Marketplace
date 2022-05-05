import { buyAndSellContract, getFreeItemsContract, auctionAndBidsContract, signer_address } from './interacting.js'


const FreeItemsContract = getFreeItemsContract()
const SellAndBuyContract = buyAndSellContract()
const AuctionAndBidsContract = auctionAndBidsContract()

const riflesCon = document.getElementById("riflesCon")
const playerCon = document.getElementById("playerCon")
const bulletproofCon = document.getElementById("bulletproofCon")
const rifles1 = document.getElementById("rifles1")
const players1 = document.getElementById("players1")
const bullets1 = document.getElementById("bullets1")
const ItemTitle = document.getElementById("ItemTitle")
const container = document.getElementById("container")
const closeBtnapau = document.getElementById("closeBtnapau")
const closeBtnAucion = document.getElementById("closeBtnAucion")
const userBid = document.getElementById("userBid")
const highestBid = document.getElementById("highestBid")
const itemidForAuction = document.getElementById("itemidForAuction")
const confirmBid = document.getElementById("confirmBid")
const auctionID = document.getElementById("auctionID")


function renderInAuction(title, nftId, price, src,timeLeft,auctionId) {
    document.getElementById("container").innerHTML += `
    <div class="col onsellCol">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
  
                <h5 class="card-title">${title}</h5>
                <span class="card-text">Nft Id : <span value = "">${nftId}</span></span><br>
                <span class="card-text">Auction Id : <span id="auctionId" value = "${auctionId}">${auctionId}</span></span><br>
                <span class="card-text">Highest Bid: <span value = "">${price}</span> Eth</span><br>
                <span class="card-text">Time left: <span value = "">${timeLeft}</span></span><br>
                <button class="btn btn-danger" id="bidBtn" value="${auctionId}">Bid</button>
                <button class="btn btn-dark" id="endBtn" value="${auctionId}">End </button>
            </div>
            </div>
  
           </div>`
}

window.onload = rifleAuction()
function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}
async function rifleAuction(){
    rifles1.style.visibility = "hidden"
    const allAuctions = await AuctionAndBidsContract.totalAuctionsCreated()
    const rifleImg = "dependencies/img/rifle(1).png" 
    for (let index = 1; index <=allAuctions; index++) {
        const auction = await AuctionAndBidsContract.getAuctionDetails(index)
            const item = await FreeItemsContract.getItemDetails(auction.itemId)
            const currentTime = (new Date().getTime() / 1000).toFixed(0);

            let timeInS = ""
            if (item._type == 1 && auction.start === true && auction.end === false) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )
                }
                else {
                    timeInS = "00:00:00"
                }
                renderInAuction("Rifle",auction.itemId,ethers.utils.formatEther(auction.highestBid),rifleImg,timeInS,auction.id)
            }
        
    }
}
async function playerAuction(){
    const allAuctions = await AuctionAndBidsContract.totalAuctionsCreated()
    const playerImg = "dependencies/img/soldier(1).png"
    for (let index = 1; index <=allAuctions; index++) {
        const auction = await AuctionAndBidsContract.getAuctionDetails(index)
            const item = await FreeItemsContract.getItemDetails(auction.itemId)
            const currentTime = (new Date().getTime() / 1000).toFixed(0);

            let timeInS = ""
            if (item._type == 2 && auction.start === true && auction.end === false) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )
                }
                else {
                    timeInS = "00:00:00"
                }
                renderInAuction("Rifle",auction.itemId,ethers.utils.formatEther(auction.highestBid),playerImg,timeInS,auction.id)
            }
        
    }
}
async function bulletAuction(){
    const allAuctions = await AuctionAndBidsContract.totalAuctionsCreated()
    const bulletImg = "dependencies/img/bullet-proof(1).png"
    for (let index = 1; index <=allAuctions; index++) {
        const auction = await AuctionAndBidsContract.getAuctionDetails(index)
            const item = await FreeItemsContract.getItemDetails(auction.itemId)
            const currentTime = (new Date().getTime() / 1000).toFixed(0);

            let timeInS = ""
            if (item._type == 3 && auction.start === true && auction.end === false) {
                if(currentTime < auction.endAt){
                    timeInS = convertHMS(auction.endAt - currentTime )
                }
                else {
                    timeInS = "00:00:00"
                }
                renderInAuction("Rifle",auction.itemId,ethers.utils.formatEther(auction.highestBid),bulletImg,timeInS,auction.id)
            
            }
    }
}


rifles1.addEventListener("click",()=>{
    playerCon.innerHTML = ""
    bulletproofCon.innerHTML = ""
    container.innerHTML=""
    ItemTitle.textContent = "Rifles"
    players1.style.visibility = "visible"
    bullets1.style.visibility = "visible"
    rifles1.style.visibility = "hidden"
    rifleAuction()
})
players1.addEventListener("click",()=>{
    bulletproofCon.innerHTML = ""
    container.innerHTML=""
    riflesCon.innerHTML = ""
    ItemTitle.textContent = "Players"
    players1.style.visibility = "hidden"
    bullets1.style.visibility = "visible"
    rifles1.style.visibility = "visible"
    playerAuction()
})
bullets1.addEventListener("click",()=>{
    playerCon.innerHTML = ""
    riflesCon.innerHTML = ""
    container.innerHTML=""
    ItemTitle.textContent = "Bullet proof"
    players1.style.visibility = "visible"
    bullets1.style.visibility = "hidden"
    rifles1.style.visibility = "visible"
    bulletAuction()
})


document.addEventListener("click",async (e)=>{
    if(e.target.id == "endBtn"){
        const auctionId = e.target.value
        const auction  = await AuctionAndBidsContract.getAuctionDetails(auctionId)
        const currentTime = (new Date().getTime() / 1000).toFixed(0);
        if(currentTime > auction.endAt){
            try {
                $(document.getElementById('waitingModal')).modal('show')
                const cancel = await AuctionAndBidsContract.endAuction(auctionId)
            } catch (error) {
                console.log(error)
                $(document.getElementById('waitingModal')).modal('hide')
            }
            
        }
     }
})
document.addEventListener("click",async (e)=>{
    if(e.target.id == "bidBtn"){
        const auctionId = e.target.value
        const auction  = await AuctionAndBidsContract.getAuctionDetails(auctionId)
        $('#itemidForAuction').val(auction.itemId)
        itemidForAuction.disabled = true
        $("#highestBid").val(ethers.utils.formatEther(auction.highestBid))
        highestBid.disabled = true
        $("#auctionID").val(auctionId)
        auctionID.disabled = true
        $(document.getElementById('bidAuction')).modal('show') 
        
     }
})

confirmBid.addEventListener("click",async()=>{
    
    const userBids = userBid.value
    const amount = ethers.utils.parseEther(userBids)
    const currentTime = (new Date().getTime() / 1000).toFixed(0);
    const auctionId =  document.getElementById("auctionID").value
    const auctionn  = await AuctionAndBidsContract.getAuctionDetails(auctionId)
    if(currentTime < auctionn.endAt){
    try {
        const bid = AuctionAndBidsContract.bid(auctionId,{value : amount})
        $(document.getElementById('waitingModal')).modal('show')
        $(document.getElementById('bidAuction')).modal("hide")
    } catch (error) {
        $(document.getElementById('waitingModal')).modal('hide')
        $(document.getElementById('bidAuction')).modal("hide")
        console.log(error.data.message);
    }
    }
})
AuctionAndBidsContract.on("AuctionEnded",()=>{
    $(document.getElementById('waitingModal')).modal('hide')
})
closeBtnapau.addEventListener("click", () => {
    $(document.getElementById('bidAuction')).modal("hide")
})

closeBtnAucion.addEventListener("click", () => {
    $(document.getElementById('bidAuction')).modal("hide")
})

AuctionAndBidsContract.on("Bid",()=>{
    $(document.getElementById('waitingModal')).modal('hide')
    $(document.getElementById('bidAuction')).modal("hide")
})