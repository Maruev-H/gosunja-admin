import { useState } from "react";
import { useDeletePhoto } from "@/shared/api/photos/hooks/useDeletePhoto";
import { usePhotos } from "@/shared/api/photos/hooks/usePhotos";
import { FC } from "react";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AddPhotoDialog } from "./components/AddPhotoDialog";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog";

export const Gallery: FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const { data: photos } = usePhotos({ isPublic });
  const { mutate: deletePhoto } = useDeletePhoto();

  const [openAddPhoto, setOpenAddPhoto] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deletePhoto({ id: deleteId });
      setOpenConfirmDelete(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: "2px solid #ddd",
        }}
      >
        <Tabs
          value={isPublic ? 0 : 1}
          onChange={(_, value) => setIsPublic(value === 0)}
        >
          <Tab label="Публичные фото" />
          <Tab label="Личные фото" />
        </Tabs>
        <Button
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => setOpenAddPhoto(true)}
        >
          Добавить фото
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {photos?.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={photo.url}
                alt="Фото"
              />
              <CardContent>
                <Typography variant="body2">{photo.description}</Typography>
                {!isPublic && (
                  <IconButton
                    color="error"
                    onClick={() => {
                      setOpenConfirmDelete(true);
                      setDeleteId(photo.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddPhotoDialog
        open={openAddPhoto}
        onClose={() => setOpenAddPhoto(false)}
      />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};
