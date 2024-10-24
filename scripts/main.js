import TransientState from './TransientState.js';
import { Entrees } from "./Entrees.js"
import { Veggies } from "./Vegetables.js"
import { Sides } from "./SideDishes.js"
import { Sales, addSale } from "./Sales.js"
// import { setEntreeChoice, setVegetableChoice, setSideChoice, getChoices, clearChoices } from './TransientState.js'




const mainContainer = document.querySelector("#container")

const renderAllHTML = async () => {
    try {
        const entreesHTML = await Entrees()
        const veggiesHTML = await Veggies()
        const sidesHTML = await Sides()
        const salesHTML = await Sales()

    mainContainer.innerHTML = `
        <h1>Laura Kathryn's House of Hummus</h1>
        <section class="entrees">
            <h2>Entrees</h2>
            ${entreesHTML}
        </section>
        <section class="vegetables">
            <h2>Vegetables</h2>
            ${veggiesHTML}
        </section>
        <section class="sides">
            <h2>Sides</h2>
            ${sidesHTML}
        </section>
        <button id="purchase">Purchase Combo</button>
        <section class="sales">
            <h2>Monthly Sales</h2>
            ${salesHTML}
        </section>
    `
} catch (error) {
    console.error("Error in renderAllHTML:", error);
    mainContainer.innerHTML = '<p>An error occurred while loading the page. Please try again later.</p>';
}
}

// Function to calculate total cost
const calculateTotalCost = async () => {
    let total = 0;
const choices = TransientState.getChoices()
    
    // Fetch all menu items
    const [entrees, vegetables, sides] = await Promise.all([
        fetch("http://localhost:8088/entrees").then(res => res.json()),
        fetch("http://localhost:8088/vegetables").then(res => res.json()),
        fetch("http://localhost:8088/sides").then(res => res.json())
    ]);

    // Find selected items and sum their prices
    if (choices.selectedEntreeId) {
        const selectedEntree = entrees.find(e => e.id === choices.selectedEntreeId);
        total += selectedEntree ? selectedEntree.price : 0;
    }
    if (choices.selectedVegetableId) {
        const selectedVegetable = vegetables.find(v => v.id === choices.selectedVegetableId);
        total += selectedVegetable ? selectedVegetable.price : 0;
    }
    if (choices.selectedSideId) {
        const selectedSide = sides.find(s => s.id === choices.selectedSideId);
        total += selectedSide ? selectedSide.price : 0;
    }

    return total
}

document.addEventListener('click', async (event) => {
    if (event.target.id === "purchase") {
        try {
            const choices = TransientState.getChoices()
            console.log('Choices at purchase time:', choices);
            if (choices.selectedEntreeId && choices.selectedVegetableId && choices.selectedSideId) {
                const totalCost = await calculateTotalCost()
                const newSale = {
                    entreeId: choices.selectedEntreeId,
                    vegetableId: choices.selectedVegetableId,
                    sideId: choices.selectedSideId,
                    totalCost: totalCost
            }
            
            
                await addSale(newSale)
                
                const updatedSalesHTML = await Sales()
                const salesContainer = document.querySelector('.sales')
                salesContainer.innerHTML = `
                    <h2>Monthly Sales</h2>
                    ${updatedSalesHTML}
                `

                TransientState.clearChoices()
                document.querySelectorAll('input[type="radio"]').forEach(radio => {
                    radio.checked = false
                })

            } else {
                alert("Please make all selections before purchasing.")
            }
        } catch (error) {
            console.error("Error in purchase process:", error);
            alert("An error occurred during the purchase. Please try again.");
        }
    }
});

                //             }  else (error) {
//                 console.error("Failed to add new sale:", error)
//                 alert("Failed to complete purchase. Please try again.")
//             }
//         } else {
//             alert("Please make all selections before purchasing.")
//         }
//     }
// })

document.addEventListener('change', (event) => {
    if (event.target.type === 'radio') {
        const category = event.target.name;
        const id = parseInt(event.target.value);

        console.log(`Selecting ${category} with id ${id}`);
        
        switch(category) {
            case 'entree':
                TransientState.setEntreeChoice(id)
                break
            case 'vegetable':
                TransientState.setVegetableChoice(id)
                break
            case 'side':
                TransientState.setSideChoice(id)
                break
        }
        console.log('Current choices after selection:', TransientState.getChoices());
    
    }
});


