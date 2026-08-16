export interface Artist {
  _id: string;

  slug: string;
  name: string;

  artStyle: string;
  medium: string;
  bio: string;

  portraitUrl: string;

  palette?: string[];

  social?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };

  createdAt: string;
  updatedAt: string;
}