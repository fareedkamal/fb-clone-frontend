import { Box } from "@mui/system"
import NavBar from "../navbar"
import CreatePost from "../widgets/CreatePost"
import Posts from "../widgets/Posts"
import Post from "../widgets/Post"
import state from "../../state"
import { useSelector } from "react-redux"
import { useMediaQuery } from "@mui/material"
import FriendList from "../widgets/FriendList"
import SuggestedFriends from "../widgets/SuggestedFriends"
import UserWidget from "../widgets/UserWidget"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Footer from "../../components/Footer"



const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams()
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;
    
    return(
        <Box
            width="100%"
            height="100%"
            backgroundColor="#e4e4e4"
            overflow="auto"
        >
            <NavBar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId}/>
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <CreatePost/>
                    <Posts key={userId} userId={userId} isProfile/>
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <FriendList userId={userId} />
                        <SuggestedFriends userId={userId} />
                    </Box>
                )}
            </Box>
            <Footer/>   
        </Box>
    )
}

export default ProfilePage