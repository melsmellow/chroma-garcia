"use client";

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

interface DeleteItem {
  id: string;
  name: string;
}

interface DeleteDialogProps {
  itemToDelete: DeleteItem | null;
  entityName: "artist" | "artwork";
  isDeleting: boolean;
  setItemToDelete: (item: DeleteItem | null) => void;
  handleDelete: () => void;
}

export default function DeleteDialog({
  itemToDelete,
  entityName,
  isDeleting,
  setItemToDelete,
  handleDelete,
}: DeleteDialogProps) {
  const open = Boolean(itemToDelete?.id && itemToDelete?.name);

  const capitalizedEntity =
    entityName.charAt(0).toUpperCase() + entityName.slice(1);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isDeleting) {
          setItemToDelete(null);
        }
      }}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="text-lg font-medium">
            Delete {itemToDelete?.name}?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6">
            This action cannot be undone. This will permanently delete the{" "}
            {entityName} and its associated information.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 gap-2 sm:justify-end">
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-9 px-4"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting || !itemToDelete}
            className="h-9 px-4"
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              `Delete ${capitalizedEntity}`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}