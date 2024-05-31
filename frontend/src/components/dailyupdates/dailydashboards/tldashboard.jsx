import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, IconButton , TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack , ArrowForward, CookieSharp } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { viewEmployee } from '../../../redux/employeeSlice';
import LeadCard from './LeadCard';
import './tldashboard.css';
import { format } from 'date-fns';
// Function to format date
const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy');
};
const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so adding 1
const year = date.getFullYear();
const todayDate = `${day}-${month}-${year}`;



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function TLdashboard() {

  const [data, setData] = useState([]);
  const [edata, setEdata] = useState([]);
  const [filterdata, setFilterdata] = useState();
  const [newdata, setNewdata] = useState();
  const [updatedata, setUpdateddata] = useState();
  const [tlname , setTlname]= useState('All TL And Manager');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate for navigation
  document.documentElement.scrollTop = 0
  useEffect(() => {
    axios.get('http://localhost:3000/showdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleGet = (eid , ename) => {
    axios.get('http://localhost:3000/auth/emplogin')
      .then(response => {
        const dataFilter = response.data.filter(item => item.employees_reported_to_id === eid);
        setNewdata(dataFilter);
        const newFilter = dataFilter.filter(item => formatDate(item.assign_date) === todayDate);
        setEdata(newFilter);
        setTlname(ename.name)
        // setTlname()
      })
      .catch(error => {
        console.log(error);
      });
    document.body.classList.add('showTable');
  };

  const handleBackClick = () => {
    document.body.classList.remove('showTable');
    document.querySelector('.main__table').style.display = "block";
    document.querySelector('.filter__table').style.display = "none";
    setTlname('All TL And Manager')
  };


  const filterData = () =>{
    const selectedDate = new Date(filterdata)
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${ selectedDate.getFullYear()}`;
    const startdataFilter = newdata.filter(item => formatDate(item.assign_date) === formattedDate );
    setUpdateddata(startdataFilter )
   document.querySelector('.main__table').style.display = "none";
   document.querySelector('.filter__table').style.display = "block";
  }

  console.log(edata.length)

  return (
    <Box sx={{ flexGrow: 1 }} classList="lead-list-container"  >
      <h2 mb={2} style={{textTransform: 'capitalize'}}>{tlname}</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Item className='leads-list'>
            <Box className="leads-container">
              {data.map((entry) => (
                <LeadCard key={entry.employee_id} data={entry} function={() => handleGet(entry.employee_id , entry)} />
              ))}
            </Box>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Item className='project-details' sx={{ height: '90vh', display:'none' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton onClick={handleBackClick}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ml:2}}>
                Project Details
              </Typography>
            </Box>
            {/* filter Data */}
            <Box display="flex" alignItems="center" mb={2}>
            <TextField label="Previous Date"  type="date"   InputLabelProps={{   shrink: true,  }}  sx={{ ml: 2 }} onChange={(e)=>setFilterdata(e.target.value)}  />
              <IconButton onClick={filterData}>
                <ArrowForward />
              </IconButton>
            </Box>
            {/* end filter */}
            <TableContainer component={Paper} className='main__table'>
            <Typography component='p' padding='10px'  fontWeight='400' fontSize="24px" textAlign='left'> Today Data  </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Status / Project</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {edata.length > 0 ? (
                    edata.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.employees_id}</TableCell>
                        <TableCell>{entry.employees_name}</TableCell>
                        <TableCell>{entry.employees_task}</TableCell>
                        <TableCell>{entry.employees_status}</TableCell>
                        <TableCell>{entry.employees_priority}</TableCell>
                        <TableCell>{entry.employees_description}</TableCell>
                        <TableCell>{formatDate(entry.employees_start_date)}</TableCell>
                        <TableCell>{formatDate(entry.employees_end_date)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Typography component='p' padding='30px' fontWeight='400' fontSize="24px">
                          No Record Found !
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>




             <TableContainer component={Paper}  className='filter__table' sx={{display:'none' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                  updatedata?.length > 0 ? (
                    updatedata?.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.employees_id}</TableCell>
                        <TableCell>{entry.employees_name}</TableCell>
                        <TableCell>{entry.employees_task}</TableCell>
                        <TableCell>{entry.employees_status}</TableCell>
                        <TableCell>{entry.employees_priority}</TableCell>
                        <TableCell>{entry.employees_description}</TableCell>
                        <TableCell>{formatDate(entry.employees_start_date)}</TableCell>
                        <TableCell>{formatDate(entry.employees_end_date)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Typography component='p' padding='30px' fontWeight='400' fontSize="24px">
                          No Record Found !
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TLdashboard;
