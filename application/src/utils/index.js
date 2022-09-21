export const isStandActive = (stadium, side) => {
    return Object.values(stadium[side].sections).some((section) => section.active === true);
}

export const isSectionActive = (stadium, side, section) => {
    return stadium[side].sections[section].active;
}
