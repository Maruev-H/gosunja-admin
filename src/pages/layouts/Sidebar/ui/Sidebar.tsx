import { Grid2 } from "@mui/material";

export const Sidebar = () => {
  return (
    <Grid2
      width={"100%"}
      height={"100vh"}
      display={'flex'}
      p={1}
      direction={"column"}
      gap={1}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Grid2
        height={"100%"}
        flex={1.5}
        borderRadius={2}

      ></Grid2>
      <Grid2
        height={"100%"}
        flex={8.5}
        borderRadius={2}
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
        }}
      ></Grid2>
    </Grid2>
  );
};
