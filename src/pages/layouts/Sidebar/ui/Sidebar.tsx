import { Grid2, Typography, Box, IconButton } from "@mui/material";
import { Home, Settings, Info } from "@mui/icons-material";
import { Link, Outlet } from "react-router";
import { LogoText } from "@/shared/assets/icons/LogoText";
import { LogoIcon } from "@/shared/assets/icons/LogoIcon";
export const Sidebar = () => {
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
          sx={{ display: "flex", justifyContent: "center", alignItems: 'center', marginBottom: 2 }}
          color={"white"}
        
        >
          <LogoIcon />
          <LogoText />
        </Box>
        <Link to="/page1" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Home />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white" }}>
              Главная
            </Typography>
          </Box>
        </Link>
        <Link to="/page2" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Settings />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white" }}>
              Настройки
            </Typography>
          </Box>
        </Link>
        <Link to="/page3" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Info />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white" }}>
              Информация
            </Typography>
          </Box>
        </Link>
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
