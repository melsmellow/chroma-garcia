export interface Artist {
  _id: string;
  slug: string;
  name: string;
  artStyle: string;
  medium?: string;
  bio: string;
  palette?: string[];
  portrait?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}