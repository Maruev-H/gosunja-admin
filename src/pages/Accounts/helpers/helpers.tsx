import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "patronymic", headerName: "Patronymic", width: 130 },
  {
    field: "banned",
    headerName: "Banned",
    width: 100,
    renderCell: (params) => (params.value ? "Да" : "Нет"),
  },
  {
    field: "banReason",
    headerName: "Ban Reason",
    width: 180,
    renderCell: (params) => params.value || "Не забанен",
  },
  {
    field: "image",
    headerName: "Image",
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
    headerName: "Created At",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => new Date(params),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => new Date(params),
  },
  {
    field: "roles",
    headerName: "Roles",
    width: 180,
    renderCell: (params) => (
      <div>{params.value?.map((role: any) => role.value).join(", ")}</div>
    ),
  },
];
