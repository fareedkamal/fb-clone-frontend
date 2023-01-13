import { AccountCircle, Person, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLogo from "../scenes/widgets/UserLogo";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";

const Friend = ({ friendId, name}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.SERVER_URL}/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="0.5rem">
        <UserLogo/>
        <Box 
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color="#272727"
            variant="body2"
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
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: "#c2c2c2", p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined  sx={{ color: "grey" }} />
        ) : (
          <PersonAddOutlined   sx={{ color: "grey" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
