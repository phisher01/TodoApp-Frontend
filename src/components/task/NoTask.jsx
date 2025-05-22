
import { Box, Typography } from "@mui/material";
import FolderOffIcon from '@mui/icons-material/FolderOff';

const NoTask = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      textAlign="center"
      color="gray"
    >
      <FolderOffIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" fontWeight="medium">
        You don't have any Tasks here yet.
      </Typography>
      <Typography variant="body1">
        Start by creating a new Task to get started.
      </Typography>
    </Box>
  );
};

export default NoTask;
