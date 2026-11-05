import type { Resume } from "./types";

type MinimalTemplateProps = {
  resume: Resume;
};

export default function MinimalTemplate({
  resume,
}: MinimalTemplateProps) {
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
    <div className="bg-white p-8 text-black md:p-10">
      {/* HEADER */}

      <header>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          {resume.name || "Your Name"}
        </h1>

        <p className="mt-2 text-sm font-medium text-red-700">
          Professional Resume
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
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

      <div className="mt-7 h-px bg-black" />

      {/* SUMMARY */}

      {resume.summary && (
        <section className="mt-7">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Profile
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">
            {resume.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}

      {hasExperience && (
        <section className="mt-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Experience
          </h2>

          <div className="mt-4 space-y-6">
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
                  <article key={index}>
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <div>
                        <h3 className="font-bold">
                          {experience.jobTitle ||
                            "Job Title"}
                        </h3>

                        <p className="mt-0.5 text-sm text-red-700">
                          {experience.company ||
                            "Company"}
                        </p>
                      </div>

                      {(experience.startDate ||
                        experience.endDate) && (
                        <p className="text-xs text-neutral-500">
                          {experience.startDate ||
                            "Start"}{" "}
                          —{" "}
                          {experience.endDate ||
                            "Present"}
                        </p>
                      )}
                    </div>

                    {experience.description && (
                      <p className="mt-2 max-w-2xl whitespace-pre-line text-sm leading-6 text-neutral-700">
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

      {/* EDUCATION */}

      {hasEducation && (
        <section className="mt-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Education
          </h2>

          <div className="mt-4 space-y-4">
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
                  <article
                    key={index}
                    className="flex flex-col justify-between gap-1 sm:flex-row"
                  >
                    <div>
                      <h3 className="font-bold">
                        {education.degree ||
                          "Degree"}
                      </h3>

                      <p className="text-sm text-neutral-600">
                        {education.school ||
                          "University"}
                      </p>
                    </div>

                    {education.year && (
                      <p className="text-xs text-neutral-500">
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

      {/* PROJECTS */}

      {hasProjects && (
        <section className="mt-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Projects
          </h2>

          <div className="mt-4 space-y-5">
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
                  <article key={index}>
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <h3 className="font-bold">
                        {project.name ||
                          "Project"}
                      </h3>

                      {project.link && (
                        <span className="break-all text-xs text-red-700">
                          {project.link}
                        </span>
                      )}
                    </div>

                    {project.technologies && (
                      <p className="mt-1 text-xs font-medium text-neutral-500">
                        {project.technologies}
                      </p>
                    )}

                    {project.description && (
                      <p className="mt-2 text-sm leading-6 text-neutral-700">
                        {project.description}
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
        <section className="mt-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Skills
          </h2>

          <p className="mt-3 text-sm leading-7 text-neutral-700">
            {resume.skills
              .filter((skill) => skill.trim())
              .join("  •  ")}
          </p>
        </section>
      )}

      {/* CERTIFICATIONS */}

      {hasCertifications && (
        <section className="mt-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Certifications
          </h2>

          <div className="mt-4 space-y-3">
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
                    className="flex flex-col justify-between gap-1 sm:flex-row"
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
                      <p className="text-xs text-neutral-500">
                        {certification.date}
                      </p>
                    )}
                  </article>
                );
              }
            )}
          </div>
        </section>
      )}
    </div>
  );
}       