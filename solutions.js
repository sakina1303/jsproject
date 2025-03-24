async function fetchMenu() {
    try {
        let response = await fetch("http://50.50.50.115:3000/api/menu"); 
        let pageData = await response.json(); 

        console.log("Menu:");
        console.log("====================================");
        pageData.forEach((item) => {
            console.log(`ID: ${item.id}, Name: ${item.itemName}, Price: $${item.price.toFixed(2)}`);
        });
        console.log("====================================");

        let itemId = prompt("Enter the ID of the item you want to order:");
        let quantity = prompt("Enter the quantity:");
        placeOrder(itemId, quantity);
    } catch(err) {
        console.error("Error fetching menu:", err);
    }
}

async function placeOrder(itemId, quantity) {
    try {
        let order = { itemId, quantity };
        let response = await fetch("http://50.50.50.115:3000/api/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        let result = await response.json();
        console.log("====================================");
        console.log(`Order placed successfully!`);
        console.log(`Item ID: ${itemId}`);
        console.log(`Quantity: ${quantity}`);
        console.log("====================================");
    } catch(err) {
        console.error("Error placing order:", err);
    }
}

fetchMenu();

setTimeout(() => {
    console.log("====================================");
    console.log("Order is ready! Please grab it from the counter.");
    console.log("Visit again!");
    console.log("====================================");
}, 5000);