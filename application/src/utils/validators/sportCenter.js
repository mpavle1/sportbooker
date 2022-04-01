export const isSportCenterComplete = (sportCenter) => {
    if (sportCenter.capacity === '' || sportCenter.capacity === 0) {
        return false;
    }

    if (sportCenter.location === '') {
        return false;
    }

    if (sportCenter.sports.length === 0) {
        return false;
    }

    return true;
}