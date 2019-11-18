export const selectItems = (state, key) => {
    if (key) {
        return state.teleprograms.items[key];
    }
    return [];
}
