"use client";

import { MoreHorizontal, Search } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

import {
  deleteArtist,
  getArtists,
  type PaginatedArtistsResponse,
} from "@/actions/artists";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";

interface ArtistsTableProps {
  initialData: PaginatedArtistsResponse;
}

const PAGE_SIZES = [10, 20, 30, 40, 50];

export default function ArtistsTable({ initialData }: ArtistsTableProps) {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const [data, setData] = useState<PaginatedArtistsResponse>(initialData);

  const [page, setPage] = useState(initialData.pagination.page);

  const [limit, setLimit] = useState(initialData.pagination.limit);
  const [search, setSearch] = useState("");

  const [isPending, startTransition] = useTransition();

  const [artistToDelete, setArtistToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [isDeleting, startDeleteTransition] = useTransition();

  /**
   * Fetch artists from the backend through
   * the Next.js Server Action.
   */
  function fetchArtists({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }) {
    startTransition(async () => {
      try {
        const result = await getArtists({
          page,
          limit,
          search,
        });

        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    });
  }

  /**
   * Debounced search.
   *
   * Waits 400ms after the user stops typing
   * before calling the API.
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      setPage(1);

      fetchArtists({
        page: 1,
        limit,
        search,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  function handlePrevious() {
    if (page <= 1) return;

    const nextPage = page - 1;

    setPage(nextPage);

    fetchArtists({
      page: nextPage,
      limit,
      search,
    });
  }

  function handleNext() {
    if (page >= data.pagination.totalPages) return;

    const nextPage = page + 1;

    setPage(nextPage);

    fetchArtists({
      page: nextPage,
      limit,
      search,
    });
  }

  function handleLimitChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLimit = Number(event.target.value);

    setLimit(nextLimit);
    setPage(1);

    fetchArtists({
      page: 1,
      limit: nextLimit,
      search,
    });
  }

  const {
    page: currentPage,
    limit: currentLimit,
    total,
    totalPages,
  } = data.pagination;

  const startItem = total === 0 ? 0 : (currentPage - 1) * currentLimit + 1;

  const endItem = Math.min(currentPage * currentLimit, total);

  const handleDelete = () => {
    startDeleteTransition(async () => {
      if (artistToDelete === null) return;
      try {
        const result = await deleteArtist(artistToDelete.id);

        if (result.success) {
          toast.add({
            type: "success",
            title: "Artist deleted",
            description: result.message || "Artist deleted successfully.",
          });

          await fetchArtists({
            page,
            limit,
            search,
          });
        } else {
          toast.add({
            type: "destructive",
            title: "Failed to delete artist",
            description: result.message || "Failed to delete artist.",
          });
        }
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
  };

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
            onClick={handlePrevious}
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
            onClick={handleNext}
            className="border-line bg-gesso text-ink hover:bg-gesso-dim"
          >
            Next
          </Button>
        </div>
      </div>
      <AlertDialog
        open={artistToDelete !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setArtistToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {artistToDelete?.name}?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              artist and their associated information.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Artist"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
