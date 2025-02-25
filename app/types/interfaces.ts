export interface UserModel {
  id: number;
  profile:string,
  email: string;
  password: string;
  name: string;
  location: string;
  bio: string;  
  title: string;
  born: Date;
  description: string;
  degree: string;
}


export interface ProjectModel {
  id:number,
  title:string,
  description:string,
  liveLink:string,
  codelink:string,
  Images:string,
  Skills:string[],
  authorId:number
}


export interface PostModel{
  id:number
  caption:string
  images:string
  createdAt:Date
  updatedAt:Date
  pinned:boolean
  tags:string[]
  authorId:number
}