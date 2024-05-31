import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormSectionDailyUpdate from '../../components/dailyprojectstatus/formsection/FormSectionDailyUpdate';
import DailyUpdateDetails from '../../components/dailyprojectstatus/dailyupdatedetails/DailyUpdateDetails';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const data = [
    {
        empId: '001',
        name: 'John Doe',
        projectTask: 'Project A',
        description: 'Worked on Project A tasks',
        priority: 'High',
        status: 'In Progress',
        remarks: 'Needs review',
        startDate: '2024-05-01',
        endDate: '2024-05-15'
    },
    {
        empId: '002',
        name: 'Jane Smith',
        projectTask: 'Project B',
        description: 'Completed Project B tasks',
        priority: 'Medium',
        status: 'Completed',
        remarks: 'No issues',
        startDate: '2024-05-10',
        endDate: '2024-05-25'
    },
    // Add more data as needed
];

export default function DailyProjectStatus() {
  return (
    <Box sx={{ flexGrow: 1, px:3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <FormSectionDailyUpdate/>
          </Item>
          <Item sx={{mt:3}}>
            <DailyUpdateDetails data={data}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
