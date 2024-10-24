export const PreviousPurchases = {
    async getPurchases() {
        try {
            const response = await fetch("http://localhost:8088/orders");
            const orders = await response.json();
            return orders;
        } catch (error) {
            console.error("Failed to fetch previous purchases:", error);
            return [];
        }
    },

    formatPurchase(purchase) {
        return `Receipt #${purchase.id} = $${purchase.totalCost.toFixed(2)}`;
    },

    async addPurchase(newPurchase) {
        try {
            const response = await fetch("http://localhost:8088/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPurchase),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to add purchase:", error);
            throw error;
        }
    },

    generateHTML(purchases) {
        const purchasesHTML = purchases.map(this.formatPurchase).join('<br>');
        return `
            <section class="previous-purchases">
                <h2>Monthly Sales</h2>
                ${purchasesHTML}
            </section>
        `;
    }
};