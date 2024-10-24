const TransientState = (function() {
    const transientState = {
        selectedEntreeId: null,
        selectedVegetableId: null,
        selectedSideId: null
    };

    return {
        setEntreeChoice: function(id) {
            transientState.selectedEntreeId = id;
        },
        setVegetableChoice: function(id) {
            transientState.selectedVegetableId = id;
        },
        setSideChoice: function(id) {
            transientState.selectedSideId = id;
        },
        getChoices: function() {
            return {...transientState};
        },
        clearChoices: function() {
            transientState.selectedEntreeId = null;
            transientState.selectedVegetableId = null;
            transientState.selectedSideId = null;
        }
    };
})();

export default TransientState;














// export const setEntreeChoice = (id) => {
//     transientState.selectedEntreeId = id;
// };

// export const setVegetableChoice = (id) => {
//     transientState.selectedVegetableId = id;
// };

// export const setSideChoice = (id) => {
//     transientState.selectedSideId = id;
// };

// export const getChoices = () => {
//     return {...transientState};
// };

// export const clearChoices = () => {
//     transientState.selectedEntreeId = null;
//     transientState.selectedVegetableId = null;
//     transientState.selectedSideId = null;
// };