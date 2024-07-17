import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stack, Select, MenuItem, InputLabel, FormControl, InputAdornment, OutlinedInput, Grid, FormHelperText } from '@mui/material';
import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, saveTask } from '../../services/TaskService';
import { validateForm } from '../../services/UtilService';

const TaskFormV2 = () => {

    const navigator = useNavigate();
    const [errors, setErrors] = useState({});
    const { id } = useParams();

    const [taskInputs, setTaskInputs] = useState({
        //id: null,
        title: "",
        description: "",
        dueDate: '',
        status: ""
    });

    const statusType = [
        {
            value: 'PENDING',
            label: 'Pending',
        },
        {
            value: 'IN_PROGRESS',
            label: 'In Progress',
        },
        {
            value: 'COMPLETED',
            label: 'Completed',
        }
    ];

    function makePageTitle() {
        var pageTitle = "Save Task";
        if (id) {
            pageTitle = "Update Task";
        }
        return pageTitle;
    }

    useEffect(() => {
        if (id) {
            debugger;
            getTask(id).then((response) => {
                //console.log(response.data);
                setTaskInputs(response.data);
                console.log("getTask");
                console.log(taskInputs);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setTaskInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: ''
        }));
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        debugger;
        console.log(taskInputs);

        setErrors({});
        const formErrors = validateForm(taskInputs);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        debugger;
        saveTask(taskInputs).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        });

        navigator("/view-task");
    };

    return (
        <React.Fragment>
            <Container maxWidth="md">

                <Grid container justifyContent="center" sx={{ m: 2 }}>
                    <Grid item xs={5} display="flex" justifyContent="flex-start">
                        <Link href="/view-task" variant="body2">
                            <Button variant="contained" startIcon={<ArrowBackIcon />}>
                                View Task
                            </Button>
                        </Link>
                    </Grid>

                    <Grid item xs={7} display="flex" justifyContent="flex-start">
                        <Button variant="outlined">
                            {makePageTitle()} Form
                        </Button>
                    </Grid>
                </Grid>

                <form onSubmit={handleTaskSubmit} >
                    <Stack spacing={2} direction="column" sx={{ marginBottom: 2 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            label="Title"
                            name="title"
                            value={taskInputs.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            name="description"
                            value={taskInputs.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            multiline
                            rows={4}
                        />

                        <FormControl fullWidth >
                            <OutlinedInput
                                type="date"
                                name="dueDate"
                                value={taskInputs.dueDate}
                                onChange={handleChange}
                                error={!!errors.dueDate}
                                startAdornment={<InputAdornment position="start">Due Date :: </InputAdornment>}
                                fullWidth
                            />
                            {!!errors.dueDate && <FormHelperText error>{errors.dueDate}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="menu">Status</InputLabel>
                            <Select
                                label="Status"
                                value={taskInputs.status}
                                onChange={handleChange}
                                name="status"
                                error={!!errors.status}
                                fullWidth
                            >
                                {statusType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {!!errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth>
                            <Button variant="contained" color="primary" type="submit">{makePageTitle()}</Button>
                        </FormControl>
                    </Stack>
                </form>
            </Container>

        </React.Fragment>
    )
}

export default TaskFormV2;