import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ExitToApp, Menu } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../App.css';
import { AddItemForm } from '../components/AddItemForm';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { TodoList } from '../components/TodoList';
import { TaskStatuses } from '../dal-api/todolist-api';
import { AppInitialStateType } from '../state/app-reducer/app-reducer';
import { logoutTC } from '../state/auth-reducer/auth-reducer';
import { AppRootStateType } from '../state/store';
import { addTaskTC, removeTaskTC, updateTaskTC } from '../state/tasks-reducer/tasks-reducer';
import {
    addTodolistTC,
    changeFilterTodolistAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../state/todolists-reducer/todolists-reducer';

export function TodolistsList() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) dispatch(fetchTodolistsTC())
    }, []);

    const app = useSelector<AppRootStateType, AppInitialStateType>(state => state.app);
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
    const dispatch = useDispatch();

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const removeToDoList = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])
    const changeTitleTodolist = useCallback((id: string, title: string) => {
        dispatch(changeTitleTodolistTC(id, title))
    }, [dispatch])
    const changeFilterTodolist = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(id, filter))
    }, [dispatch])

    const addTask = useCallback((id: string, newTitle: string) => {
        dispatch(addTaskTC(id, newTitle))
    }, [dispatch])
    const removeTask = useCallback((id: string, taskId: string) => {
        dispatch(removeTaskTC(id, taskId))
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(id, taskId, { title }))
    }, [dispatch])
    const changeTaskStatus = useCallback((id: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(id, taskId, { status }))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className="App">

            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            Todolist
                        </Typography>
                        <IconButton onClick={() => dispatch(logoutTC())} >
                            <ExitToApp />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>

            <Container fixed>
                {app.status === 'loading' && <CircularProgress />}

                <Grid container style={ {padding: '10px'} }>
                    <AddItemForm addItem={addTodoList} disabled={app.status === 'loading'} />
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return (<Grid item xs={6} sm={3} >
                            <Paper style={ {padding: '10px'} }>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    entityStatus={app.status}
                                    removeToDoList={removeToDoList}
                                    changeTitleTodolist={changeTitleTodolist}
                                    changeFilterTodolist={changeFilterTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTaskStatus={changeTaskStatus}
                                />
                            </Paper>
                        </Grid>)
                    })}
                </Grid>

                <ErrorSnackbar />
            </Container>
        </div>
    )
}






