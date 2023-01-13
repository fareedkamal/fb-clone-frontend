import { ChatBubbleOutlineRounded, FavoriteRounded, RecommendRounded, Share, ThumbUpRounded } from '@mui/icons-material'
import { Paper, Typography,Box, IconButton, Stack,Divider } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import UserLogo from './UserLogo'
import { useDispatch, useSelector } from "react-redux";
import state from '../../state'
import { setPost } from '../../state';
import { useState } from 'react';

function Post({
    postId,
    postUserId,
    name,
    description,
    likes,
    comments,
},isProfile=false) {
  
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length
    const commentCount = Object.keys(comments).length
  

    const patchLike = async () => {
        const response = await fetch(`${process.env.SERVER_URL}/posts/${postId}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

  
    return (
    <Paper
        elevation={0}
        sx={{
            
            padding:"1em 1em",
            mt:"1em"
        }}
    >
        <Box 
            display="flex"
            gap="0.5rem"
            alignItems="center"
            mb="1rem"
        >
            <UserLogo />
            <Box 
                onClick={() => {
                    navigate(`/profile/${postUserId}`);
                    navigate(0);
                }}
                >
                <Typography
                    color="#272727"
                    variant="body2"
                    fontWeight="900"
                    sx={{
                    "&:hover": {
                        color: "grey",
                        cursor: "pointer",
                    },
                    }}
                >
                    {name}
                </Typography>
            </Box>
        </Box>
        <Typography variant='body2'>{description}</Typography>
        <FlexBetween  alignItems="center" mt="5px">
            <Stack direction="row" spacing={0.5}>
                <RecommendRounded sx={{color:"#0a80ff"}} fontSize='small'/>
                <Typography fontSize="12px">{likeCount}</Typography>
            </Stack>
            <Typography fontSize="12px">{commentCount} comments</Typography>
        </FlexBetween>
        
        
        {/* LIKE & COMMENT BUTTONS */}
        <FlexBetween>
            <IconButton           
                onClick={patchLike}
                sx={{
                    borderRadius:"1rem",
                    color: isLiked? "#0a80ff" : ""
                }}
            >
                <ThumbUpRounded />
                <Typography variant='body2' ml="0.5em">Like</Typography>
            </IconButton>
            <IconButton
                onClick={()=>{setIsComments(!isComments)}}
                sx={{borderRadius:"1rem"}}
            >
                <ChatBubbleOutlineRounded/>
                <Typography variant='body2' ml="0.5em">Comment</Typography>
            </IconButton>
            <IconButton sx={{borderRadius:"1rem"}}>
                <Share/>
                <Typography variant='body2' ml="0.5em">Share</Typography>
            </IconButton>
        </FlexBetween>
        
        {/* COMMENT BOX */}

        {isComments && (
            <Box>
                {comments.map((comment, i) => (
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography variant="body2" sx={{ m: "0.5rem 0", pl: "1rem" }}>
                            {comment}
                        </Typography>
                    </Box>
                ))}
                <Divider />
            </Box>
        )}

    </Paper>
  )
}

export default Post