export const isSportCenterComplete = (sportCenter) => {
    if (!sportCenter?.profilePhoto) {
        return false;
    }
    if (!sportCenter?.coordinates?.lng || !sportCenter?.coordinates?.lat) {
        return false;
    }
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