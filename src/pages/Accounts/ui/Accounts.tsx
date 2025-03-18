import { useState } from "react";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Avatar, Typography, Stack } from "@mui/material";
import { columns } from "../helpers/helpers.tsx";
import { useUsers } from "@/shared/api/users/hooks/useUsers";
import { useUserRoles } from "@/shared/api/users/hooks/useUserRoles.ts";
import { useBanUser } from "@/shared/api/users/hooks/useBanUser";
import { useSetUserRole } from "@/shared/api/users/hooks/useSetUserRole";
import { LoadingPage } from "@/pages/LoadingPage";
import { User, UserRole } from "@/shared/api/users/types.ts";

const paginationModel = { page: 0, pageSize: 5 };

export const Accounts = () => {
  const { data, isLoading } = useUsers();
  const { data: rolesData } = useUserRoles();
  const { mutate: banUser } = useBanUser();
  const { mutate: setUserRole } = useSetUserRole();

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banReason, setBanReason] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<
    { id: number; value: string; description: string }[]
  >([]);

  const handleRowClick = (params: GridRowParams<User>) => {
    setSelectedUser(params.row);
    setBanReason(params.row.banReason || "");
    setSelectedRoles(params.row.roles || []);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setBanReason("");
    setSelectedRoles([]);
  };

  const handleBanUser = () => {
    if (!selectedUser) return;

    if (selectedUser.banned) {
      console.log(`User ${selectedUser.id} unbanned`);
    } else {
      banUser({ userId: selectedUser.id, banReason });
    }
    setOpenModal(false);
  };

  const handleSetRoles = (newRoles: UserRole[]) => {
    if (!selectedUser) return;

    const userRoles = selectedUser.roles.map((item) => item.value);

    setSelectedRoles(newRoles);

    newRoles.forEach((role) => {
      if (!userRoles.includes(role.value)) {
        setUserRole({ userId: selectedUser.id, value: role.value });
      }
    });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Paper sx={{ height: "100%", width: "100%", padding: "0 10px" }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          onRowClick={handleRowClick}
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Данные пользователя</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Avatar
                src={selectedUser.image || ""}
                alt="User Image"
                sx={{
                  width: 120,
                  height: 120,
                  marginBottom: 2,
                  border: "3px solid #ccc",
                }}
              />

              <Stack spacing={1} width="100%">
                <Typography variant="subtitle1">
                  <strong>Имя:</strong> {selectedUser.firstName}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Фамилия:</strong> {selectedUser.lastName}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Отчество:</strong> {selectedUser.patronymic}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Телефон:</strong> {selectedUser.phone}
                </Typography>
              </Stack>

              <Box width="100%">
                {selectedUser.banned && (
                  <Typography
                    color="error"
                    sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
                  >
                    Пользователь заблокирован
                  </Typography>
                )}
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Причина блокировки"
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    fullWidth
                    sx={{ flex: "3" }}
                  />
                  <Button
                    sx={{ flex: "1" }}
                    variant="contained"
                    color={selectedUser.banned ? "success" : "error"}
                    onClick={handleBanUser}
                  >
                    {selectedUser.banned ? "Разблокировать" : "Заблокировать"}
                  </Button>
                </Stack>
              </Box>

              <Autocomplete
                multiple
                options={rolesData || []}
                getOptionLabel={(option) => option.description}
                value={
                  rolesData?.filter((role) =>
                    selectedRoles.some((selected) => selected.id === role.id)
                  ) || []
                }
                fullWidth
                onChange={(_event, newValue) => handleSetRoles(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Роли"
                    placeholder="Выберите роли"
                    fullWidth
                  />
                )}
                sx={{ marginTop: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
