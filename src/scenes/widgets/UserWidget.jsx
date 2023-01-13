import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, Paper } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLogo from "./UserLogo";
import logo1 from '../../assets/linkedin.png'
import logo2 from '../../assets/twitter.png'

const UserWidget = ({ userId}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  
  const getUser = async () => {
    const response = await fetch(`${process.env.SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    dob,
    friends,
  } = user;

  return (
    <Paper
      elevation={0}
      sx={{p:"1rem"}}
    >
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserLogo i={1} />
          <Box>
            <Typography
              variant="h4"
              color="black"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: "grey",
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color="black">{friends.length} Friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: "black" }} />
          <Typography color="black">Torronto, Canada</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: "black" }} />
          <Typography color="black">Software Engineer</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color="black">Who's viewed your profile</Typography>
          <Typography color="black" fontWeight="500">
            {Math.floor(Math.random() * 100)}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color="black">Impressions of your post</Typography>
          <Typography color="black" fontWeight="500">
            {Math.floor(Math.random() * 100)}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={logo2} alt="twitter" />
            <Box>
              <Typography  fontWeight="500">
                Twitter
              </Typography>
              <Typography >Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "black" }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={logo1} alt="linkedin" />
            <Box>
              <Typography fontWeight="500">
                Linkedin
              </Typography>
              <Typography >Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "black" }} />
        </FlexBetween>
      </Box>
    </Paper>
  );
};

export default UserWidget;
