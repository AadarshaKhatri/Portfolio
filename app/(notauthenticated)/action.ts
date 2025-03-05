import { ExperinceModel, LanguagesModel, PostModel, ProjectModel, TechnologiesModel, UserModel } from "../types/interfaces";



export async function getProfile(): Promise<UserModel | null> {
    try{
    const response = await fetch("/api/user");
    if (!response.ok) throw new Error("Failed to fetch User");
    return await response.json();
    }catch {
      return null ;
    }

}

export async function getPost(): Promise<PostModel []> {
  try {
    const response = await fetch("/api/post");
    if (!response.ok) throw new Error("Failed to fetch Post");
    return await response.json();
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<ProjectModel []> {
  try {
    const response = await fetch("/api/projects");
    if(!response.ok) throw new Error("Failed to fetch the projects!")
      return await response.json();
  } catch (error) {
    console.log(error);
    return []
  }
}

export async function getTechnologies(): Promise<TechnologiesModel[]> {
  try {
    const response = await fetch("/api/tech");
    if (!response.ok) throw new Error("Failed to fetch technologies");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getExperience(): Promise<ExperinceModel []> {
  try {
    const response = await fetch("/api/experience");
    if (!response.ok) throw new Error("Failed to fetch Experience");
    return await response.json();
  } catch {
    return [];
  }
}




export async function getLanguages(): Promise<LanguagesModel []> {
  try {
    const response = await fetch("/api/lang");
    if (!response.ok) throw new Error("Failed to fetch Lanuages");
    return await response.json();
  } catch {
    return [];
  }
}
