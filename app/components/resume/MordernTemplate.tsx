import type { Resume } from "./types";

type ModernTemplateProps = {
  resume: Resume;
};

export default function ModernTemplate({
  resume,
}: ModernTemplateProps) {
  const hasExperience = resume.experience.some(
    (item) =>
      item.jobTitle ||
      item.company ||
      item.description
  );

  const hasEducation = resume.education.some(
    (item) =>
      item.degree ||
      item.school ||
      item.year
  );

  const hasProjects = resume.projects.some(
    (item) =>
      item.name ||
      item.technologies ||
      item.description
  );

  const hasSkills = resume.skills.some(
    (skill) => skill.trim()
  );

  const hasCertifications =
    resume.certifications.some(
      (item) =>
        item.name ||
        item.organization ||
        item.date
    );

  return (
    <div className="bg-white text-black">
      {/* HEADER */}

      <header className="bg-black px-7 py-8 text-white md:px-10">
        <div className="h-1 w-14 bg-red-600" />

        <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
          {resume.name || "Your Name"}
        </h1>

        <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-red-400">
          Professional Resume
        </p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-300">
          {resume.email && (
            <span>{resume.email}</span>
          )}

          {resume.phone && (
            <span>{resume.phone}</span>
          )}

          {!resume.email && !resume.phone && (
            <>
              <span>email@example.com</span>
              <span>+91 98765 43210</span>
            </>
          )}
        </div>
      </header>

      <div className="p-7 md:p-10">
        {/* PROFILE */}

        {resume.summary && (
          <section>
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-red-600" />

              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Profile
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-neutral-700">
              {resume.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}

        {hasExperience && (
          <section className="mt-8">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-red-600" />

              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Experience
              </h2>
            </div>

            <div className="mt-5 space-y-5">
              {resume.experience.map(
                (experience, index) => {
                  if (
                    !experience.jobTitle &&
                    !experience.company &&
                    !experience.description
                  ) {
                    return null;
                  }

                  return (
                    <article
                      key={index}
                      className="border-l border-neutral-300 pl-5"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div>
                          <h3 className="font-bold">
                            {experience.jobTitle ||
                              "Job Title"}
                          </h3>

                          <p className="text-sm font-semibold text-red-700">
                            {experience.company ||
                              "Company"}
                          </p>
                        </div>

                        {(experience.startDate ||
                          experience.endDate) && (
                          <span className="text-xs font-medium text-neutral-500">
                            {experience.startDate ||
                              "Start"}{" "}
                            —{" "}
                            {experience.endDate ||
                              "Present"}
                          </span>
                        )}
                      </div>

                      {experience.description && (
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-neutral-700">
                          {experience.description}
                        </p>
                      )}
                    </article>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* TWO COLUMN AREA */}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* EDUCATION */}

          {hasEducation && (
            <section>
              <div className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-red-600" />

                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                  Education
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                {resume.education.map(
                  (education, index) => {
                    if (
                      !education.degree &&
                      !education.school &&
                      !education.year
                    ) {
                      return null;
                    }

                    return (
                      <article key={index}>
                        <h3 className="font-bold">
                          {education.degree ||
                            "Degree"}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-600">
                          {education.school ||
                            "University"}
                        </p>

                        {education.year && (
                          <p className="mt-1 text-xs font-semibold text-red-700">
                            {education.year}
                          </p>
                        )}
                      </article>
                    );
                  }
                )}
              </div>
            </section>
          )}

          {/* SKILLS */}

          {hasSkills && (
            <section>
              <div className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-red-600" />

                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                  Skills
                </h2>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {resume.skills.map(
                  (skill, index) =>
                    skill.trim() && (
                      <span
                        key={index}
                        className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-800"
                      >
                        {skill}
                      </span>
                    )
                )}
              </div>
            </section>
          )}
        </div>

        {/* PROJECTS */}

        {hasProjects && (
          <section className="mt-8">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-red-600" />

              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Projects
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {resume.projects.map(
                (project, index) => {
                  if (
                    !project.name &&
                    !project.technologies &&
                    !project.description
                  ) {
                    return null;
                  }

                  return (
                    <article
                      key={index}
                      className="rounded-xl border border-neutral-200 p-4"
                    >
                      <h3 className="font-bold">
                        {project.name ||
                          "Project"}
                      </h3>

                      {project.technologies && (
                        <p className="mt-1 text-xs font-semibold text-red-700">
                          {project.technologies}
                        </p>
                      )}

                      {project.description && (
                        <p className="mt-2 text-sm leading-6 text-neutral-700">
                          {project.description}
                        </p>
                      )}

                      {project.link && (
                        <p className="mt-3 break-all text-xs font-medium text-neutral-500">
                          {project.link}
                        </p>
                      )}
                    </article>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}

        {hasCertifications && (
          <section className="mt-8">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-red-600" />

              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Certifications
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {resume.certifications.map(
                (certification, index) => {
                  if (
                    !certification.name &&
                    !certification.organization &&
                    !certification.date
                  ) {
                    return null;
                  }

                  return (
                    <article
                      key={index}
                      className="flex flex-col justify-between gap-1 rounded-lg bg-neutral-50 p-4 sm:flex-row"
                    >
                      <div>
                        <h3 className="font-bold">
                          {certification.name ||
                            "Certification"}
                        </h3>

                        <p className="text-sm text-neutral-600">
                          {certification.organization ||
                            "Organization"}
                        </p>
                      </div>

                      {certification.date && (
                        <span className="text-xs font-semibold text-red-700">
                          {certification.date}
                        </span>
                      )}
                    </article>
                  );
                }
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}