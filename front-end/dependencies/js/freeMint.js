import { getFreeItemsContract,signer_address,isUserLogged} from './interacting.js'


// free mint buttons/
const free_player_mint = document.getElementById("free-mint-player")
const free_mint_bullet = document.getElementById("free-mint-bullet")
const free_mint_rifle = document.getElementById("free-mint-rifle")
const contract = getFreeItemsContract()


window.onload = isUserLogged()
console.log(await signer_address);
free_player_mint.addEventListener("click", async function () {
    try { 
        $(document.getElementById('exampleModalCenter')).modal('show')
        await contract.getFreeItem(2) 
    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})

free_mint_bullet.addEventListener("click", async function () {
    try {
        $(document.getElementById('exampleModalCenter')).modal('show')
        await contract.getFreeItem(3)
    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})

free_mint_rifle.addEventListener("click", async function () {
    try {
        $(document.getElementById('exampleModalCenter')).modal('show')
        await contract.getFreeItem(1)

    }
    catch (error) {
        $(document.getElementById('exampleModalCenter')).modal('hide')
    }
})
// ---



//----- handle events -----

contract.on("FreeItemMinted", (id, minter) => {
     $(document.getElementById('exampleModalCenter')).modal('hide')
})
