import { getUser } from "../(authenticated)/sessions";
import prisma from "../lib/db";
import { ExperinceModel, LanguagesModel, PostModel, ProjectModel, TechnologiesModel, UserModel } from "../types/interfaces";



export async function getProfile(): Promise<UserModel []> {
  try {
    const user = await getUser();
    if (!user) return [];
    return await prisma.user_models.findMany({ where: { id: Number(user.userId) } });
  } catch {
    return [];
  }
}

export async function getPost(): Promise<PostModel []> {
  try {
    const user = await getUser();
    if (!user) return [];
    return await prisma.post.findMany({ where: { authorId: Number(user.userId) } });
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<ProjectModel []> {
  try {
    const user = await getUser();
    if (!user) return [];
    return await prisma.projects.findMany({ where: { authorId: Number(user.userId) } });
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<ExperinceModel []> {
  try {
    const user = await getUser();
    if (!user) return [];
    return await prisma.experience.findMany({ where: { authorId: Number(user.userId) } });
  } catch {
    return [];
  }
}

export async function getTechnologies(): Promise<TechnologiesModel[]> {
  try {
    const technologies = await prisma.technologies.findMany();
    console.log("Tech:",technologies); // Check what data is being fetched
    return technologies;
  } catch {
    return [];
  }
}


export async function getLanguages(): Promise<LanguagesModel []> {
  try {
    const user = await getUser();
    if (!user) return [];
    return await prisma.languages.findMany({ where: { authorId: Number(user.userId) } });
  } catch {
    return [];
  }
}
