export const Veggies = async () => {
    try {
        // Fetch vegetables data from the API
        const response = await fetch("http://localhost:8088/vegetables")
        const vegetables = await response.json()

        // Generate HTML for each vegetable option
        let html = vegetables.map(vegetable => `
            <div class="vegetable">
                <input type="radio" name="vegetable" value="${vegetable.id}" id="vegetable--${vegetable.id}"/>
                <label for="vegetable--${vegetable.id}">${vegetable.type} ($${vegetable.price.toFixed(2)})</label>
            </div>
        `).join("")

        return html

    } catch (error) {
        console.error("Error fetching vegetables:", error)
        return "<p>Error: Unable to load vegetables. Please try again later.</p>"
    }
}







// export const Veggies = () => {

//     return html
// }
