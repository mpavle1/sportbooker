export const isSportCenterComplete = (sportCenter) => {
    if (sportCenter.capacity === '' || sportCenter.capacity === 0) {
        return false;
    }

    if (sportCenter.locationId === null) {
        return false;
    }

    if (sportCenter.sportIds.length === 0) {
        return false;
    }

    return true;
}