"use client";

import { useEffect, useState } from "react";
import type {
  Resume,
  Project,
  Certification,
  Education,
  Experience,
} from "../types";

const emptyResume: Resume = {
  name: "",
  email: "",
  phone: "",
  summary: "",
  skills: [""],
  projects: [
    {
      name: "",
      technologies: "",
      description: "",
      link: "",
    },
  ],
  certifications: [
    {
      name: "",
      organization: "",
      date: "",
      link: "",
    },
  ],
  education: [
    {
      degree: "",
      school: "",
      year: "",
    },
  ],
  experience: [
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
};

export function useResume() {
  const [resume, setResume] = useState<Resume>(emptyResume);
    useEffect(() => {
    const savedResume = localStorage.getItem("resume-data");

    if (savedResume) {
      try {
        setResume(JSON.parse(savedResume));
      } catch {
        localStorage.removeItem("resume-data");
      }
    }
  }, []);

  const updateResume = (
    field: keyof Resume,
    value:
      | string
      | string[]
      | Project[]
      | Certification[]
      | Education[]
      | Experience[]
  ) => {
    setResume((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return {
    resume,
    setResume,
    updateResume,
  };
}