import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllSports, addSport, deleteSport } from '../../../redux/actions/sports';

import withNavigationContainer from '../withNavigationContainer';

const Sports = ({ getAllSports, addSport, sports, deleteSport }) => {
    const [newSport, setNewSport] = useState('');

    useEffect(() => {
        getAllSports();
    }, [])

    const renderAllSports = () => {
        return (
            <ul>
                {sports.map((sport) => <li key={sport.name}>{sport.name}<button type="button" onClick={() => deleteSport(sport.name)}>Delete</button></li>)}
            </ul>
        );
    }

    return (
        <div>
            <h2>Sports</h2>
            <div>
                {renderAllSports()}
            </div>
            <div>
                <input type="text" value={newSport} onChange={(event) => setNewSport(event.target.value)} />
                <button
                 type="button"
                 onClick={() => {
                    if (newSport !== '') {
                        addSport(newSport);
                        setNewSport('');
                    }
                }}
                 disabled={sports.find((sport) => sport.name === newSport) !== undefined}
                >
                    Add Sport
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    sports: state.sports
});

export default connect(
    mapStateToProps,
    {
        getAllSports,
        addSport,
        deleteSport
    }
)(withNavigationContainer(Sports));
