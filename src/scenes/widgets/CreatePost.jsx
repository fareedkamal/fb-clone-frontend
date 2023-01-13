import { PhotoLibrary, VideoCameraFront } from "@mui/icons-material"
import { Button, Divider, IconButton, InputBase,Paper, Typography, useMediaQuery } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import UserLogo from "./UserLogo"
import state from '../../state'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import { useNavigate } from "react-router-dom"

function CreatePost() {
    const [post, setPost] = useState("");
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate=useNavigate()
    const handlePost = async () => {
        const data = {
            userId: _id,
            description: post,
        }
        const response = await fetch(`${process.env.SERVER_URL}/posts`, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
          body: JSON.stringify(data)
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        navigate(0);
        setPost("");
    };


    return (
    <Paper
        elevation={0}
        sx={{
            padding:"1em 1em",
            display:"flex",
            flexDirection:"column",
            gap:"0.5rem"
        }}
    >
        <FlexBetween gap="1rem">
            <UserLogo i={1}/>
            <InputBase
                placeholder="What's on your mind?"
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    backgroundColor: "#ebebeb",
                    borderRadius: "2rem",
                    padding: "0.5rem 0.6rem",
                }}
            />
        </FlexBetween>
        <Divider/>
        <FlexBetween>
            <IconButton sx={{borderRadius:"1rem"}} >
                <VideoCameraFront sx={{fontSize:"30px",color:"#ff2525"}} />
                <Typography variant="body2">Live Video</Typography>
            </IconButton>
            <IconButton sx={{borderRadius:"1rem"}}>
                <PhotoLibrary sx={{fontSize:"30px",color:"#6ba147"}}/>
                <Typography variant="body2">Photo/Video</Typography>
            </IconButton>
            <Button onClick={handlePost}  variant="contained" disabled={!post}>Post</Button>
        </FlexBetween>
    </Paper>
  )
}

export default CreatePost