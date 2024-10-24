export const Sales = async () => {
    try {
        // Fetch sales data from the API
        const response = await fetch("http://localhost:8088/orders")
        const sales = await response.json()

        // Generate HTML for each sale
        let html = sales.map(sale => `
            <div class="sale">
                Receipt #${sale.id} = $${sale.totalCost.toFixed(2)}
            </div>
        `).join("")

        return html

    } catch (error) {
        console.error("Error fetching sales:", error)
        return "<p>Error: Unable to load sales data. Please try again later.</p>"
    }
}

// Function to add a new sale
export const addSale = async (newSale) => {
    try {
        const response = await fetch("http://localhost:8088/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSale)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log("New sale added:", result)
        return result

    } catch (error) {
        console.error("Error adding new sale:", error)
        throw error // Re-throw the error so it can be handled by the calling function
    }
}













// export const Sales = async () => {
//     const sales = await fetch("http://localhost:8088/orders").then(res => res.json())

//     let salesDivs = sales.map()

//     salesDivs = salesDivs.join("")

//     return salesDivs
// }

