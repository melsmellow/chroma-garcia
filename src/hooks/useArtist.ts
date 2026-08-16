"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  createArtist,
  deleteArtist,
  updateArtist,
  type Artist,
} from "@/actions/artists";

import { toast } from "@/components/ui/toast";

interface ArtistToDelete {
  id: string;
  name: string;
}

interface ArtistFormData {
  name: string;
  slug: string;
  artStyle: string;
  medium: string;
  bio: string;
  palette?: string[];
  instagram: string;
  facebook: string;
  website: string;
}

interface UseArtistProps {
  mode?: "create" | "edit";
  initialData?: Artist;
  onDeleted?: () => void | Promise<void>;
}

export function useArtist({
  mode = "create",
  initialData,
  onDeleted,
}: UseArtistProps = {}) {
  const router = useRouter();

  /* ============================== */
  /* GENERAL */
  /* ============================== */

  const isEdit = mode === "edit";

  /* ============================== */
  /* FORM */
  /* ============================== */

  const [formData, setFormData] = useState<ArtistFormData>({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    artStyle: initialData?.artStyle ?? "",
    medium: initialData?.medium ?? "",
    bio: initialData?.bio ?? "",
    palette: initialData?.palette ?? [],
    instagram: initialData?.social?.instagram ?? "",
    facebook: initialData?.social?.facebook ?? "",
    website: initialData?.social?.website ?? "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /* ============================== */
  /* PORTRAIT */
  /* ============================== */

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [portraitFile, setPortraitFile] = useState<File | null>(null);

  const [portraitPreview, setPortraitPreview] = useState<string | null>(
    initialData?.portraitUrl ?? null,
  );

  function handlePortraitChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setPortraitFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPortraitPreview(previewUrl);
  }

  function removePortrait() {
    setPortraitFile(null);
    setPortraitPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* ============================== */
  /* CREATE / UPDATE */
  /* ============================== */

  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      try {
        const data = new FormData();

        data.append("slug", formData.slug);
        data.append("name", formData.name);
        data.append("artStyle", formData.artStyle);
        data.append("medium", formData.medium);
        data.append("bio", formData.bio);

        data.append("palette", JSON.stringify(formData.palette));

        data.append("instagram", formData.instagram);

        data.append("facebook", formData.facebook);

        data.append("website", formData.website);

        if (portraitFile) {
          data.append("portrait", portraitFile);
        }

        const result =
          mode === "create"
            ? await createArtist(data)
            : await updateArtist(initialData!._id, data);

        if (!result.success) {
          toast.add({
            type: "destructive",
            title:
              mode === "create"
                ? "Failed to create artist"
                : "Failed to update artist",
            description: result.message || "Something went wrong.",
          });

          return;
        }

        toast.add({
          type: "success",
          title: mode === "create" ? "Artist created" : "Artist updated",
          description:
            result.message ||
            (mode === "create"
              ? "Artist created successfully."
              : "Artist updated successfully."),
        });

        router.push("/dashboard/artists");
      } catch (error) {
        console.error(`Failed to ${mode} artist:`, error);

        toast.add({
          type: "destructive",
          title:
            mode === "create"
              ? "Failed to create artist"
              : "Failed to update artist",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  /* ============================== */
  /* DELETE */
  /* ============================== */

  const [artistToDelete, setArtistToDelete] = useState<ArtistToDelete | null>(
    null,
  );

  const [isDeleting, startDeleteTransition] = useTransition();

  function handleDelete() {
    startDeleteTransition(async () => {
      if (!artistToDelete) return;

      try {
        const result = await deleteArtist(artistToDelete.id);

        if (!result.success) {
          toast.add({
            type: "destructive",
            title: "Failed to delete artist",
            description: result.message || "Failed to delete artist.",
          });

          return;
        }

        toast.add({
          type: "success",
          title: "Artist deleted",
          description: result.message || "Artist deleted successfully.",
        });

        await onDeleted?.();
      } catch (error) {
        console.error(error);

        toast.add({
          type: "destructive",
          title: "Failed to delete artist",
          description: "Something went wrong while deleting the artist.",
        });
      } finally {
        setArtistToDelete(null);
      }
    });
  }

  return {
    /* General */
    isEdit,

    /* Form */
    formData,
    handleChange,

    /* Portrait */
    fileInputRef,
    portraitFile,
    portraitPreview,
    handlePortraitChange,
    removePortrait,

    /* Create / Update */
    isPending,
    handleSubmit,

    /* Delete */
    artistToDelete,
    setArtistToDelete,
    isDeleting,
    handleDelete,
  };
}
