import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { Container, Box, TextField, Button, Typography, MenuItem, CssBaseline, Paper, Grid } from '@mui/material';

const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
};

export default function EditRowDialog() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employees_id, setEmployees_id] = useState('');
    const [employees_name, setEmployees_name] = useState('');
    const [employees_start_date, setEmployees_start_date] = useState('');
    const [employees_end_date, setEmployees_end_date] = useState('');
    const [employees_task, setEmployees_task] = useState('');
    const [employees_status, setEmployees_status] = useState('');
    const [employees_priority, setEmployees_priority] = useState('');
    const [employees_description, setEmployees_description] = useState('');
    const [employees_remark, setEmployees_remark] = useState('');
    const employees_reported_to = localStorage.getItem('name');
    const employees_reported_to_id = localStorage.getItem('employee_id');
    const date = new Date();
    let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();
   let assign_date = `${year}-${month}-${day}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3000/auth/editempdet/` + id, {
            employees_id,
            employees_name,
            employees_start_date,
            employees_end_date,
            employees_task,
            employees_status,
            employees_priority,
            employees_description,
            employees_reported_to,
            employees_reported_to_id,
            employees_remark,
            assign_date
        })
            .then((res) => {
                console.log("Data updated successfully", res.data);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error("Error updating data:", err);
            });
    };

    const loadData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/loademployeedetails', { id });
            const data = response.data;
            setEmployees_id(data.employees_id);
            setEmployees_name(data.employees_name);
            setEmployees_start_date(formatDate(data.employees_start_date));
            setEmployees_end_date(formatDate(data.employees_end_date));
            setEmployees_task(data.employees_task);
            setEmployees_status(data.employees_status);
            setEmployees_priority(data.employees_priority);
            setEmployees_description(data.employees_description);
            setEmployees_remark(data.employees_remark);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center">
                        Edit Employee Details
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="empId"
                                    required
                                    fullWidth
                                    id="empId"
                                    label="Employee ID"
                                    value={employees_id}
                                    onChange={(e) => setEmployees_id(e.target.value)}
                                    autoFocus
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={employees_name}
                                    onChange={(e) => setEmployees_name(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                  <TextField
                                    select
                                    name="projectTask"
                                    required
                                    fullWidth
                                    id="projectTask"
                                    label="Project / Task"
                                    value={employees_task}
                                    onChange={(e) => setEmployees_task(e.target.value)}
                                    margin="normal"
                                >
                                    <MenuItem value="High">1xbet</MenuItem>
                                    <MenuItem value="Medium">Zlaata</MenuItem>
                                    <MenuItem value="Low">khelostar</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    value={employees_description}
                                    onChange={(e) => setEmployees_description(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    name="priority"
                                    required
                                    fullWidth
                                    id="priority"
                                    label="Priority"
                                    value={employees_priority}
                                    onChange={(e) => setEmployees_priority(e.target.value)}
                                    margin="normal"
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    name="status"
                                    required
                                    fullWidth
                                    id="status"
                                    label="Status"
                                    value={employees_status}
                                    onChange={(e) => setEmployees_status(e.target.value)}
                                    margin="normal"
                                >
                                    <MenuItem value="ToDo">ToDo</MenuItem>
                                    <MenuItem value="InProgress">InProgress</MenuItem>
                                    <MenuItem value="OnHold">OnHold</MenuItem>
                                    <MenuItem value="Done">Done</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="startDate"
                                    required
                                    fullWidth
                                    id="startDate"
                                    label="Start Date"
                                    type="date"
                                    value={employees_start_date}
                                    onChange={(e) => setEmployees_start_date(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="endDate"
                                    required
                                    fullWidth
                                    id="endDate"
                                    label="End Date"
                                    type="date"
                                    value={employees_end_date}
                                    onChange={(e) => setEmployees_end_date(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="remarks"
                                    fullWidth
                                    id="remarks"
                                    label="Remarks"
                                    value={employees_remark}
                                    onChange={(e) => setEmployees_remark(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
