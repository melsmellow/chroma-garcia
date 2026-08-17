"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { type Artist } from "@/actions/artists";
import { useArtist } from "@/hooks/useArtist";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ArtistFormProps {
  mode: "create" | "edit";
  initialData?: Artist;
}

export default function ArtistForm({
  mode,
  initialData,
}: ArtistFormProps) {
  const {
    isEdit,
    formData,
    handleChange,
    fileInputRef,
    portraitFile,
    portraitPreview,
    handlePortraitChange,
    removePortrait,
    isPending,
    handleSubmit,
  } = useArtist({
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
          <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
            Artist Information
          </p>

          <h2 className="mt-2 font-display text-2xl">
            Basic Details
          </h2>

          <p className="mt-2 text-sm text-ink-soft">
            Enter the artist&apos;s primary profile information.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-ink"
            >
              Artist Name
            </label>

            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="slug"
              className="text-sm font-medium text-ink"
            >
              Slug
            </label>

            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="juan-dela-cruz"
              required
              className="border-line bg-gesso text-ink"
            />

            <p className="text-xs text-ink-soft">
              Used in the artist&apos;s public URL.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="artStyle"
              className="text-sm font-medium text-ink"
            >
              Art Style
            </label>

            <Input
              id="artStyle"
              name="artStyle"
              value={formData.artStyle}
              onChange={handleChange}
              placeholder="Contemporary Art"
              required
              className="border-line bg-gesso text-ink"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="medium"
              className="text-sm font-medium text-ink"
            >
              Medium
            </label>

            <Input
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              placeholder="Acrylic on Canvas"
              className="border-line bg-gesso text-ink"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="bio"
              className="text-sm font-medium text-ink"
            >
              Biography
            </label>

            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a short biography about the artist..."
              required
              rows={6}
              className="
                flex w-full rounded-md border border-line
                bg-gesso px-3 py-2 text-sm text-ink
                outline-none placeholder:text-ink-soft
                focus:border-coral
                focus:ring-2
                focus:ring-coral/20
              "
            />
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* ARTIST PORTRAIT */}
      {/* ============================== */}

      <section className="border border-line bg-gesso">
        <div className="border-b border-line px-6 py-5">
          <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
            Media
          </p>

          <h2 className="mt-2 font-display text-2xl">
            Artist Portrait
          </h2>

          <p className="mt-2 text-sm text-ink-soft">
            Upload a portrait image for the artist.
          </p>
        </div>

        <div className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePortraitChange}
            className="hidden"
          />

          {portraitPreview ? (
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative aspect-square w-full max-w-[240px] overflow-hidden border border-line bg-gesso-dim">
                <Image
                  src={portraitPreview}
                  alt="Artist portrait preview"
                  fill
                  sizes="240px"
                  className="object-cover"
                  unoptimized={portraitPreview.startsWith("blob:")}
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm text-ink-soft">
                  {portraitFile
                    ? portraitFile.name
                    : "Current artist portrait"}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={isPending}
                    className="border-line gap-2"
                  >
                    <Upload className="size-4" />
                    Replace Image
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={removePortrait}
                    disabled={isPending}
                    className="border-line text-destructive hover:text-destructive gap-2"
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
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="
                flex min-h-52 w-full flex-col items-center
                justify-center gap-3 border border-dashed
                border-line bg-gesso-dim/40 px-6
                text-center transition-colors
                hover:border-coral hover:bg-coral/5
              "
            >
              <div className="flex size-12 items-center justify-center rounded-full border border-line bg-gesso">
                <ImagePlus className="size-5 text-ink-soft" />
              </div>

              <div>
                <p className="text-sm font-medium text-ink">
                  Upload artist portrait
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
      {/* SOCIAL LINKS */}
      {/* ============================== */}

      <section className="border border-line bg-gesso">
        <div className="border-b border-line px-6 py-5">
          <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
            Socials
          </p>

          <h2 className="mt-2 font-display text-2xl">
            External Links
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="space-y-2">
            <label
              htmlFor="instagram"
              className="text-sm font-medium text-ink"
            >
              Instagram
            </label>

            <Input
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="border-line bg-gesso text-ink"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="facebook"
              className="text-sm font-medium text-ink"
            >
              Facebook
            </label>

            <Input
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="border-line bg-gesso text-ink"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="website"
              className="text-sm font-medium text-ink"
            >
              Website
            </label>

            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://..."
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
          className="border-line bg-gesso text-ink hover:bg-gesso-dim"
        >
          <Link href="/dashboard/artists">
            <X className="size-4" />
            Cancel
          </Link>
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-ink text-gesso hover:bg-coral"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}

          {isPending
            ? isEdit
              ? "Saving Changes..."
              : "Creating Artist..."
            : isEdit
              ? "Save Changes"
              : "Create Artist"}
        </Button>
      </div>
    </form>
  );
}