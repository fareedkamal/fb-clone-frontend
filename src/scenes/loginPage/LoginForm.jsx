import {TextField,Paper, Button, Typography, Divider } from "@mui/material"
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesLogin = {
    email: "",
    password: "",
};

const LoginForm = ({handleClick}) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginGuest = async () => {
        console.log('sadasdasdas');
        const values = {
            email: process.env.GUEST_EMAIL,
            password: process.env.GUEST_PASSWORD
        }
        const loggedInResponse = await fetch(`${process.env.SERVER_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        const loggedIn = await loggedInResponse.json();
        //onSubmitProps.resetForm();
        if (loggedIn && loggedIn.user) {
            dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        };
    };

    const login = async (values, onSubmitProps) => {
        
        const loggedInResponse = await fetch(`${process.env.SERVER_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn && loggedIn.user) {
            dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        };
    };
    
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);
    }
    
    return (
        <Paper elevation={5}>
            <Formik
                onSubmit = {handleFormSubmit}
                initialValues = {initialValuesLogin}
                validationSchema = {loginSchema}
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
                            gap:"0.8rem",
                            textAlign:"center"
                        }}
                        >    
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
                                type="password"
                                onChange={handleChange}
                                value={values.password}
                                placeholder="Password"
                                name="password"
                                size="small"
                                error = {Boolean(touched.password) && Boolean(errors.password)}
                                helperText = {touched.password && errors.password}   
                            />
                            <Button variant="contained" size="large" type="submit">Log in</Button>
                            <Button variant="contained" size="large" sx={{backgroundColor:"#c59336"}} onClick={loginGuest}>Log in as Guest</Button>
                            <Typography variant="body1" color="#5aa2ff" component="a" href="#">Forgotten password?</Typography>
                            <Divider/>
                            <Button variant="contained"  color="success" size="large" onClick={handleClick} sx={{margin:"1rem 5rem"}}>Register</Button>
                    </form>
                )}
            </Formik>
        </Paper>
  )
}

export default LoginForm