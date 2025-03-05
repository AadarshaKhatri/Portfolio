import { Types } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface UserModel {
  id: number;
  profile:string | null,
  email: string;
  password: string;
  name: string | null;
  location: string | null;
  bio: string | null;  
  title: string | null;
  born: Date | null;
  description: string | null;
  degree: string | null;

} 


export interface ProjectModel {
  id:number,
  title:string,
  description:string,
  liveLink:string,
  codelink:string,
  Images:string,
  Skills:JsonValue,
  authorId:number
}


export interface PostModel{
  id:number
  caption:string
  images:string
  createdAt:Date
  updatedAt:Date
  pinned:boolean
  tags:JsonValue
  authorId:number
} 

export enum ExperienceType {
  INTERNSHIP = 'INTERNSHIP',
  COMMUNITY_HOURS = 'COMMUNITY_HOURS',
  WORK = 'WORK',
}

export interface ExperienceModel {
  id: number;
  type: ExperienceType; // Now matches Prisma's Types enum
  description: string;
  company: string;
  logo: string;
  skills: JsonValue;
  authorId: number;
  title: string;
}


export interface TechnologiesModel {
  id:number
  title:string
  Images:string

}


export interface LanguagesModel{
  id:number
  lang:string
  Images:string
}

export type ResponseTypes  = {
  error?:string | null
  success?: boolean
  message?:string | null
} | undefined
