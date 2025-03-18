import { UUID } from "crypto";

export type Photo = {
  id: UUID;
  url: string;
  description: string;
  isPublic: boolean;
};

export type GetPhotoRespons = Photo[]