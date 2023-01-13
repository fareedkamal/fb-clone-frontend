import { Box } from '@mui/system'
import profileLogos from '../../assets/dps'
function UserLogo({i}) {
  return (
    <Box 
        sx={{
            backgroundImage:`url('${profileLogos[ i==null? Math.floor(Math.random() * 15) : i ] }')`,
            borderRadius:"50%",
            height:"50px",
            width:"50px",
            backgroundSize:"contain"
        }}
    />
  )
}

export default UserLogo