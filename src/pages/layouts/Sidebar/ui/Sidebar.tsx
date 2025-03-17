import { Grid2, Typography, Box, IconButton } from "@mui/material";
import {  NavLink, Outlet } from "react-router";
import { LogoText } from "@/shared/assets/icons/LogoText";
import { LogoIcon } from "@/shared/assets/icons/LogoIcon";
import { useUserRoutes } from "../hooks/useUserRoutes";
export const Sidebar = () => {
  const routes = useUserRoutes();

  return (
    <Grid2
      width={"100%"}
      height={"100vh"}
      display={"flex"}
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
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
          color={"white"}
        >
          <LogoIcon />
          <LogoText />
        </Box>
        {routes.map(({ icon, path, title }) => (
          <NavLink to={path} style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              borderRadius={2}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: (theme) => theme.palette.primary.main,
                backgroundColor: "white",
              }}
            >
              <IconButton color="primary" >
                {icon}
              </IconButton>
              <Typography variant="h6" >
                {title}
              </Typography>
            </Box>
          </NavLink>
        ))}
      </Grid2>

      <Grid2
        height={"100%"}
        flex={8.5}
        borderRadius={2}
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
        }}
      >
        <Outlet />
      </Grid2>
    </Grid2>
  );
};
