"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { updateChatResult } from "@/app/auth/callback/actions";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

const EditBtn = ({
  chatResultId,
  title,
  message,
}: {
  chatResultId: string;
  title: string;
  message: string;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      message,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateChatResult"],
    mutationFn: async () =>
      updateChatResult({
        id: chatResultId,
        title: form.getValues("title"),
        message: form.getValues("message"),
      }),
    onSuccess: () => {
      toast.success("Chat result updated!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to update chat result");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate();
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[250px]"
                      placeholder="Message"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>
        {/* <EditForm title={title} message={message} chatResultId={chatResultId} /> */}
      </DialogContent>
    </Dialog>
  );
};
export default EditBtn;
