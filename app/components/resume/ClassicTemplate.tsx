import type { Resume } from "./types";

type ClassicTemplateProps = {
  resume: Resume;
};

export default function ClassicTemplate({
  resume,
}: ClassicTemplateProps) {
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
      item.description ||
      item.link
  );

  const hasSkills = resume.skills.some(
    (skill) => skill.trim()
  );

  const hasCertifications =
    resume.certifications.some(
      (item) =>
        item.name ||
        item.organization ||
        item.date ||
        item.link
    );

  return (
    <div className="bg-white p-8 text-black md:p-10">
      {/* HEADER */}

      <header className="border-b-2 border-red-600 pb-5 text-center">
        <h1 className="text-4xl font-black leading-normal tracking-tight md:text-5xl">
          {resume.name || "Your Name"}
        </h1>

        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-neutral-600">
          {resume.email && <span>{resume.email}</span>}

          {resume.phone && <span>{resume.phone}</span>}

          {!resume.email && !resume.phone && (
            <>
              <span>email@example.com</span>
              <span>+91 98765 43210</span>
            </>
          )}
        </div>
      </header>

      {/* SUMMARY */}

      {resume.summary && (
        <section className="mt-6">
          <h2 className="border-b border-neutral-300 pb-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Profile
          </h2>

          <p className="mt-3 text-sm leading-6 text-neutral-700">
            {resume.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}

      {hasExperience && (
        <section className="mt-6">
          <h2 className="border-b border-neutral-300 pb-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Experience
          </h2>

          <div className="mt-4 space-y-5">
            {resume.experience.map(
              (experience, index) => {
                const hasContent =
                  experience.jobTitle ||
                  experience.company ||
                  experience.description;

                if (!hasContent) return null;

                return (
                  <article key={index}>
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <div>
                        <h3 className="font-bold text-black">
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
                        <p className="text-xs font-medium text-neutral-500">
                          {experience.startDate ||
                            "Start"}{" "}
                          —{" "}
                          {experience.endDate ||
                            "Present"}
                        </p>
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

      {/* EDUCATION */}

      {hasEducation && (
        <section className="mt-6">
          <h2 className="border-b border-neutral-300 pb-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Education
          </h2>

          <div className="mt-4 space-y-4">
            {resume.education.map(
              (education, index) => {
                const hasContent =
                  education.degree ||
                  education.school ||
                  education.year;

                if (!hasContent) return null;

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
                      <p className="text-xs font-medium text-neutral-500">
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
        <section className="mt-6">
          <h2 className="border-b border-neutral-300 pb-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Projects
          </h2>

          <div className="mt-4 space-y-5">
            {resume.projects.map(
              (project, index) => {
                const hasContent =
                  project.name ||
                  project.technologies ||
                  project.description ||
                  project.link;

                if (!hasContent) return null;

                return (
                  <article key={index}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
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
                      <p className="mt-1 text-xs font-semibold text-neutral-500">
                        {project.technologies}
                      </p>
                    )}

                    {project.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-neutral-700">
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
        <section className="mt-6">
          <h2 className="border-b border-neutral-300 pb-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {resume.skills.map(
              (skill, index) =>
                skill.trim() && (
                  <span
                    key={index}
                    className="text-sm font-medium"
                  >
                    {skill}
                    {index <
                      resume.skills.length - 1 &&
                      " •"}
                  </span>
                )
            )}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}

      {hasCertifications && (
        <section className="mt-6">
          <h2 className="border-b border-neutral-300 pb-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Certifications
          </h2>

          <div className="mt-4 space-y-3">
            {resume.certifications.map(
              (certification, index) => {
                const hasContent =
                  certification.name ||
                  certification.organization ||
                  certification.date;

                if (!hasContent) return null;

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