renderAllHTML().catch(error => {
    console.error("Unhandled error in renderAllHTML:", error);
    mainContainer.innerHTML = '<p>An unexpected error occurred. Please try again later.</p>';
});

















// document.addEventListener('change', (event) => {
//     if (event.target.type === 'radio') {
//         const [category, id] = event.target.id.split('--');
//         const parsedId = parseInt(id);
        
//         switch(category) {
//             case 'entree':
//                 setEntreeChoice(parsedId);
//                 break;
//             case 'vegetable':
//                 setVegetableChoice(parsedId);
//                 break;
//             case 'side':
//                 setSideChoice(parsedId);
//                 break;
//         }
//     }
// });

// // Event listener for purchase button
// document.addEventListener('click', async (event) => {
//     if (event.target.id === "purchase") {
//         const choices = getChoices();
//         if (choices.selectedEntreeId && choices.selectedVegetableId && choices.selectedSideId) {
//             const totalCost = await calculateTotalCost();
//             const newSale = {
//                 entreeId: choices.selectedEntreeId,
//                 vegetableId: choices.selectedVegetableId,
//                 sideId: choices.selectedSideId,
//                 totalCost: totalCost
//             };
//             try {
//                 await addSale(newSale);
                
//                 // Update the sales display after successful purchase
//                 const updatedSalesHTML = await Sales()
//                 const salesContainer = document.querySelector('.sales')
//                 salesContainer.innerHTML = `
//                     <h2>Monthly Sales</h2>
//                     ${updatedSalesHTML}
//                 `

//                 clearChoices();
//                 // Clear radio button selections
//                 document.querySelectorAll('input[type="radio"]').forEach(radio => {
//                     radio.checked = false;
//                 });

//             } catch (error) {
//                 console.error("Failed to add new sale:", error)
//                 // Handle the error (e.g., show an error message to the user)
//             }
//         } else {
//             alert("Please make all selections before purchasing.");
//         }
//     }
// });

// // Initial render
// renderAllHTML()














































// import { FoodTruck } from "./FoodTruck.js"
// import { Entrees } from "./Entrees.js"
// import { Veggies } from "./Vegetables.js"
// import { Sides } from "./Sides.js"
// import { PreviousPurchases } from "./PreviousPurchases.js"

// const mainContainer = document.querySelector("#container")

// const renderAllHTML = async () => {
//     const foodTruckHTML = await FoodTruck()
//     const entreesHTML = await Entrees()
//     const vegetablesHTML = await Veggies()
//     const sidesHTML = await Sides()
//     const previousPurchasesHTML = await PreviousPurchases.render()

//     mainContainer.innerHTML = `
//         ${foodTruckHTML}
//         <div class="menu-options">
//             ${entreesHTML}
//             ${vegetablesHTML}
//             ${sidesHTML}
//         </div>
//         ${previousPurchasesHTML}
//     `
// }

// renderAllHTML()

// // Event listener for purchase button
// document.addEventListener('click', async (event) => {
//     if (event.target.id === "purchase") {
//         const newSale = {
//             entreeId: selectedEntreeId,
//             vegetableId: selectedVegetableId,
//             sideId: selectedSideId,
//             totalCost: calculateTotalCost() // You'll need to implement this function
//         }
//         try {
//             await addSale(newSale)
//             // After adding a new sale, refresh the sales display
//             const updatedSalesHTML = await Sales()
//             document.querySelector(".sales").innerHTML = `
//                 <h2>Monthly Sales</h2>
//                 ${updatedSalesHTML}
//             `
//         } catch (error) {
//             console.error("Failed to add new sale:", error)
//             // Handle the error (e.g., show an error message to the user)
//         }
//     }
// })
        
        
        // Logic for handling purchase
        // ...

        // After purchase, re-render previous purchases
        //const previousPurchasesContainer = document.querySelector('.previous-purchases')
        //previousPurchasesContainer.innerHTML = await PreviousPurchases.render()








// const renderAllHTML = async () => {
//     mainContainer.innerHTML = await FoodTruck()
//    Entrees(), Vegetables (), Sides ().then( html => {
//     mainContainer.innerHTML += html
//     })
// }

// renderAllHTML()

