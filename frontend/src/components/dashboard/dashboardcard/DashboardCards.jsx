import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BarChartGraph from '../barchart/BarChartGraph';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RightColumn = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

export default function DashboardCards({click}) {
    // Dummy data for demonstration
    const departments = 1;
    const teamleads = 8;
    const trainers = 'NA';
    const seniorassociates = 'NA';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Item sx={{ p: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                    <Box sx={{ backgroundColor: '#1976d2', p: 1, borderRadius: 1, color: '#ffffff', my: 2 }}>
                                        <AccountBalanceIcon fontSize="large" />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                        <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                            Department
                                        </Typography>
                                        <Typography variant="p" sx={{ fontSize: 36, mb: 0, fontWeight: 'bold' }} gutterBottom>
                                            {departments}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Item sx={{ p: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                    <Box sx={{ backgroundColor: '#1976d2', p: 1, borderRadius: 1, color: '#ffffff', my: 2 }}>
                                        <AccountBalanceIcon fontSize="large" />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                        <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                            Team Leads
                                        </Typography>
                                        <Typography variant="p" sx={{ fontSize: 36, mb: 0, fontWeight: 'bold' }} gutterBottom>
                                            {teamleads}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Item sx={{ p: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                    <Box sx={{ backgroundColor: '#1976d2', p: 1, borderRadius: 1, color: '#ffffff', my: 2 }}>
                                        <AccountBalanceIcon fontSize="large" />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                        <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                            Trainers
                                        </Typography>
                                        <Typography variant="p" sx={{ fontSize: 36, mb: 0, fontWeight: 'bold' }} gutterBottom>
                                            {trainers}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Item sx={{ p: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                    <Box sx={{ backgroundColor: '#1976d2', p: 1, borderRadius: 1, color: '#ffffff', my: 2 }}>
                                        <AccountBalanceIcon fontSize="large" />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                        <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                            Seniors
                                        </Typography>
                                        <Typography variant="p" sx={{ fontSize: 36, mb: 0, fontWeight: 'bold' }} gutterBottom>
                                            {seniorassociates}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <RightColumn item>
                        <Item sx={{ height: '100%' }}>
                            <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                Projects
                            </Typography>
                            <BarChartGraph />
                        </Item>
                    </RightColumn>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={4} md={4}>
                    <Item sx={{ height: '100%', 'padding': '30px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                FrontEnd
                            </Typography>
                            <Button sx={{mt:1}} variant="contained"  onClick={()=>click('Send email')}>View Details</Button>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Item sx={{ height: '100%', 'padding': '30px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                BackEnd
                            </Typography>
                            <Button sx={{mt:1}} variant="contained" disabled>View Details</Button>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Item sx={{ height: '100%', 'padding': '30px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Typography variant="p" sx={{ fontSize: 22, fontWeight: 'bold', mb: 0 }} gutterBottom>
                                Testing
                            </Typography>
                            <Button sx={{mt:1}} variant="contained" disabled>View Details</Button>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
