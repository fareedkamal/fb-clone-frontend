import { Close, Help } from "@mui/icons-material"
import {TextField,Box,Paper, Button, IconButton, Typography, Divider } from "@mui/material"
import { Stack } from "@mui/system"
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    dob: yup.string().required("required"),
});

const initialValuesRegister = {
firstName: "",
lastName: "",
email: "",
password: "",
dob: ""
};

const RegisterForm = ({handleClick}) => {

    const register = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        
        const savedUserResponse = await fetch(
          `${process.env.SERVER_URL}/auth/register`,
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
          handleClick()
        }
    }
    
    const handleFormSubmit = async (values, onSubmitProps) => {
        await register(values, onSubmitProps);
    }

    return (
        <Paper elevation={20} sx={{position:"absolute",top:"6rem"}}>
            <Formik
                onSubmit = {handleFormSubmit}
                initialValues = {initialValuesRegister}
                validationSchema = {registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) =>(
                    <form
                        onSubmit={handleSubmit}
                        style={{
                        width:"400px",
                        display:"flex",
                        flexDirection:"column",
                        padding:"1rem",
                        gap:"0.7rem"
                    }}>
                        <IconButton onClick={handleClick} sx={{position:"absolute",right:"0",top:"0"}}>
                            <Close/>
                        </IconButton>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">Sign Up</Typography>
                            <Typography variant="body1" color="grey">It's quick and easy.</Typography>
                        </Box>
                        <Divider/>
                        <Stack spacing={2} direction="row">
                            <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                placeholder="First name"
                                name="firstName"
                                size="small"
                                error = {Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText = {touched.firstName && errors.firstName}   
                            />
                            <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                placeholder="Surname"
                                name="lastName"
                                size="small"
                                error = {Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText = {touched.lastName && errors.lastName}   
                            />                      
                        </Stack>
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            placeholder="Email"
                            name="email"
                            size="small"
                            error = {Boolean(touched.email) && Boolean(errors.email)}
                            helperText = {touched.email && errors.email}   
                        />
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.password}
                            placeholder="Password"
                            name="password"
                            size="small"
                            error = {Boolean(touched.password) && Boolean(errors.password)}
                            helperText = {touched.password && errors.password}   
                        />
                        <Typography variant="body2">Date of birth  <Help fontSize="10px"/> </Typography>
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.dob}
                            placeholder="1 Jan 2023"
                            name="dob"
                            size="small"
                            error = {Boolean(touched.dob) && Boolean(errors.dob)}
                            helperText = {touched.dob && errors.dob}   
                        />
                        <Button variant="contained" color="success" size="large" type="submit" >Register</Button>
                    </form>
                )}
            </Formik>
        </Paper>
        
  )
}

export default RegisterForm