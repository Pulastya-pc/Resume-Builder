"use client";

import type {
  Resume,
  Project,
  Certification,
  Education,
  Experience,
} from "./types";

type ResumeEditorProps = {
  resume: Resume;
  emailError: string;
  phoneError: string;
  nameError: string;
  saveMessage: string;

  handleNameChange: (value: string) => void;
  handleEmailChange: (value: string) => void;
  handlePhoneChange: (value: string) => void;

  updateResume: <K extends keyof Resume>(
    field: K,
    value: Resume[K]
  ) => void;

  addEducation: () => void;
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string
  ) => void;
  removeEducation: (index: number) => void;

  addExperience: () => void;
  updateExperience: (
    index: number,
    field: keyof Experience,
    value: string
  ) => void;
  removeExperience: (index: number) => void;

  addSkill: () => void;
  updateSkill: (index: number, value: string) => void;
  removeSkill: (index: number) => void;

  addProject: () => void;
  updateProject: (
    index: number,
    field: keyof Project,
    value: string
  ) => void;
  removeProject: (index: number) => void;

  addCertification: () => void;
  updateCertification: (
    index: number,
    field: keyof Certification,
    value: string
  ) => void;
  removeCertification: (index: number) => void;

  saveResume: () => void;
  resetResume: () => void;
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

