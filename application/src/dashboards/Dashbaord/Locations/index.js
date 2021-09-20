import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllLocations, addLocation, deleteLocation } from '../../../redux/actions/locations';

import withNavigationContainer from '../withNavigationContainer';

const Locations = ({ getAllLocations, addLocation, locations, deleteLocation }) => {
    const [newLocation, setNewLocation] = useState('');

    useEffect(() => {
        getAllLocations();
    }, [])

    const renderAllLocations = () => {
        return (
            <ul>
                {locations.map((location) => <li key={location.name}>{location.name}<button type="button" onClick={() => deleteLocation(location.name)}>Delete</button></li>)}
            </ul>
        );
    }

    return (
        <div>
            <h2>Locations</h2>
            <div>
                {renderAllLocations()}
            </div>
            <div>
                <input type="text" value={newLocation} onChange={(event) => setNewLocation(event.target.value)} />
                <button
                 type="button"
                 onClick={() => {
                    if (newLocation !== '') {
                        addLocation(newLocation);
                        setNewLocation('');
                    }
                }}
                 disabled={locations.find((location) => location.name === newLocation) !== undefined}
                >
                    Add Location
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    locations: state.locations
});

export default connect(
    mapStateToProps,
    {
        getAllLocations,
        addLocation,
        deleteLocation
    }
)(withNavigationContainer(Locations));
