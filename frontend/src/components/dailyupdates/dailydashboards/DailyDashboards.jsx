import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid ,TextField,IconButton , Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack , ArrowForward, CookieSharp } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';

const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy');
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const TodayProjectStatus = () => {
    const [edata, setEdata] = useState([]);
    const[filteremp , setFilteremp] = useState()
    const[filteremp2 , setFilteremp2] = useState()
    const[filteremp3 , setFilteremp3] = useState()
    const[filterempdata , setEmpfilterdata] = useState()
    const[filtertldata , setTlfilterdata] = useState()
    const[filterproject , setProfilterdata] = useState()

    const[showfilter , setShowfilter] = useState()
    useEffect(() => {
        // Fetch data from API or JSON file
        axios.get('http://localhost:3000/auth/emplogin')  
            .then(response => {
                setEdata(response.data.reverse());
                
                // for filter
                const filter_data = response.data.map(item => ({
                     name: item.employees_name, tlname: item.employees_reported_to, project: item.employees_task  
                 }));
                 
                 const uniqueOptions = filter_data.filter((item, index, self) =>
                    index === self.findIndex(t => (t.name === item.name ))
                  );
                  const uniqueOptions2 = filter_data.filter((item, index, self) =>
                    index === self.findIndex(t => (t.tlname === item.tlname))
                  );
                  const uniqueOptions3 = filter_data.filter((item, index, self) =>
                    index === self.findIndex(t => (t.project === item.project))
                  );
                
                 setFilteremp(uniqueOptions)
                 setFilteremp2(uniqueOptions2)
                 setFilteremp3(uniqueOptions3)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);
    



    
  const getEmployee = () =>{
    const FilterData = edata.filter((item)=>item.employees_name === filterempdata)
    setShowfilter(FilterData)
    document.querySelector('.__filterData').style.display = "block";
    document.querySelector('.__actualData').style.display = "none";
  }
  const getTl = () =>{
    const FilterData = edata.filter((item)=>item.employees_reported_to === filtertldata)
    setShowfilter(FilterData)
    document.querySelector('.__filterData').style.display = "block";
    document.querySelector('.__actualData').style.display = "none";
  }

  const getProject = () =>{
    const FilterData = edata.filter((item)=>item.employees_task === filterproject)
    setShowfilter(FilterData)
    document.querySelector('.__filterData').style.display = "block";
    document.querySelector('.__actualData').style.display = "none";
  }
  
  
   
    return (
        <Box sx={{ flexGrow: 1 }}>
             <h2>All Employees List</h2>
             <div className="Filter__Data" >


            <div className="__first_filter_data">
             <Autocomplete   disablePortal  id="combo-box-demo"   options={filteremp}
                getOptionLabel={(option) => option.name}    sx={{ width: 250 }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search Here by Name"
                    onChange={(e) => setEmpfilterdata(e.target.value)}  
                    />
                )}
                onChange={(e, selectedOption) => {
                    if (selectedOption) {
                        setEmpfilterdata(selectedOption.name);
                    } else {
                        setEmpfilterdata("");
                    }
                }}
              />
               <IconButton  onClick={getEmployee}>
                <ArrowForward />
              </IconButton>
              </div>
              <div className="__second_filter_data">
             <Autocomplete  disablePortal  id="combo-box-demo" options={filteremp2}
                getOptionLabel={(option) => option.tlname}   sx={{ width: 250 }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search Here by TL"
                    onChange={(e) => setTlfilterdata(e.target.value)}  
                    />
                )}
                onChange={(e, selectedOption) => {
                    if (selectedOption) {
                        setTlfilterdata(selectedOption.tlname);
                    } else {
                        setTlfilterdata("");
                    }
                }}
           />
            <IconButton onClick={getTl} >
                <ArrowForward />
              </IconButton>
           </div>

           <div className="__third_filter_data">
             <Autocomplete  disablePortal  id="combo-box-demo" options={filteremp3}
                getOptionLabel={(option) => option.project}   sx={{ width: 250 }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search Here by Project"
                    onChange={(e) => setProfilterdata(e.target.value)}  
                    />
                )}
                onChange={(e, selectedOption) => {
                    if (selectedOption) {
                        setProfilterdata(selectedOption.project);
                    } else {
                        setProfilterdata("");
                    }
                }}
           />
            <IconButton onClick={getProject} >
                <ArrowForward />
              </IconButton>
           </div>
            
        

             </div>
             <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item className='__actualData'>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Project / Task</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>ETA</TableCell>
                                        <TableCell>Reported To</TableCell>
                                        <TableCell>Reported To ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    
                                    edata.map((entry) => (
                                        <TableRow key={entry.id}>
                                            <TableCell sx={{textTransform:'uppercase'}}>{entry.employees_id}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_name}</TableCell>
                                            <TableCell>{entry.employees_description}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_task}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_status}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_priority}</TableCell>
                                            <TableCell>{formatDate(entry.employees_start_date)}</TableCell>
                                            <TableCell>{formatDate(entry.employees_end_date)}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_reported_to}</TableCell>
                                            <TableCell sx={{textTransform:'uppercase'}}>{entry.employees_reported_to_id}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>

                    <Item className='__filterData'  sx={{display:'none' }}>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Project / Task</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>ETA</TableCell>
                                        <TableCell>Reported To</TableCell>
                                        <TableCell>Reported To ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    showfilter?.length > 0 ?
                                    showfilter?.map((entry) => (
                                        <TableRow key={entry.id}>
                                            <TableCell sx={{textTransform:'uppercase'}}>{entry.employees_id}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_name}</TableCell>
                                            <TableCell>{entry.employees_description}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_task}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_status}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_priority}</TableCell>
                                            <TableCell>{formatDate(entry.employees_start_date)}</TableCell>
                                            <TableCell>{formatDate(entry.employees_end_date)}</TableCell>
                                            <TableCell sx={{textTransform:'capitalize'}}>{entry.employees_reported_to}</TableCell>
                                            <TableCell sx={{textTransform:'uppercase'}}>{entry.employees_reported_to_id}</TableCell>
                                        </TableRow>
                                    )):
                                    <TableRow>
                                    <TableCell colSpan={8}>
                                        <Typography component='p' padding='30px' fontWeight='400' fontSize="24px">
                                        No Record Found !
                                        </Typography>
                                    </TableCell>
                                    </TableRow>
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

export default TodayProjectStatus;
