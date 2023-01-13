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
import AdvertWidget from "../widgets/AdvertWidget"
import Footer from "../../components/Footer"

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const { _id } = useSelector((state) => state.user)
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
                    {isNonMobileScreens && <AdvertWidget/> }
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <CreatePost/>
                    <Posts userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <FriendList userId={_id} />
                        <SuggestedFriends userId={_id} />
                    </Box>
                )}
            </Box>
            <Footer/>
        </Box>
    )
}

export default HomePage