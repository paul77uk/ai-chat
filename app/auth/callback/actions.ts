"use server";

import prisma from "@/app/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function checkAuthStatus() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  if (!user) return { success: false };

  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  // sign up user if they don't exist
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.given_name + " " + user.family_name,
        image: user.picture,
      },
    });
  }

  console.log("ExistingUser:", existingUser);

  return { success: true };
}

export async function createChatResult({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return { success: false };

  const newChatResult = await prisma.chat.create({
    data: {
      title,
      message,
      userId: user.id,
    },
  });

  revalidatePath("/api/saved-results");

  return { success: true, newChatResult };
}

export const deleteChatResult = async (id: string) => {
  await prisma.chat.delete({ where: { id } });
  revalidatePath("/api/saved-results");
};
