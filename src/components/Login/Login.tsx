import { Button, Checkbox, Container, Grid, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginTC } from '../../state/auth-reducer/auth-reducer';
import { AppRootStateType } from '../../state/store';
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if (!values.password) {
                errors.password = 'Required password'
            } else if (values.password.length <= 4) {
                errors.password = 'Short password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'} />
    }
    
    return <div>
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: "center" }} >
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                            target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </div>
                <div>
                    <Grid container style={{ padding: '10px' }}>
                        <TextField
                            variant={'outlined'}
                            label={'Email'}
                            type="text"
                            id="text"
                            {...formik.getFieldProps('email')}
                        />
                    </Grid>
                    <Grid container style={{ padding: '10px' }}>
                        <TextField
                            variant={'outlined'}
                            label={'Password'}
                            type="password"
                            id="password"
                            {...formik.getFieldProps('password')}
                        />
                    </Grid>
                    <Grid container style={{ paddingLeft: '10px' }}>
                        <FormControl>
                            <FormControlLabel
                                value="rememberMe"
                                control={
                                    <Checkbox color="primary" id="checkbox"
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }
                                label="Remember me"
                                labelPlacement="end"
                            />
                        </FormControl>
                    </Grid>
                    <Grid container style={{ padding: '10px' }}>
                        <Button type={'submit'} variant='contained' color='primary' >
                            Log In
                        </Button>
                    </Grid>

                    {formik.touched.email &&
                        formik.errors.email
                        ? <div style={{ color: 'red' }}>{formik.errors.email}</div>
                        : null
                    }

                    {formik.touched.password &&
                        formik.errors.password
                        ? <div style={{ color: 'red' }}>{formik.errors.password}</div>
                        : null
                    }
                </div>
            </form>
            <ErrorSnackbar />
        </Container>
    </div >
}
