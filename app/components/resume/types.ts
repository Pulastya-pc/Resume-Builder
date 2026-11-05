export type Education = {
  degree: string;
  school: string;
  year: string;
};

export type Experience = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  name: string;
  technologies: string;
  description: string;
  link: string;
};

export type Certification = {
  name: string;
  organization: string;
  date: string;
  link: string;
};

export type Resume = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  experience: Experience[];
};

export type ResumeTemplate =
  | "classic"
  | "modern"
  | "minimal";