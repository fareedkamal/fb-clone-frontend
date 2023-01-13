import { BottomNavigation, BottomNavigationAction, FormControl, IconButton, InputBase, MenuItem, Paper, Select, Typography, useMediaQuery } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import {  CircleNotifications, Email, FacebookRounded, Home, PeopleAlt, Person, Search, Menu,Close, HomeOutlined, PeopleOutlineRounded, PeopleOutlineTwoTone, Person2Outlined, Person3Outlined, PersonOutlineOutlined, PersonOutlineRounded } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { Box } from "@mui/system"
import { setLogout } from "../../state";
import { useEffect } from "react";

const NavBar = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const name = user.firstName
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const [value,setValue]=useState(0)

    useEffect(()=>{
        setValue(value)
    },[])
    
    return (
    <Paper 
        elevation={0}    
    >
        <FlexBetween  padding="0 1rem">
            <FlexBetween>
                <IconButton >
                    <FacebookRounded color="primary" fontSize="large" />
                </IconButton>
                {isNonMobileScreens && 
                    <FlexBetween backgroundColor="#ebebeb" borderRadius="30px">
                        <IconButton>
                            <Search fontSize="small"/>
                        </IconButton>
                        <InputBase placeholder="Search Facebook"/>
                    </FlexBetween>
                }
            </FlexBetween>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction  onClick={()=>{navigate(`/home`);navigate(0);}} icon={<HomeOutlined fontSize="large"/>} />
                <BottomNavigationAction  icon={<PeopleOutlineRounded fontSize="large" />} />
                <BottomNavigationAction onClick={()=>{
                    navigate(`/profile/${user._id}`)
                    navigate(0)
                }}
                    icon={<PersonOutlineRounded fontSize="large" />} />
            </BottomNavigation>

            { isNonMobileScreens? (
                <FlexBetween gap="10px">
                    <IconButton>
                        <CircleNotifications fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <Email fontSize="large"/>
                    </IconButton>
                    <FormControl variant="standard" value={name}>
                        <Select
                            value={name}
                            sx={{
                                p:"0.25rem 1rem",
                                borderRadius:"0.25rem",
                                backgroundColor:"#e4e4e4"
                            }}
                        >
                            <MenuItem value={name}>
                                <Typography>{name}</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu/>
                </IconButton>
            )}

            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="300px"
                    minWidth="100px"
                    backgroundColor="#eeeeee"
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    <FlexBetween gap="10px" display="flex" flexDirection="column">
                        <IconButton>
                            <CircleNotifications fontSize="large"/>
                        </IconButton>
                        <IconButton>
                            <Email fontSize="large"/>
                        </IconButton>
                        <FormControl variant="standard" value={name}>
                            <Select
                                value={name}
                                sx={{
                                    p:"0.25rem 1rem",
                                    borderRadius:"0.25rem",
                                    backgroundColor:"#e4e4e4"
                                }}
                            >
                                <MenuItem value={name}>
                                    <Typography>{name}</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    </Paper>
    
  )
}

export default NavBar