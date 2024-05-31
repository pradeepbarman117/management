import React, { useState, useEffect,createContext } from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Box } from '@mui/material';
import { AddCircleOutlineOutlined, DeleteOutlineOutlined, EditOutlined, SaveOutlined, CancelOutlined,ArrowForward } from '@mui/icons-material';
import './dailyupdatedetails.css';
import AddRowDialog from '../addrowdialog/AddRowDialog';
import EditRowDialog from '../editrowdialog/EditRowDialog';
import { format } from 'date-fns';
const EmployeeContext = createContext();
// Function to format date
const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy');
};
const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so adding 1
const year = date.getFullYear();
const todayDate = `${day}-${month}-${year}`;



const DailyUpdateDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editedData, setEditedDatas] = useState({});
    const [eds, setEds] = useState({});
    const [filterdata, setFilterdata] = useState();


    useEffect(() => {
        axios.get('http://localhost:3000/auth/emplogin')
            .then(response => {
                setLoading(false);
                const filteredData = response.data.filter(item => item.employees_reported_to_id === localStorage.getItem('employee_id'));
                if (filteredData.length > 0) {
                    setEds(filteredData);
                    const newFilter = filteredData.filter(item => formatDate(item.assign_date) === todayDate);
                    console.log(newFilter)
                    setData(newFilter);



                } else {
                    console.log("Data Not Found");
                }
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

   

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/auth/empdelete/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("There was an error deleting the employee!", error);
        }
    };


  const filterData = () =>{
    const selectedDate = new Date(filterdata)
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${ selectedDate.getFullYear()}`;
    const startdataFilter = eds.filter(item => formatDate(item.assign_date) === formattedDate );
    // console.log(startdataFilter)
    // console.log(startdataFilter.length)
    if(startdataFilter.length >0){
        setData(startdataFilter)
    }
    else{
        setData(startdataFilter)
        alert("No Record Found!!")
    }
  }


    return (
        <>
           <Box display="flex" alignItems="center" my={2}>
            <TextField label="Previous Date"  type="date"   InputLabelProps={{   shrink: true,  }}  sx={{ ml: 2 }} onChange={(e)=>setFilterdata(e.target.value)}  />
              <IconButton onClick={filterData}>
                <ArrowForward />
              </IconButton>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '100px' }}>EmpID</TableCell>
                            <TableCell sx={{ width: '150px' }}>Name</TableCell>
                            <TableCell sx={{ width: '150px' }}>Project / Task</TableCell>
                            <TableCell sx={{ width: '300px' }}>Description</TableCell>
                            <TableCell sx={{ width: '100px' }}>Priority</TableCell>
                            <TableCell sx={{ width: '110px' }}>Status</TableCell>
                            <TableCell sx={{ width: '110px' }}>Start Date</TableCell>
                            <TableCell sx={{ width: '110px' }}>End Date</TableCell>
                            <TableCell sx={{ width: '150px' }}>Remarks</TableCell>
                            <TableCell sx={{ width: '100px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10}>Loading...</TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={10}>Error: {error.message}</TableCell>
                            </TableRow>
                        ) : data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{textTransform:'uppercase'}}>{editedData.id === row.id ? (
                                    <TextField value={editedData.empId} onChange={(e) => handleChange(e, 'empId')} />
                                ) : row.employees_id}</TableCell>
                                <TableCell sx={{textTransform:'capitalize'}}>{editedData.id === row.id ? (
                                    <TextField value={editedData.name} onChange={(e) => handleChange(e, 'name')} />
                                ) : row.employees_name}</TableCell>
                                <TableCell sx={{textTransform:'capitalize'}}>{editedData.id === row.id ? (
                                    <TextField value={editedData.projectTask} onChange={(e) => handleChange(e, 'projectTask')} />
                                ) : row.employees_task}</TableCell>
                                <TableCell>{editedData.id === row.id ? (
                                    <TextField value={editedData.description} onChange={(e) => handleChange(e, 'description')} />
                                ) : row.employees_description}</TableCell>
                                <TableCell>{editedData.id === row.id ? (
                                    <TextField value={editedData.priority} onChange={(e) => handleChange(e, 'priority')} />
                                ) : row.employees_priority}</TableCell>
                                <TableCell>{editedData.id === row.id ? (
                                    <TextField value={editedData.status} onChange={(e) => handleChange(e, 'status')} />
                                ) : row.employees_status}</TableCell>
                                <TableCell>
                                    {editedData.id === row.id ? (
                                        <TextField value={editedData.startDate} onChange={(e) => handleChange(e, 'startDate')} />
                                    ) : formatDate(row.employees_start_date)}
                                </TableCell>
                                <TableCell>
                                    {editedData.id === row.id ? (
                                        <TextField value={editedData.endDate} onChange={(e) => handleChange(e, 'endDate')} />
                                    ) : formatDate(row.employees_end_date)}
                                </TableCell>
                                <TableCell>{editedData.id === row.id ? (
                                    <TextField value={editedData.remarks} onChange={(e) => handleChange(e, 'remarks')} />
                                ) : row.employees_remark}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {/* <EditRowDialog data={{ ...row }} */}
                                        <Link to={`/dashboard/update/${row.id}`}>
                                            <IconButton><EditOutlined /></IconButton>
                                        </Link>
                                        {/* /> */}
                                        <IconButton onClick={(e) => handleDelete(row.id)}><DeleteOutlineOutlined /></IconButton>

                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                     
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3, mb: 2 }}>
                <AddRowDialog />
            </Box>
        </>
    );
};

export default DailyUpdateDetails;
