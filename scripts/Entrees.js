export const Entrees = async () => {
    try {
        const response = await fetch("http://localhost:8088/entrees")
        const entrees = await response.json()
        
        let html = entrees.map(entree => `
            <div class="entree">
                <input type="radio" name="entree" value="${entree.id}" id="entree--${entree.id}"/>
                <label for="entree--${entree.id}">${entree.name}</label>
            </div>
        `).join("")
        
        return html
    } catch (error) {
        console.error("Error fetching entrees:", error)
        return "<p>Error: Unable to load entrees. Please try again later.</p>"
    }
}



















// export const Entrees = async () => {
    
//     try {
//         const entrees = await fetch("http://localhost:8088/entrees").then(res => res.json())
//         console.log('printing entrees')
//         console.log(entrees)
//         let entreesDivs = entrees.map( obj => 
//             `\n<input type="radio" name="entree" value="${obj.id}" id="entree${obj.id}"> 
//             <label for="entree${obj.id}">${obj.name}</label>`)

//         entreesDivs = entreesDivs.join("<br>")

//     html += entreesDivs
//     html += '\n\n<input type="submit" value="Click here to confirm">\n\n'
//     html += "</form>"
//     console.log(html)
//     return entreesDivs
//     } catch (er) {
//         console.log(er)
//     }
    

//     return "<h1>something went wrong...</h1></h1>"
// }