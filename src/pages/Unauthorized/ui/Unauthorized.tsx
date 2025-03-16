import { Button, Typography, Box, Stack } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ textAlign: "center", px: 2 }}
    >
      <Stack spacing={3} alignItems="center">
        <Box
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "error.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <LockOutlined sx={{ fontSize: 50 }} />
        </Box>

        <Typography variant="h3" fontWeight="bold">
          403
        </Typography>

        <Typography variant="h5" color="text.secondary">
          Доступ запрещен
        </Typography>

        <Typography variant="body1" color="text.secondary" maxWidth={400}>
          У вас нет прав на просмотр этой страницы. Попробуйте войти под другой учетной записью.
        </Typography>

        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          На главную
        </Button>
      </Stack>
    </Box>
  );
};
