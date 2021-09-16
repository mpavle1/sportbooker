export const isSportCenterComplete = (sportCenter) => {
    if (sportCenter.capacity === '') {
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