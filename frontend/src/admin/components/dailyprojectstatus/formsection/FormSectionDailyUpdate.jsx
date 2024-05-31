import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormSectionDailyUpdate() {
    return (
        <Box
            component="form"
            sx={{
                p:2,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                '& .MuiTextField-root': { 
                    width: '100%',
                },
                '@media (min-width:600px)': {
                    flexDirection: 'row',
                    '& .MuiTextField-root': {
                        width: 'calc(50% - 16px)',
                    },
                },
                '@media (min-width:960px)': {
                    '& .MuiTextField-root': {
                        width: 'calc(33.33% - 16px)',
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                disabled
                id="emp-id"
                label="Employee ID"
                value={localStorage.getItem("employee_id")}
            />
            <TextField
                disabled
                id="designation"
                label="Designation"
                value={localStorage.getItem("designation")}
            />
            <TextField
                disabled
                id="irp"
                label="Reporting Person"
                value={localStorage.getItem("reporting_to")}
            />
            <TextField
                disabled
                id="reportees"
                label="Reportees"
                value={localStorage.getItem("reporting_to_id")}
            />
        </Box>
    );
}
