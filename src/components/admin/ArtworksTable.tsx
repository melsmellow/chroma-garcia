"use client";

import { MoreHorizontal, Search, Star, StarOff } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { useTableControl } from "@/hooks/useTableControl";
import { useArtwork } from "@/hooks/useArtwork";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginatedArtworksResponse } from "@/types/artworks";
import { getArtworks } from "@/actions/artworks";

import DeleteDialog from "./DeleteDialog";

interface ArtworksTableProps {
  initialData: PaginatedArtworksResponse;
}

const PAGE_SIZES = [10, 20, 30, 40, 50];

export default function ArtworksTable({ initialData }: ArtworksTableProps) {
  const {
    data,
    limit,
    search,
    setSearch,
    isPending,
    refresh,
    handlePrevious,
    handleNext,
    handleLimitChange,
  } = useTableControl({
    initialData,
    initialPage: initialData.pagination.page,
    initialLimit: initialData.pagination.limit,
    fetchData: getArtworks,
  });

  const { artworkToDelete, setArtworkToDelete, isDeleting, handleDelete } =
    useArtwork({
      onDeleted: refresh,
    });

  const {
    page: currentPage,
    limit: currentLimit,
    total,
    totalPages,
  } = data.pagination;

  const startItem = total === 0 ? 0 : (currentPage - 1) * currentLimit + 1;

  const endItem = Math.min(currentPage * currentLimit, total);

  return (
    <div className="space-y-5">
      {/* ============================== */}
      {/* TABLE CONTROLS */}
      {/* ============================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}

        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-soft" />

          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search artworks..."
            className="border-line bg-gesso pl-9 text-ink placeholder:text-ink-soft focus-visible:ring-coral"
          />
        </div>

        {/* Page size */}

        <div className="flex items-center gap-3 text-sm text-ink-soft">
          <span className="whitespace-nowrap">Rows per page</span>

          <select
            value={limit}
            onChange={handleLimitChange}
            disabled={isPending}
            className="
              h-9
              rounded-md
              border
              border-line
              bg-gesso
              px-3
              text-sm
              text-ink
              outline-none
              transition-colors
              hover:border-ink-soft
              focus:border-coral
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ============================== */}
      {/* TABLE */}
      {/* ============================== */}

      <div className="overflow-hidden rounded-lg border border-line bg-gesso">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-line hover:bg-transparent">
                <TableHead className="text-ink-soft">Artwork</TableHead>

                <TableHead className="text-ink-soft">Artist</TableHead>

                <TableHead className="text-ink-soft">Category</TableHead>

                <TableHead className="text-ink-soft">Medium</TableHead>

                <TableHead className="text-ink-soft">Year</TableHead>

                <TableHead className="text-ink-soft">Status</TableHead>

                <TableHead className="text-center text-ink-soft">
                  Featured
                </TableHead>

                <TableHead className="w-[70px] text-right text-ink-soft">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading */}

              {isPending && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-ink-soft"
                  >
                    Loading artworks...
                  </TableCell>
                </TableRow>
              )}

              {/* Empty state */}

              {!isPending && data.artworks.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-ink-soft"
                  >
                    No artworks found.
                  </TableCell>
                </TableRow>
              )}

              {/* Artwork rows */}

              {!isPending &&
                data.artworks.map((artwork) => (
                  <TableRow
                    key={artwork._id}
                    className="border-line transition-colors hover:bg-gesso-dim"
                  >
                    {/* Artwork */}

                    <TableCell>
                      <div className="flex min-w-[240px] items-center gap-3">
                        {/* Artwork Image */}

                        <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-line bg-gesso-dim">
                          {artwork.imageUrl ? (
                            <Image
                              src={artwork.imageUrl}
                              alt={artwork.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center font-display text-sm text-ink-soft">
                              {artwork.title.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Artwork Details */}

                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">
                            {artwork.title}
                          </p>

                          <p className="mt-1 line-clamp-1 text-xs text-ink-soft">
                            {artwork.dimensions}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Artist */}

                    <TableCell className="text-ink">
                      {typeof artwork.artist === "object"
                        ? artwork.artist.name
                        : "—"}
                    </TableCell>

                    {/* Category */}

                    <TableCell className="text-ink">
                      {artwork.category}
                    </TableCell>

                    {/* Medium */}

                    <TableCell className="text-ink-soft">
                      {artwork.medium}
                    </TableCell>

                    {/* Year */}

                    <TableCell className="font-mono text-xs text-ink-soft">
                      {artwork.year}
                    </TableCell>

                    {/* Status */}

                    <TableCell>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${
                          artwork.status === "Available"
                            ? "border-green-500/30 bg-green-500/10 text-green-600"
                            : artwork.status === "Reserved"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-600"
                              : artwork.status === "Sold"
                                ? "border-coral/30 bg-coral/10 text-coral"
                                : "border-line bg-gesso-dim text-ink-soft"
                        }`}
                      >
                        {artwork.status}
                      </span>
                    </TableCell>

                    {/* Featured */}

                    <TableCell className="text-center">
                      {artwork.isFeatured ? (
                        <Star className="mx-auto size-4 fill-ochre text-ochre" />
                      ) : (
                        <StarOff className="mx-auto size-4 text-ink-soft" />
                      )}
                    </TableCell>

                    {/* Actions */}

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-ink-soft hover:text-ink"
                              aria-label={`Actions for ${artwork.title}`}
                            />
                          }
                        >
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            render={
                              <Link
                                href={`/dashboard/artworks/${artwork.slug}/edit`}
                              />
                            }
                          >
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              setArtworkToDelete({
                                id: artwork._id,
                                name: artwork.title,
                              });
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ============================== */}
      {/* PAGINATION */}
      {/* ============================== */}

      <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-soft">
          Showing {startItem}-{endItem} of {total} artworks
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1 || isPending}
            onClick={() => handlePrevious(totalPages)}
            className="border-line bg-gesso text-ink hover:bg-gesso-dim"
          >
            Previous
          </Button>

          <span className="whitespace-nowrap text-ink-soft">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages || isPending}
            onClick={() => handleNext(totalPages)}
            className="border-line bg-gesso text-ink hover:bg-gesso-dim"
          >
            Next
          </Button>
        </div>
      </div>

      {/* ============================== */}
      {/* DELETE DIALOG */}
      {/* ============================== */}
<DeleteDialog
  itemToDelete={artworkToDelete}
  entityName="artwork"
  isDeleting={isDeleting}
  setItemToDelete={setArtworkToDelete}
  handleDelete={handleDelete}
/>
    </div>
  );
}
