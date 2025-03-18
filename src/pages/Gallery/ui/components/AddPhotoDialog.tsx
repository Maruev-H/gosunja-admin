import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { usePostPhoto } from "@/shared/api/photos/hooks/usePostPhoto";

interface AddPhotoDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddPhotoDialog: React.FC<AddPhotoDialogProps> = ({
  open,
  onClose,
}) => {
  const { mutate: postPhoto } = usePostPhoto();

  const [description, setDescription] = useState("");
  const [photoPublic, setPhotoPublic] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      postPhoto({
        description,
        isPublic: photoPublic,
        image: selectedFile,
      });
      onClose();
      setDescription("");
      setSelectedFile(null);
      setPreview(null);
      setPhotoPublic(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить фото</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2, mb: 2 }}
        >
          Загрузить изображение
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {preview && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <img
              src={preview}
              alt="Предпросмотр"
              style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        )}

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Тип фото</InputLabel>
          <Select
            value={photoPublic ? "public" : "private"}
            onChange={(e) => setPhotoPublic(e.target.value === "public")}
            label="Тип фото"
          >
            <MenuItem value="public">Публичное</MenuItem>
            <MenuItem value="private">Личное</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedFile}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};