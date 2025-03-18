import React, { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";

// Интерфейс для фотографии
interface Photo {
  id: number;
  url: string;
  title: string;
}

export const Gallery: React.FC = () => {
  // Состояния
  const [mode, setMode] = useState<"personal" | "public" | null>(null); // Режим: 'personal' или 'public'
  const [photos, setPhotos] = useState<Photo[]>([]); // Основной список фотографий
  const [newPhotos, setNewPhotos] = useState<Photo[]>([]); // Временный список новых фотографий
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null); // Выбранная фотография для редактирования

  // Обработчик выбора режима (личное или публичное)
  const handleModeSelect = (selectedMode: "personal" | "public") => {
    setMode(selectedMode);
    setSelectedPhoto(null); // Сброс выбранной фотографии при смене режима
  };

  // Обработчик загрузки фотографии
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: newPhotos.length + 1, // Временный ID для новых фотографий
          url: e.target?.result as string,
          title: `${mode === "personal" ? "Personal" : "Public"} Photo ${
            newPhotos.length + 1
          }`,
        };
        setNewPhotos([...newPhotos, newPhoto]); // Добавляем в временный список
      };
      reader.readAsDataURL(file); // Чтение файла как Data URL
    }
  };

  // Обработчик сохранения новых фотографий
  const handleSavePhotos = () => {
    setPhotos([...photos, ...newPhotos]); // Добавляем новые фотографии в основной список
    setNewPhotos([]); // Очищаем временный список
  };

  // Обработчик удаления фотографии
  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  // Обработчик выбора фотографии для редактирования
  const handleEditPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  // Обработчик сохранения изменений фотографии
  const handleSavePhoto = (updatedPhoto: Photo) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      )
    );
    setSelectedPhoto(null); // Сброс выбранной фотографии после сохранения
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant={mode === "personal" ? "contained" : "outlined"}
          onClick={() => handleModeSelect("personal")}
          style={{ marginRight: "10px" }}
        >
          Личное
        </Button>
        <Button
          variant={mode === "public" ? "contained" : "outlined"}
          onClick={() => handleModeSelect("public")}
        >
          Публичное
        </Button>
      </div>

      {mode && (
        <div style={{ marginBottom: "20px" }}>
          {/* Кнопка для загрузки фотографии */}
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-photo"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-photo">
            <Button
              variant="contained"
              component="span"
              style={{ marginRight: "10px" }}
            >
              Добавить
            </Button>
          </label>
          {/* Кнопка для сохранения новых фотографий */}
          {newPhotos.length > 0 && (
            <Button
              variant="contained"
              onClick={handleSavePhotos}
              style={{ marginRight: "10px" }}
            >
              Сохранить
            </Button>
          )}
          {selectedPhoto && (
            <>
              <Button
                variant="contained"
                onClick={() =>
                  handleSavePhoto({ ...selectedPhoto, title: "Updated Title" })
                }
                style={{ marginRight: "10px" }}
              >
                Сохранить изменения
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedPhoto(null)}
              >
                Отменить
              </Button>
            </>
          )}
        </div>
      )}

      {/* Отображение новых фотографий (ещё не сохранённых) */}
      {newPhotos.length > 0 && (
        <div>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Новые фотографии:
          </Typography>
          <Grid container spacing={2}>
            {newPhotos.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Paper style={{ padding: "10px" }}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Typography variant="subtitle1" align="center">
                    {photo.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Отображение сохранённых фотографий */}
      <Typography
        variant="h6"
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        Сохранённые фотографии:
      </Typography>
      <Grid container spacing={2}>
        {photos
          .filter((photo) =>
            mode === "personal"
              ? photo.title.includes("Personal")
              : photo.title.includes("Public")
          )
          .map((photo) => (
            <Grid item key={photo.id} xs={12} sm={6} md={4}>
              <Paper style={{ padding: "10px" }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography variant="subtitle1" align="center">
                  {photo.title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleEditPhoto(photo)}
                    style={{ marginRight: "10px" }}
                  >
                    Изменить
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
