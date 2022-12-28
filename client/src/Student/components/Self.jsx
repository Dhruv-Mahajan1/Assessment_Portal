import { Box, Button, TextField } from "@mui/material";
import Header from "../components/Header";

const Self = () => {
  return (
    <Box m="20px">
      <Header title="Self Assessment" subtitle="Quiz 1" />

      <form>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
          />
          <TextField fullWidth variant="filled" type="text" label="Last Name" />
          <TextField fullWidth variant="filled" type="text" label="Email" />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
          />
          <TextField fullWidth variant="filled" type="text" label="Address 1" />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address 2"
          ></TextField>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button color="secondary" variant="contained">
            Create New Quiz
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Self;
