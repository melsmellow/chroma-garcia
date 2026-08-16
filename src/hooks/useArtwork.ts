"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import type { Artwork, ArtworkStatus } from "@/types/artworks";

import {
  createArtwork,
  deleteArtwork,
  updateArtwork,
} from "@/actions/artworks";

import { toast } from "@/components/ui/toast";

interface UseArtworkProps {
  mode?: "create" | "edit";
  initialData?: Artwork;
  onDeleted?: () => void | Promise<void>;
}

interface ArtworkFormData {
  title: string;
  slug: string;
  artist: string;

  medium: string;
  category: string;

  tags: string;
  description: string;

  year: string;
  dimensions: string;

  palette: string;

  status: ArtworkStatus;

  price: string;
  currency: string;

  isFeatured: boolean;
}

interface ArtworkToDelete {
  id: string;
  name: string;
}
function createInitialFormData(initialData?: Artwork): ArtworkFormData {
  return {
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",

    artist: initialData?.artist?._id ?? "",

    medium: initialData?.medium ?? "",
    category: initialData?.category ?? "",

    tags: initialData?.tags?.join(", ") ?? "",
    description: initialData?.description ?? "",

    year: initialData?.year?.toString() ?? "",
    dimensions: initialData?.dimensions ?? "",

    palette: initialData?.palette?.join(", ") ?? "",

    status: initialData?.status ?? "Available",

    price: initialData?.price?.toString() ?? "",
    currency: initialData?.currency ?? "PHP",

    isFeatured: initialData?.isFeatured ?? false,
  };
}

export function useArtwork({
  mode = "create",
  initialData,
  onDeleted,
}: UseArtworkProps) {
  const router = useRouter();

  const isEdit = mode === "edit";

  const [artworkToDelete, setArtworkToDelete] =
    useState<ArtworkToDelete | null>(null);

  const [isDeleting, startDeleteTransition] = useTransition();

  function handleDelete() {
    startDeleteTransition(async () => {
      if (!artworkToDelete) return;

      try {
        const result = await deleteArtwork(artworkToDelete.id);

        if (!result.success) {
          toast.add({
            type: "destructive",
            title: "Failed to delete artwork",
            description: result.message || "Failed to delete artwork.",
          });

          return;
        }

        toast.add({
          type: "success",
          title: "Artwork deleted",
          description: result.message || "Artwork deleted successfully.",
        });

        await onDeleted?.();
      } catch (error) {
        console.error("Failed to delete artwork:", error);

        toast.add({
          type: "destructive",
          title: "Failed to delete artwork",
          description: "Something went wrong while deleting the artwork.",
        });
      } finally {
        setArtworkToDelete(null);
      }
    });
  }

  /* ============================== */
  /* FORM */
  /* ============================== */

  const [formData, setFormData] = useState<ArtworkFormData>(() =>
    createInitialFormData(initialData),
  );

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const target = event.target;

    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((previous) => ({
        ...previous,
        [name]: target.checked,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /* ============================== */
  /* IMAGE */
  /* ============================== */

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl ?? null,
  );

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.add({
        type: "destructive",
        title: "Invalid image",
        description: "Please select a valid image file.",
      });

      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(preview);
  }

  function removeImage() {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);

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

    // Image is required when creating
    if (!isEdit && !imageFile) {
      toast.add({
        type: "destructive",
        title: "Artwork image required",
        description: "Please upload an artwork image.",
      });

      return;
    }

    // Prevent removing the artwork image without replacing it
    if (isEdit && !imagePreview && !imageFile) {
      toast.add({
        type: "destructive",
        title: "Artwork image required",
        description: "An artwork must have an image.",
      });

      return;
    }

    startTransition(async () => {
      try {
        const data = new FormData();

        data.append("title", formData.title.trim());

        data.append("slug", formData.slug.trim().toLowerCase());

        data.append("artist", formData.artist);

        data.append("medium", formData.medium.trim());

        data.append("category", formData.category.trim());

        data.append(
          "tags",
          JSON.stringify(
            formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          ),
        );

        data.append("description", formData.description.trim());

        data.append("year", formData.year);

        data.append("dimensions", formData.dimensions.trim());

        // Optional palette
        data.append(
          "palette",
          JSON.stringify(
            formData.palette
              .split(",")
              .map((color) => color.trim())
              .filter(Boolean),
          ),
        );

        data.append("status", formData.status);

        if (formData.price.trim()) {
          data.append("price", formData.price);
        }

        data.append("currency", formData.currency.trim().toUpperCase());

        data.append("isFeatured", String(formData.isFeatured));

        if (imageFile) {
          data.append("image", imageFile);
        }

        const result = isEdit
          ? await updateArtwork(initialData!._id, data)
          : await createArtwork(data);

        if (!result.success) {
          toast.add({
            type: "destructive",
            title: isEdit
              ? "Failed to update artwork"
              : "Failed to create artwork",
            description: result.message || "Something went wrong.",
          });

          return;
        }

        toast.add({
          type: "success",
          title: isEdit ? "Artwork updated" : "Artwork created",
          description:
            result.message ||
            (isEdit
              ? "Artwork updated successfully."
              : "Artwork created successfully."),
        });

        router.push("/dashboard/artworks");
      } catch (error) {
        console.error(
          `Failed to ${isEdit ? "update" : "create"} artwork:`,
          error,
        );

        toast.add({
          type: "destructive",
          title: isEdit
            ? "Failed to update artwork"
            : "Failed to create artwork",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

return {
  /* General */
  isEdit,

  /* Form */
  formData,
  handleChange,

  /* Image */
  fileInputRef,
  imageFile,
  imagePreview,
  handleImageChange,
  removeImage,

  /* Create / Update */
  isPending,
  handleSubmit,

  /* Delete */
  artworkToDelete,
  setArtworkToDelete,
  isDeleting,
  handleDelete,
};
}
