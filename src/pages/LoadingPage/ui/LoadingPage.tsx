import { CircularProgress, Typography, Box, Stack } from "@mui/material";
import { motion } from "framer-motion";

export const LoadingPage = () => {
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
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <CircularProgress size={50} color="inherit" />
        </Box>

        <Typography variant="h3" fontWeight="bold">
          Загрузка...
        </Typography>

        <Typography variant="h5" color="text.secondary">
          Пожалуйста, подождите, пока мы загружаем данные.
        </Typography>

        <Typography variant="body1" color="text.secondary" maxWidth={400}>
          Это может занять несколько секунд.
        </Typography>
      </Stack>
    </Box>
  );
};
