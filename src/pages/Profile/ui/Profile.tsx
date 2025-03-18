import { useEffect, useState } from "react";
import { TextFieldElement, FormContainer, useForm } from "react-hook-form-mui";
import { Button, Typography, IconButton, Avatar, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUserProfile } from "@/shared/api/profile/hooks/useUserProfile";
import { useUpdateProfile } from "@/shared/api/profile/hooks/useUpdateProfile";
import { LoadingPage } from "@/pages/LoadingPage";
import { getDefaultValues } from "../helpers/helpers";

export const Profile = () => {
  const { data, isLoading } = useUserProfile();
  const { mutate } = useUpdateProfile();

  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    setImage(event.target.files[0]);
  };

  const handleSave = (formData: Record<string, any>) => {
    const updatedData: Partial<typeof formData & { image?: File }> = {};

    Object.keys(formData).forEach((key) => {
      if (
        typeof formData[key] !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formData[key] !== data?.[key]
      ) {
        updatedData[key] = formData[key];
      }
    });

    if (image) {
      updatedData.image = image;
    }

    if (Object.keys(updatedData).length > 0) {
      console.log({
        updatedData,
      });

      mutate(updatedData);
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        patronymic: data.patronymic || "",
        address: data.address || "",
      });
    }
  }, [data, form]);

  if (isLoading) return <LoadingPage />;

  return (
    <FormContainer
      formContext={form}
      onSuccess={handleSave}
      defaultValues={getDefaultValues(data)}
    >
      <Box style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            src={
              image
                ? URL.createObjectURL(image)
                : data?.image || "/default-avatar.png"
            }
            sx={{ width: 100, height: 100, marginRight: 2 }}
          />
          {editMode ? (
            <IconButton type="submit">
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
          )}
        </div>
        <TextFieldElement
          name="lastName"
          label="Фамилия"
          fullWidth
          margin="normal"
          disabled={!editMode}
        />
        <TextFieldElement
          name="firstName"
          label="Имя"
          fullWidth
          margin="normal"
          disabled={!editMode}
        />
        <TextFieldElement
          name="patronymic"
          label="Отчество"
          fullWidth
          margin="normal"
          disabled={!editMode}
        />
        <TextFieldElement
          name="address"
          label="Адрес"
          fullWidth
          margin="normal"
          disabled={!editMode}
        />

        {editMode && (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2 }}
          >
            Загрузить изображение
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Статус:{" "}
          {data?.banned ? `Заблокирован (${data.banReason})` : "Активен"}
        </Typography>
        <Typography variant="body2">
          Роль:{" "}
          {data?.roles?.length
            ? data.roles.map((r) => r.description).join(", ")
            : "Нет ролей"}
        </Typography>
        <Typography variant="body2">
          Дата создания: {new Date(data?.createdAt ?? "").toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Последнее обновление:{" "}
          {new Date(data?.updatedAt ?? "").toLocaleString()}
        </Typography>
      </Box>
    </FormContainer>
  );
};
