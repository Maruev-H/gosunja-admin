import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ИНН", width: 70 },
  { field: "phone", headerName: "Телефон", width: 150 },
  { field: "firstName", headerName: "Имя", width: 130 },
  { field: "lastName", headerName: "Фамилия", width: 130 },
  { field: "patronymic", headerName: "Отчество", width: 130 },
  {
    field: "banned",
    headerName: "Заблокирован",
    width: 100,
    renderCell: (params) =>
      params.value ? (
        <Typography color="error" variant="inherit">
          Да
        </Typography>
      ) : (
        "Нет"
      ),
  },
  {
    field: "banReason",
    headerName: "Причина блокировки",
    width: 180,
    renderCell: (params) => params.value || "Не забанен",
  },
  {
    field: "image",
    headerName: "Аватарка",
    width: 150,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="User Image"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ) : (
        "Нет фотографии"
      ),
  },
  {
    field: "createdAt",
    headerName: "Дата создания",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => new Date(params),
  },
  {
    field: "updatedAt",
    headerName: "Дата обновления",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => new Date(params),
  },
  {
    field: "roles",
    headerName: "Роли",
    width: 180,
    renderCell: (params) => (
      <div>{params.value?.map((role: any) => role.value).join(", ")}</div>
    ),
  },
];
