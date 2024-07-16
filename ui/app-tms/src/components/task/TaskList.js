import React, { useEffect, useState } from "react";
import { DataGrid, GridAddIcon } from '@mui/x-data-grid';
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteTask, getAllTasks } from '../../services/TaskService';
import { useNavigate } from "react-router-dom";

const TaskList = () => {

  const navigator = useNavigate();
  console.log("TASK LIST");

  const columns = [
    { field: '#', headerName: '#', width: 70 },
    { field: 'title', headerName: 'title', width: 230 },
    { field: 'description', headerName: 'Description', width: 280 },
    { field: 'dueDate', headerName: 'Due Date', width: 230 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            <EditOutlinedIcon />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteForeverOutlinedIcon />
          </Button>
        </div>
      ),
    }
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getAllTaskList();
  }, []);

  function getAllTaskList() {
    getAllTasks().then((response) => {
      setTableData(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleEdit = (id) => {
    console.log(`Edit row with id: ${id}`);
    navigator(`/add-task/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete row with id: ${id}`);
    //setRows(rows.filter((row) => row.id !== id));
    deleteTask(id).then((response) => {
      getAllTaskList();
    }).catch(error => {
      console.error(error);
    })
  };

  return (
    <>
      <div style={{ height: 700, width: '100%' }}>

        <Grid container justifyContent="center">

          <Grid item xs={10} display="flex" justifyContent="flex-start" sx={{ m: 1 }}>
            <Link href="/add-task" variant="body2">
              <Button variant="contained" startIcon={<GridAddIcon />}>
                Add Task
              </Button>
            </Link>
          </Grid>

          <Grid item xs={10}>
            {tableData.length > 0 ? (
              
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h6" color="textSecondary">
                  No records
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TaskList;
