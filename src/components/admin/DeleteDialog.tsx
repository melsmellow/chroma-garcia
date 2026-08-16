import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface AdminLoadingProps {
  artistToDelete: { id: string; name: string } | null;
  isDeleting: boolean;
  setArtistToDelete: (artist: { id: string; name: string } | null) => void;
  handleDelete: () => void;
}

export default function DeleteDialog({
  artistToDelete,
  isDeleting,
  setArtistToDelete,
  handleDelete,
}: AdminLoadingProps) {
  return (
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
  );
}
