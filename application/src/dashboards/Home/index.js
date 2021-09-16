import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <input
        type="text"
        onChange={(event) => {
            const value = event.target.value;
            setTimeout(
                () => console.log(value),
                 1500
            )
        }}
    />
);

export default Home;
