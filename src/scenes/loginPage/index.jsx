import {Box,Typography,useMediaQuery} from '@mui/material'
import fbLogo from '@/assets/fbLogo.svg'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useState } from 'react'
import Footer from '../../components/Footer'


const LoginPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const [isRegisterClicked,setRegisterClicked]=useState(false)
    const openRegisterForm=()=>{
        setRegisterClicked(!isRegisterClicked)
    }

    return(
        <Box 
            width="100%"
            height="100%"
            backgroundColor="#f0f2f5"
            display="flex"
            justifyContent="center"
            overflow="auto"
        >
            <Box 
                alignItems="center"
                padding="8rem 0"
                width={isNonMobileScreens? "1000px":"min-content"}
                height="fit-content"
                display="flex"
                flexDirection={isNonMobileScreens? "row":"column"}
                gap="2rem" >
                <Box sx={isNonMobileScreens? null : {
                    display:"flex",
                    flexDirection:"column",
                    textAlign:"center"
                } }>
                    <img src={fbLogo} height="100px"/>
                    <Typography variant="h5">
                        Facebook Clone helps you diconnect from real world and stalk people all around the world.
                    </Typography>
                </Box>
                <LoginForm handleClick={openRegisterForm}/>
            </Box>
            {isRegisterClicked && <div style={{
                display:"flex",
                justifyContent:"center",
                overflow:"auto",
                position:"absolute",
                width:"100%",
                height:"100%",
                backgroundColor:"#ffffff94"}}>
                <RegisterForm handleClick={openRegisterForm} />
            </div>}
            <Footer/>
        </Box>
        
    )
}

export default LoginPage