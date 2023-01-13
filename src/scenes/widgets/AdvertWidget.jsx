import { Typography, Paper } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import adImage from "../../assets/info4.jpeg"

const AdvertWidget = () => {
  return (
    <Paper
      elevation={0}
      sx={{p:"1rem"}}
    >
      <FlexBetween>
        <Typography color="black" variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color="black">Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src= {`${adImage}`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color="black">MikaCosmetics</Typography>
        <Typography color="black">mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color="black" m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </Paper>
  );
};

export default AdvertWidget;
