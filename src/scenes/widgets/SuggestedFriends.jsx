import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { setFriends } from "../../state";

const SuggestedFriends = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [suggestedFriends,setSuggestedFriends]=useState([])

  const getSuggestedFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/users/${userId}/suggestions`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setSuggestedFriends(data)
  };

  useEffect(() => {
    getSuggestedFriends();
  }, []);

  return (
    <Paper 
        sx={{mt:"1rem",p:"1rem"}}
        elevation={0}>
      <Typography
        color="grey"
        variant="body1"
        sx={{ mb: "1.5rem" }}
        textAlign="center"
      >
        People you may know
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {suggestedFriends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default SuggestedFriends;
