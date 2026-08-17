"use client";

import Image from "next/image";
import Link from "next/link";

import { ImagePlus, Loader2, Save, Trash2, Upload, X } from "lucide-react";

import type { Artwork } from "@/types/artworks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArtwork } from "@/hooks/useArtwork";
import { GetArtworkResponse } from "@/actions/artworks";

interface ArtistOption {
  _id: string;
  name: string;
}

interface ArtworkFormProps {
  mode: "create" | "edit";
  artists: ArtistOption[];
  initialData?: GetArtworkResponse["artwork"];
}

export default function ArtworkForm({
  mode,
  artists,
  initialData,
}: ArtworkFormProps) {
  const {
    isEdit,
    formData,
    handleChange,

    fileInputRef,
    imageFile,
    imagePreview,
    handleImageChange,
    removeImage,

    isPending,
    handleSubmit,
  } = useArtwork({
    mode,
    initialData,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ============================== */}
      {/* BASIC INFORMATION */}
      {/* ============================== */}

      <section className="border border-line bg-gesso">
        <div className="border-b border-line px-6 py-5">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-coral">
            Artwork Information
          </p>

          <h2 className="mt-2 font-display text-2xl">Basic Details</h2>

          <p className="mt-2 text-sm text-ink-soft">
            Enter the primary information for this artwork.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Title */}

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-ink">
              Artwork Title
            </label>

            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Untitled"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>

          {/* Slug */}

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-ink">
              Slug
            </label>

            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="artwork-title"
              required
              className="border-line bg-gesso text-ink"
            />

            <p className="text-xs text-ink-soft">
              Used in the artwork&apos;s public URL.
            </p>
          </div>

          {/* Artist */}

          <div className="space-y-2">
            <label htmlFor="artist" className="text-sm font-medium text-ink">
              Artist
            </label>

            <select
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              className="h-10 w-full rounded-md border border-line bg-gesso px-3 text-sm text-ink outline-none transition-colors focus:border-coral"
            >
              <option value="">Select an artist</option>

              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-ink">
              Category
            </label>

            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Painting"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>

          {/* Medium */}

          <div className="space-y-2">
            <label htmlFor="medium" className="text-sm font-medium text-ink">
              Medium
            </label>

            <Input
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              placeholder="Acrylic on Canvas"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>

          {/* Year */}

          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium text-ink">
              Year
            </label>

            <Input
              id="year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              placeholder="2026"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>

          {/* Dimensions */}

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="dimensions"
              className="text-sm font-medium text-ink"
            >
              Dimensions
            </label>

            <Input
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="120 × 80 cm"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* ARTWORK DETAILS */}
      {/* ============================== */}

      <section className="border border-line bg-gesso">
        <div className="border-b border-line px-6 py-5">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-coral">
            Details
          </p>

          <h2 className="mt-2 font-display text-2xl">Artwork Description</h2>

          <p className="mt-2 text-sm text-ink-soft">
            Add descriptive information and metadata for this artwork.
          </p>
        </div>

        <div className="space-y-6 p-6">
          {/* Description */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-ink"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the artwork..."
              required
              rows={6}
              className="flex w-full rounded-md border border-line bg-gesso px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-coral focus:ring-2 focus:ring-coral/20"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Tags */}

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium text-ink">
                Tags
              </label>

              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="abstract, colorful, modern"
                required
                className="border-line bg-gesso text-ink"
              />

              <p className="text-xs text-ink-soft">
                Separate tags with commas.
              </p>
            </div>

            {/* Palette */}

            <div className="space-y-2">
              <label htmlFor="palette" className="text-sm font-medium text-ink">
                Color Palette
                <span className="ml-2 text-xs font-normal text-ink-soft">
                  Optional
                </span>
              </label>

              <Input
                id="palette"
                name="palette"
                value={formData.palette}
                onChange={handleChange}
                placeholder="#FF5733, #F4D03F, #1ABC9C"
                className="border-line bg-gesso text-ink"
              />

              <p className="text-xs text-ink-soft">
                Separate HEX colors with commas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* ARTWORK IMAGE */}
      {/* ============================== */}

      <section className="border border-line bg-gesso">
        <div className="border-b border-line px-6 py-5">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-coral">
            Media
          </p>

          <h2 className="mt-2 font-display text-2xl">Artwork Image</h2>

          <p className="mt-2 text-sm text-ink-soft">
            Upload the primary image for this artwork.
          </p>
        </div>

        <div className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreview ? (
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative aspect-square w-full max-w-md overflow-hidden border border-line bg-gesso-dim">
                <Image
                  src={imagePreview}
                  alt="Artwork preview"
                  fill
                  sizes="448px"
                  className="object-cover"
                  unoptimized={imagePreview.startsWith("blob:")}
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm text-ink-soft">
                  {imageFile ? imageFile.name : "Current artwork image"}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPending}
                    className="border-line gap-2"
                  >
                    <Upload className="size-4" />
                    Replace Image
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={removeImage}
                    disabled={isPending}
                    className="border-line gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-52 w-full flex-col items-center justify-center gap-3 border border-dashed border-line bg-gesso-dim/40 px-6 text-center transition-colors hover:border-coral hover:bg-coral/5"
            >
              <div className="flex size-12 items-center justify-center rounded-full border border-line bg-gesso">
                <ImagePlus className="size-5 text-ink-soft" />
              </div>

              <div>
                <p className="text-sm font-medium text-ink">
                  Upload artwork image
                </p>

                <p className="mt-1 text-xs text-ink-soft">
                  Click to select an image file
                </p>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* ============================== */}
      {/* AVAILABILITY & PRICING */}
      {/* ============================== */}

      <section className="border border-line bg-gesso">
        <div className="border-b border-line px-6 py-5">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-coral">
            Commerce
          </p>

          <h2 className="mt-2 font-display text-2xl">Availability & Pricing</h2>

          <p className="mt-2 text-sm text-ink-soft">
            Set the availability and pricing information.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Status */}

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-ink">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="h-10 w-full rounded-md border border-line bg-gesso px-3 text-sm text-ink outline-none transition-colors focus:border-coral"
            >
              <option value="Available">Available</option>

              <option value="Reserved">Reserved</option>

              <option value="Sold">Sold</option>

              <option value="Not for Sale">Not for Sale</option>
            </select>
          </div>

          {/* Featured */}

          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-3 pb-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="size-4 accent-coral"
              />

              <span className="text-sm text-ink">Feature this artwork</span>
            </label>
          </div>

          {/* Price */}

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-ink">
              Price
              <span className="ml-2 text-xs font-normal text-ink-soft">
                Optional
              </span>
            </label>

            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="border-line bg-gesso text-ink"
            />
          </div>

          {/* Currency */}

          <div className="space-y-2">
            <label htmlFor="currency" className="text-sm font-medium text-ink">
              Currency
            </label>

            <Input
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="PHP"
              maxLength={3}
              className="border-line bg-gesso text-ink"
            />
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* ACTIONS */}
      {/* ============================== */}

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="outline"
          asChild
          disabled={isPending}
          className="border-line bg-gesso text-ink hover:bg-gesso-dim gap-2"
        >
          <Link href="/dashboard/artworks">
            <X className="size-4" />
            Cancel
          </Link>
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-ink text-gesso hover:bg-coral gap-2"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}

          {isPending
            ? isEdit
              ? "Saving Changes..."
              : "Creating Artwork..."
            : isEdit
              ? "Save Changes"
              : "Create Artwork"}
        </Button>
      </div>
    </form>
  );
}
