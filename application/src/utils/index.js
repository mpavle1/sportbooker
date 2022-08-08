export const isStandActive = (stadium, side) => {
    // console.log(side, Object.values(stadium[side].sections));
    return Object.values(stadium[side].sections).some((section) => section.active === true);
}

export const isSectionActive = (stadium, side, section) => {
    return stadium[side].sections[section].active;
}
