import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
  const date = new Date();
  let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();
   let assign_date = `${year}-${month}-${day}`;


export default function AddRowDialog() {
  const [open, setOpen] = useState(false);
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
  


  
  const handleClickOpen = () => {
    setOpen(true);
    console.log(assign_date)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3000/auth/empsignup', {
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
        console.log('Data sent successfully');
      })
      .catch((err) => {
        console.error(err);
      });

    window.location.reload(); 
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Please fill the details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update today's status, kindly fill the form below.
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="empId"
                  name="empId"
                  label="Employee ID"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setEmployees_id(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setEmployees_name(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  id="projectTask"
                  name="projectTask"
                  label="Project / Task"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setEmployees_task(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setEmployees_description(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="standard" margin="dense">
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority"
                    value={employees_priority}
                    onChange={(e) => setEmployees_priority(e.target.value)}
                    label="Priority"
                    required
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="standard" margin="dense">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    value={employees_status}
                    onChange={(e) => setEmployees_status(e.target.value)}
                    label="Status"
                    required
                  >
                    <MenuItem value="ToDo">ToDo</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="OnHold">OnHold</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setEmployees_start_date(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="dense"
                  id="endDate"
                  name="endDate"
                  label="End Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setEmployees_end_date(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="remarks"
                  name="remarks"
                  label="Remarks"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setEmployees_remark(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
