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
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
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

export default function Home() {
  const { resume, setResume, updateResume } = useResume();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
  useState<ResumeTemplate>("classic");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

  const [saveMessage, setSaveMessage] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session?.user.id) return;
    let cancelled = false;
    const userId = session.user.id;
    const localOwner = localStorage.getItem("resume-data-owner");
    const accountKey = `resume-data:${userId}`;
    const accountCopy = localStorage.getItem(accountKey);
    if (localOwner && localOwner !== userId) setResume(emptyResume);
    fetch("/api/resume")
      .then(async (response) => {
        if (!response.ok) throw new Error("Cloud storage is unavailable.");
        return response.json();
      })
      .then((result: { resume: Resume | null }) => {
        if (cancelled) return;
        if (result.resume) {
          setResume(result.resume);
          localStorage.setItem(accountKey, JSON.stringify(result.resume));
          localStorage.setItem("resume-data-owner", userId);
        } else if (accountCopy) {
          const parsed: unknown = JSON.parse(accountCopy);
          setResume(parsed as Resume);
        } else if (!localOwner) {
          // Keep the existing anonymous browser resume available to migrate to the first account.
        } else {
          setResume(emptyResume);
        }
      })
      .catch(() => {
        if (!cancelled) setSaveMessage("Signed in, but cloud storage is not ready yet.");
      });
    return () => { cancelled = true; };
  }, [session?.user.id, setResume]);

  const submitAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthBusy(true);
    setAuthMessage("");
    try {
      const result = authMode === "sign-up"
        ? await authClient.signUp.email({ name: authName.trim(), email: authEmail.trim(), password: authPassword })
        : await authClient.signIn.email({ email: authEmail.trim(), password: authPassword });
      if (result.error) setAuthMessage(result.error.message ?? "Could not sign in.");
      else {
        setAuthPassword("");
        setAuthMessage(authMode === "sign-up" ? "Account created." : "Signed in.");
      }
    } catch {
      setAuthMessage("Could not connect to authentication. Check your database setup.");
    } finally {
      setAuthBusy(false);
    }
  };



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

  const saveResume = async () => {
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

    if (session?.user.id) {
      localStorage.setItem(`resume-data:${session.user.id}`, JSON.stringify(resume));
      localStorage.setItem("resume-data-owner", session.user.id);
    } else {
      localStorage.setItem("resume-data", JSON.stringify(resume));
    }

    if (session?.user.id) {
      try {
        const response = await fetch("/api/resume", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resume),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Cloud save failed.");
        setSaveMessage("Resume saved on this device and to your account.");
      } catch {
        setSaveMessage("Saved on this device. Cloud save failed; check your database setup.");
      }
    } else {
      setSaveMessage("Resume saved on this device. Sign in to save it to your account.");
    }

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
    if (session?.user.id) {
      localStorage.removeItem(`resume-data:${session.user.id}`);
      fetch("/api/resume", { method: "DELETE" })
        .then((response) => {
          if (!response.ok) setSaveMessage("This device was reset, but the cloud copy could not be removed.");
        })
        .catch(() => setSaveMessage("This device was reset, but the cloud copy could not be removed."));
    }

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
        {!session?.user && (
          <nav aria-label="Account" className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/login" className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">Sign in</Link>
            <Link href="/signup" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">Create account</Link>
          </nav>
        )}
        <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-white">
          {session?.user ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-neutral-300">Signed in as <span className="font-semibold text-white">{session.user.email}</span>. Your cloud resume is private to your account.</p>
              <button type="button" onClick={async () => { await authClient.signOut(); setResume(emptyResume); }} className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-semibold hover:bg-neutral-800">Sign out</button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-[1fr_1.2fr] md:items-center">
              <div>
                <h2 className="font-bold">Save your resume to your account</h2>
                <p className="mt-1 text-sm text-neutral-400">Create an account or sign in to access your resume across devices.</p>
              </div>
              <form onSubmit={submitAuth} className="grid gap-2 sm:grid-cols-2">
                {authMode === "sign-up" && <input required minLength={2} maxLength={80} autoComplete="name" value={authName} onChange={(event) => setAuthName(event.target.value)} placeholder="Your name" className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500" />}
                <input required type="email" autoComplete="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="Email" className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500" />
                <input required type="password" minLength={8} autoComplete={authMode === "sign-up" ? "new-password" : "current-password"} value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Password (8+ characters)" className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500" />
                <div className="flex gap-2">
                  <button disabled={authBusy || sessionPending} type="submit" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60">{authBusy ? "Please wait…" : authMode === "sign-up" ? "Create account" : "Sign in"}</button>
                  <button type="button" onClick={() => { setAuthMode(authMode === "sign-in" ? "sign-up" : "sign-in"); setAuthMessage(""); }} className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800">{authMode === "sign-in" ? "Create account" : "I have an account"}</button>
                </div>
                {authMessage && <p aria-live="polite" className="text-sm text-neutral-300 sm:col-span-2">{authMessage}</p>}
              </form>
            </div>
          )}
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
