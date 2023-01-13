import { Box, Typography } from "@mui/material"

function Footer() {
  return (
    <Box
        sx={{
            width:"100%",
            height:"50px",
            textAlign:"center",
            p:"1rem",
            position:"absolute",
            bottom:"0",
            backgroundColor:"#1877f2",
        }}
    >
        <Typography component="a" variant="body2" color="grey" sx={{textDecoration:"none",color:"white"}} href="linkedin.com/in/fareedkamal">Developed by @fareedkamal</Typography>
    </Box>
  )
}

export default Footer