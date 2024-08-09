"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteChatResult } from "@/app/auth/callback/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const DeleteBtn = ({ chatResultId }: { chatResultId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteChatResult"],
    mutationFn: async () => deleteChatResult(chatResultId),
    onSuccess: () => {
      toast.success("Chat result deleted!");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <main>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="mt-3">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              chat result.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};
export default DeleteBtn;
