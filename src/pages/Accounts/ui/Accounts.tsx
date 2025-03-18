import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { columns } from "../helpers/helpers.tsx";
import { useUsers } from "@/shared/api/users/hooks/useUsers";
import { LoadingPage } from "@/pages/LoadingPage";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

const paginationModel = { page: 0, pageSize: 5 };

export const Accounts = () => {
  const { data, isLoading } = useUsers();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [banReason, setBanReason] = useState("");
  const [roles, setRoles] = useState<any[]>([]);

  const handleRowClick = (params: any) => {
    setSelectedUser(params.row);
    setBanReason(params.row.banReason || "");
    setRoles(params.row.roles || []);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setBanReason("");
    setRoles([]);
  };

  const handleBanUser = () => {
    console.log(`User ${selectedUser.id} banned for: ${banReason}`);
    setOpenModal(false);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>, role: string) => {
    if (event.target.checked) {
      setRoles((prevRoles) => [...prevRoles, role]);
    } else {
      setRoles((prevRoles) => prevRoles.filter((r) => r !== role));
    }
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

      {/* Modal to display user data */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Редактирование пользователя</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <TextField
                label="Имя"
                value={selectedUser.firstName || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Фамилия"
                value={selectedUser.lastName || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Отчество"
                value={selectedUser.patronymic || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Телефон"
                value={selectedUser.phone || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Адрес"
                value={selectedUser.address || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Причина блокировки"
                value={banReason}
                fullWidth
                margin="normal"
                onChange={(e) => setBanReason(e.target.value)}
              />

              <Box>
                <h4>Роли:</h4>
                {["Admin", "User", "Moderator"].map((role) => (
                  <FormControlLabel
                    key={role}
                    control={
                      <Checkbox
                        checked={roles.includes(role)}
                        onChange={(e) => handleRoleChange(e, role)}
                      />
                    }
                    label={role}
                  />
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Закрыть</Button>
          <Button onClick={handleBanUser}>Заблокировать</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
