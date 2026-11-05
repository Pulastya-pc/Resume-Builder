"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import type {
  Resume,
  ResumeTemplate,
  Project,
  Certification,
  Education,
  Experience,
} from "./components/resume/types";
import ResumeEditor from "./components/resume/ResumeEditor";
import { useResume } from "./components/resume/hooks/useResume";
import ResumePreviewPanel from "./components/resume/ResumePreviewPanel";
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

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-red-600 focus:ring-2 focus:ring-red-100";

const textareaClass =
  "w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-red-600 focus:ring-2 focus:ring-red-100";

const labelClass =
  "mb-2 block text-sm font-semibold text-neutral-800";

const addButtonClass =
  "inline-flex items-center gap-2 rounded-xl border border-black bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 hover:border-red-700";

const removeButtonClass =
  "inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-600 hover:text-white";

export default function Home() {
  const { resume, setResume, updateResume } = useResume();
  const [selectedTemplate, setSelectedTemplate] =
  useState<ResumeTemplate>("classic");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

  const [saveMessage, setSaveMessage] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);



  // ---------------------------------------
  // VALIDATION
  // ---------------------------------------

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const isValidName = (name: string) => {
    return /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]{1,}$/.test(name.trim());
  };


  // ---------------------------------------
  // PERSONAL INFORMATION
  // ---------------------------------------

  const handleNameChange = (value: string) => {
    updateResume("name", value);

    if (!value.trim()) {
      setNameError("");
      return;
    }

    if (!isValidName(value)) {
      setNameError("Please enter a valid name.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (value: string) => {
    updateResume("email", value);

    if (!value.trim()) {
      setEmailError("");
      return;
    }

    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (value: string) => {
    updateResume("phone", value);

    if (!value.trim()) {
      setPhoneError("");
      return;
    }

    if (!isValidPhone(value)) {
      setPhoneError("Phone number should contain at least 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  // ---------------------------------------
  // EDUCATION
  // ---------------------------------------

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = resume.education.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [field]: value,
          }
        : item
    );

    updateResume("education", updatedEducation);
  };

  const addEducation = () => {
    updateResume("education", [
      ...resume.education,
      {
        degree: "",
        school: "",
        year: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    updateResume(
      "education",
      resume.education.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  // ---------------------------------------
  // EXPERIENCE
  // ---------------------------------------

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperience = resume.experience.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [field]: value,
          }
        : item
    );

    updateResume("experience", updatedExperience);
  };

  const addExperience = () => {
    updateResume("experience", [
      ...resume.experience,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    updateResume(
      "experience",
      resume.experience.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  // ---------------------------------------
  // SKILLS
  // ---------------------------------------

  const updateSkill = (index: number, value: string) => {
    const updatedSkills = resume.skills.map((skill, skillIndex) =>
      skillIndex === index ? value : skill
    );

    updateResume("skills", updatedSkills);
  };

  const addSkill = () => {
    updateResume("skills", [...resume.skills, ""]);
  };

  const removeSkill = (index: number) => {
    updateResume(
      "skills",
      resume.skills.filter((_, skillIndex) => skillIndex !== index)
    );
  };

  // ---------------------------------------
  // PROJECTS
  // ---------------------------------------

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = resume.projects.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [field]: value,
          }
        : item
    );

    updateResume("projects", updatedProjects);
  };

  const addProject = () => {
    updateResume("projects", [
      ...resume.projects,
      {
        name: "",
        technologies: "",
        description: "",
        link: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    updateResume(
      "projects",
      resume.projects.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  // ---------------------------------------
  // CERTIFICATIONS
  // ---------------------------------------

  const updateCertification = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    const updatedCertifications = resume.certifications.map(
      (item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
    );

    updateResume("certifications", updatedCertifications);
  };

  const addCertification = () => {
    updateResume("certifications", [
      ...resume.certifications,
      {
        name: "",
        organization: "",
        date: "",
        link: "",
      },
    ]);
  };

  const removeCertification = (index: number) => {
    updateResume(
      "certifications",
      resume.certifications.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  // ---------------------------------------
  // SAVE / RESET
  // ---------------------------------------

  const saveResume = () => {
    if (resume.email && !isValidEmail(resume.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (resume.phone && !isValidPhone(resume.phone)) {
      setPhoneError("Phone number should contain at least 10 digits.");
      return;
    }

    if (resume.name && !isValidName(resume.name)) {
      setNameError("Please enter a valid name.");
      return;
    }

    localStorage.setItem("resume-data", JSON.stringify(resume));

    setSaveMessage("Resume saved successfully.");

    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const resetResume = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your resume?"
    );

    if (!confirmed) return;

    localStorage.removeItem("resume-data");

    setResume(emptyResume);

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setSaveMessage("");
  };

  // ---------------------------------------
  // RESUME COMPLETION
  // ---------------------------------------

  const hasEducation = resume.education.some(
    (item) =>
      item.degree.trim() ||
      item.school.trim() ||
      item.year.trim()
  );

  const hasExperience = resume.experience.some(
    (item) =>
      item.jobTitle.trim() ||
      item.company.trim() ||
      item.description.trim()
  );

  const hasSkills = resume.skills.some(
    (skill) => skill.trim() !== ""
  );

  const hasProjects = resume.projects.some(
    (item) =>
      item.name.trim() ||
      item.technologies.trim() ||
      item.description.trim()
  );

  const hasCertifications = resume.certifications.some(
    (item) =>
      item.name.trim() ||
      item.organization.trim() ||
      item.date.trim()
  );

  const completionItems = [
    Boolean(resume.name.trim()),
    Boolean(resume.email.trim()),
    Boolean(resume.phone.trim()),
    Boolean(resume.summary.trim()),
    hasEducation,
    hasExperience,
    hasSkills,
    hasProjects,
    hasCertifications,
  ];

  const completion = Math.round(
    (completionItems.filter(Boolean).length /
      completionItems.length) *
      100
  );

  // ---------------------------------------
  // DOWNLOAD PDF
  // ---------------------------------------

const downloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
  scale: 2,
  useCORS: true,
  backgroundColor: "#ffffff",

  onclone: (clonedDocument) => {
    const elements = clonedDocument.querySelectorAll("*");

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const styles = clonedDocument.defaultView?.getComputedStyle(htmlElement);

      if (!styles) return;

      // Replace unsupported lab() text colors
      if (styles.color.includes("lab(")) {
        htmlElement.style.color = "#000000";
      }

      // Replace unsupported lab() background colors
      if (styles.backgroundColor.includes("lab(")) {
        htmlElement.style.backgroundColor = "#ffffff";
      }

      // Replace unsupported lab() border colors
      if (styles.borderColor.includes("lab(")) {
        htmlElement.style.borderColor = "#d1d5db";
      }

      // Shadows aren't essential for the PDF
      htmlElement.style.boxShadow = "none";
    });
  },
});
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const margin = 8;

    const imageWidth = pageWidth - margin * 2;

    const imageHeight =
      (canvas.height * imageWidth) / canvas.width;

    pdf.addImage(
      imageData,
      "PNG",
      margin,
      margin,
      imageWidth,
      imageHeight
    );

    const safeName =
      resume.name.trim().replace(/[^a-z0-9]+/gi, "_") ||
      "resume";

    pdf.save(`${safeName}_resume.pdf`);
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-6 text-black md:px-8 md:py-10">
      {/* APP HEADER */}

      <header className="mx-auto mb-8 max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-2 w-10 rounded-full bg-red-600" />

              <span className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                Resume Builder
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Build your resume.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
              Fill in your details and watch your professional resume
              come together in real time.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4">
            <div className="mb-2 flex items-center justify-between gap-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Completion
              </span>

              <span className="text-sm font-bold text-white">
                {completion}%
              </span>
            </div>

            <div className="h-2 w-44 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-red-600 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        {/* -------------------------------- */}
        {/* RESUME FORM */}
        {/* -------------------------------- */}

        <ResumeEditor
  resume={resume}
  emailError={emailError}
  phoneError={phoneError}
  nameError={nameError}
  saveMessage={saveMessage}
  handleNameChange={handleNameChange}
  handleEmailChange={handleEmailChange}
  handlePhoneChange={handlePhoneChange}
  updateResume={updateResume}
  addEducation={addEducation}
  updateEducation={updateEducation}
  removeEducation={removeEducation}
  addExperience={addExperience}
  updateExperience={updateExperience}
  removeExperience={removeExperience}
  addSkill={addSkill}
  updateSkill={updateSkill}
  removeSkill={removeSkill}
  addProject={addProject}
  updateProject={updateProject}
  removeProject={removeProject}
  addCertification={addCertification}
  updateCertification={updateCertification}
  removeCertification={removeCertification}
  saveResume={saveResume}
  resetResume={resetResume}
/>

        {/* -------------------------------- */}
        {/* PREVIEW */}
        {/* -------------------------------- */}
<ResumePreviewPanel
  resume={resume}
  selectedTemplate={selectedTemplate}
  setSelectedTemplate={setSelectedTemplate}
  previewRef={previewRef}
  downloadPDF={downloadPDF}
/>
      </div>
    </main>
  );
}