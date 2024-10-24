export const Sides = async () => {
    try {
        // Fetch sides data from the API
        const response = await fetch("http://localhost:8088/sides")
        const sides = await response.json()

        // Generate HTML for each side dish option
        let html = sides.map(side => `
            <div class="side">
                <input type="radio" name="side" value="${side.id}" id="side--${side.id}"/>
                <label for="side--${side.id}">${side.title} ($${side.price.toFixed(2)})</label>
            </div>
        `).join("")

        return html

    } catch (error) {
        console.error("Error fetching sides:", error)
        return "<p>Error: Unable to load side dishes. Please try again later.</p>"
    }
}

