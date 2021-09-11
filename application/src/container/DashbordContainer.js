import React from 'react';
import Container from '@material-ui/core/Container'

const DashboardContainer = ({ children }) => (
    <Container fixed>
        {children}
    </Container>
);

export default DashboardContainer;