import { Box, Button, Card, Grid2, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Auth = () => {
  const [otp, setOtp] = useState("");

  return (
    <Grid2 height={"100vh"} width={"100%"} container>
      <Card sx={{ width: 500, height: 500, margin: "auto", padding: 5 }}>
        <Grid2
          container
          direction={"column"}
          gap={3}
          height={"75%"}
          justifyContent={"center"}
        >
          <Typography textAlign={"center"} variant="h3">
            GoSунжа
          </Typography>
          <TextField />
          <Button variant="contained">Войти</Button>
        </Grid2>
      </Card>
    </Grid2>
  );
};
