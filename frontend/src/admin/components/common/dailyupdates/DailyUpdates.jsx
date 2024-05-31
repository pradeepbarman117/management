import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: '#ffffff',
}));

const curr_projetcs = 1;

export default function BasicGrid() {
    const [dateTime, setDateTime] = React.useState(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item sx={{ backgroundColor: '#28cc3a' }}>
                            <Typography variant="h6">
                                Date and Time
                            </Typography>
                            <Divider orientation="horizontal" variant="left" sx={{ my: 2, backgroundColor: '#ffffff' }} flexItem />
                            <Typography variant="h5" fontWeight='bold' textAlign='right'>
                                {dateTime.toLocaleString()}
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item sx={{ backgroundColor: '#8832ff' }}>
                            <Typography variant="h6">
                                Today's Status
                            </Typography>
                            <Divider orientation="horizontal" variant="left" sx={{ my: 2, backgroundColor: '#ffffff' }} flexItem />
                            <Typography variant="h5" fontWeight='bold' textAlign='right'>
                                UPDATED
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item sx={{ backgroundColor: '#ff6632' }}>
                            <Typography variant="h6">
                                Monthly Status
                            </Typography>
                            <Divider orientation="horizontal" variant="left" sx={{ my: 2, backgroundColor: '#ffffff' }} flexItem />
                            <Typography variant="h5" fontWeight='bold' textAlign='right'>
                                UPDATED
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item sx={{ backgroundColor: '#33bfff' }}>
                            <Typography variant="h6">
                                Current Projects
                            </Typography>
                            <Divider orientation="horizontal" variant="left" sx={{ my: 2, backgroundColor: '#ffffff' }} flexItem />
                            <Typography variant="h5" fontWeight='bold' textAlign='right'>
                                {curr_projetcs}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
