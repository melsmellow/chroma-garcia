"use client";

import { MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getArtists, type PaginatedArtistsResponse } from "@/actions/artists";

import { useArtist } from "@/hooks/useArtist";
import { useTableControl } from "@/hooks/useTableControl";

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

import DeleteDialog from "./DeleteDialog";

interface ArtistsTableProps {
  initialData: PaginatedArtistsResponse;
}

const PAGE_SIZES = [10, 20, 30, 40, 50];

export default function ArtistsTable({ initialData }: ArtistsTableProps) {
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
    fetchData: getArtists,
  });

  const { artistToDelete, setArtistToDelete, isDeleting, handleDelete } =
    useArtist({
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
            placeholder="Search artists..."
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
                <TableHead className="text-ink-soft">Artist</TableHead>

                <TableHead className="text-ink-soft">Slug</TableHead>

                <TableHead className="text-ink-soft">Art Style</TableHead>

                <TableHead className="text-ink-soft">Medium</TableHead>

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
                    colSpan={5}
                    className="h-32 text-center text-ink-soft"
                  >
                    Loading artists...
                  </TableCell>
                </TableRow>
              )}

              {/* Empty state */}

              {!isPending && data.artists.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-ink-soft"
                  >
                    No artists found.
                  </TableCell>
                </TableRow>
              )}

              {/* Artist rows */}

              {!isPending &&
                data.artists.map((artist) => (
                  <TableRow
                    key={artist._id}
                    className="border-line transition-colors hover:bg-gesso-dim"
                  >
                    {/* Artist */}

                    <TableCell>
                      <div className="flex min-w-[220px] items-center gap-3">
                        {/* Artist Image */}

                        <div className="relative size-11 shrink-0 overflow-hidden rounded-md border border-line bg-gesso-dim">
                          {artist.portraitUrl ? (
                            <Image
                              src={artist.portraitUrl}
                              alt={artist.name}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center font-display text-sm text-ink-soft">
                              {artist.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Artist Details */}

                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">
                            {artist.name}
                          </p>

                          <p className="mt-1 line-clamp-1 text-xs text-ink-soft">
                            {artist.bio}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Slug */}

                    <TableCell className="font-mono text-xs text-ink-soft">
                      {artist.slug}
                    </TableCell>

                    {/* Art style */}

                    <TableCell className="text-ink">
                      {artist.artStyle || "—"}
                    </TableCell>

                    {/* Medium */}

                    <TableCell className="text-ink-soft">
                      {artist.medium || "—"}
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
                              aria-label={`Actions for ${artist.name}`}
                            />
                          }
                        >
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            render={
                              <Link
                                href={`/dashboard/artists/${artist.slug}/edit`}
                              />
                            }
                          >
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              setArtistToDelete({
                                id: artist._id,
                                name: artist.name,
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
          Showing {startItem}-{endItem} of {total} artists
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

      <DeleteDialog
        artistToDelete={artistToDelete}
        isDeleting={isDeleting}
        setArtistToDelete={setArtistToDelete}
        handleDelete={handleDelete}
      />
    </div>
  );
}