export default function ResumeEditor({
  resume,
  emailError,
  phoneError,
  nameError,
  saveMessage,
  handleNameChange,
  handleEmailChange,
  handlePhoneChange,
  updateResume,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  saveResume,
  resetResume,
}: ResumeEditorProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/20">
      <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-6 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Resume details
            </p>

            <h2 className="mt-1 text-2xl font-black text-neutral-950">
              Your information
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Add the information you want to appear on your resume.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveResume}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={resetResume}
              className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-bold text-neutral-900 transition hover:border-black hover:bg-black hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>

        {saveMessage && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ✓ {saveMessage}
          </div>
        )}
      </div>

      <div className="space-y-8 p-5 md:p-8">

        {/* PERSONAL INFORMATION */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
              01
            </span>

            <div>
              <h3 className="font-bold text-neutral-950">
                Personal information
              </h3>

              <p className="text-xs text-neutral-500">
                How recruiters can contact you
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Full name</label>

              <input
                type="text"
                value={resume.name}
                onChange={(e) =>
                  handleNameChange(e.target.value)
                }
                placeholder="e.g. Pulastya Pandey"
                className={inputClass}
              />

              {nameError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Email address
              </label>

              <input
                type="email"
                value={resume.email}
                onChange={(e) =>
                  handleEmailChange(e.target.value)
                }
                placeholder="you@example.com"
                className={inputClass}
              />

              {emailError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Phone number
              </label>

              <input
                type="tel"
                value={resume.phone}
                onChange={(e) =>
                  handlePhoneChange(e.target.value)
                }
                placeholder="+91 98765 43210"
                className={inputClass}
              />

              {phoneError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {phoneError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
              02
            </span>

            <div>
              <h3 className="font-bold text-neutral-950">
                Professional summary
              </h3>

              <p className="text-xs text-neutral-500">
                A short introduction about your professional profile
              </p>
            </div>
          </div>

          <textarea
            value={resume.summary}
            onChange={(e) =>
              updateResume("summary", e.target.value)
            }
            rows={6}
            maxLength={500}
            placeholder="Example: Computer Science student passionate about building web applications and AI-powered products..."
            className={textareaClass}
          />

          <div className="mt-2 flex justify-end">
            <span
              className={`text-xs font-medium ${
                resume.summary.length >= 450
                  ? "text-red-600"
                  : "text-neutral-400"
              }`}
            >
              {resume.summary.length}/500
            </span>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                03
              </span>

              <div>
                <h3 className="font-bold text-neutral-950">
                  Education
                </h3>

                <p className="text-xs text-neutral-500">
                  Your academic background
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addEducation}
              className={addButtonClass}
            >
              <span className="text-lg leading-none">+</span>
              Add
            </button>
          </div>

          <div className="space-y-5">
            {resume.education.map((education, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Education {index + 1}
                  </span>

                  {resume.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(index)
                      }
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Degree / Course
                    </label>

                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                      placeholder="B.Tech in Computer Science"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      School / University
                    </label>

                    <input
                      type="text"
                      value={education.school}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "school",
                          e.target.value
                        )
                      }
                      placeholder="University name"
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Graduation year
                    </label>

                    <input
                      type="text"
                      value={education.year}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "year",
                          e.target.value
                        )
                      }
                      placeholder="2026"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                04
              </span>

              <div>
                <h3 className="font-bold text-neutral-950">
                  Work experience
                </h3>

                <p className="text-xs text-neutral-500">
                  Show your professional experience
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addExperience}
              className={addButtonClass}
            >
              <span className="text-lg leading-none">+</span>
              Add
            </button>
          </div>

          <div className="space-y-5">
            {resume.experience.map((experience, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Experience {index + 1}
                  </span>

                  {resume.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(index)
                      }
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Job title
                    </label>

                    <input
                      type="text"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      placeholder="Software Developer"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Company
                    </label>

                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                      placeholder="Company name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Start date
                    </label>

                    <input
                      type="text"
                      value={experience.startDate}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      placeholder="Jan 2025"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      End date
                    </label>

                    <input
                      type="text"
                      value={experience.endDate}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      placeholder="Present"
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-semibold text-neutral-800">
                        Description
                      </label>

                      <span className="text-xs text-neutral-400">
                        {experience.description.length}/600
                      </span>
                    </div>

                    <textarea
                      value={experience.description}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={5}
                      maxLength={600}
                      placeholder="Describe your responsibilities, achievements, and impact..."
                      className={textareaClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                05
              </span>

              <div>
                <h3 className="font-bold text-neutral-950">
                  Skills
                </h3>

                <p className="text-xs text-neutral-500">
                  Technical and professional skills
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addSkill}
              className={addButtonClass}
            >
              <span className="text-lg leading-none">+</span>
              Add
            </button>
          </div>

          <div className="space-y-3">
            {resume.skills.map((skill, index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      updateSkill(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={
                      index === 0
                        ? "e.g. React, Python, SQL"
                        : "Add another skill"
                    }
                    className={inputClass}
                  />
                </div>

                {resume.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(index)
                    }
                    className="rounded-xl border border-neutral-200 px-4 text-sm font-semibold text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-neutral-400">
            Tip: Add specific technologies instead of generic
            phrases like “hard worker”.
          </p>
        </div>

        {/* PROJECTS */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                06
              </span>

              <div>
                <h3 className="font-bold text-neutral-950">
                  Projects
                </h3>

                <p className="text-xs text-neutral-500">
                  Highlight your best work
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addProject}
              className={addButtonClass}
            >
              <span className="text-lg leading-none">+</span>
              Add
            </button>
          </div>

          <div className="space-y-5">
            {resume.projects.map((project, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Project {index + 1}
                  </span>

                  {resume.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeProject(index)
                      }
                      className={removeButtonClass}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>
                      Project name
                    </label>

                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="AI Resume Builder"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Technologies
                    </label>

                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "technologies",
                          e.target.value
                        )
                      }
                      placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-semibold text-neutral-800">
                        Description
                      </label>

                      <span className="text-xs text-neutral-400">
                        {project.description.length}/500
                      </span>
                    </div>

                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={4}
                      maxLength={500}
                      placeholder="Explain what you built, how you built it, and what problem it solves..."
                      className={textareaClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Project link
                    </label>

                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "link",
                          e.target.value
                        )
                      }
                      placeholder="https://github.com/username/project"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                07
              </span>

              <div>
                <h3 className="font-bold text-neutral-950">
                  Certifications
                </h3>

                <p className="text-xs text-neutral-500">
                  Courses and professional certifications
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addCertification}
              className={addButtonClass}
            >
              <span className="text-lg leading-none">+</span>
              Add
            </button>
          </div>

          <div className="space-y-5">
            {resume.certifications.map(
              (certification, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Certification {index + 1}
                    </span>

                    {resume.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeCertification(index)
                        }
                        className={removeButtonClass}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Certification name
                      </label>

                      <input
                        type="text"
                        value={certification.name}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="AWS Certified Cloud Practitioner"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Organization
                      </label>

                      <input
                        type="text"
                        value={certification.organization}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "organization",
                            e.target.value
                          )
                        }
                        placeholder="Amazon Web Services"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Date
                      </label>

                      <input
                        type="text"
                        value={certification.date}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "date",
                            e.target.value
                          )
                        }
                        placeholder="2026"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Certificate link
                      </label>

                      <input
                        type="url"
                        value={certification.link}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* SAVE FOOTER */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="rounded-2xl bg-neutral-950 p-5 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold">
                  Ready to save your progress?
                </h3>

                <p className="mt-1 text-sm text-neutral-400">
                  Your resume is stored locally in your browser.
                </p>
              </div>

              <button
                type="button"
                onClick={saveResume}
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Save Resume
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}