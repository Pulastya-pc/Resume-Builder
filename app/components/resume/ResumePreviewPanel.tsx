"use client";

import type { RefObject } from "react";
import type { Resume, ResumeTemplate } from "./types";
import ResumePreview from "./ResumePreview";

type ResumePreviewPanelProps = {
  resume: Resume;
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: (template: ResumeTemplate) => void;
  previewRef: RefObject<HTMLDivElement | null>;
  downloadPDF: () => void;
};

export default function ResumePreviewPanel({
  resume,
  selectedTemplate,
  setSelectedTemplate,
  previewRef,
  downloadPDF,
}: ResumePreviewPanelProps) {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="mb-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              Live preview
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              Choose a template
            </h2>
          </div>

          <button
            type="button"
            onClick={downloadPDF}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            ↓ PDF
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSelectedTemplate("classic")}
            className={`rounded-xl border p-3 text-left transition ${
              selectedTemplate === "classic"
                ? "border-red-600 bg-red-600 text-white"
                : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-red-600"
            }`}
          >
            <div className="mb-2 text-sm font-bold">Classic</div>
            <div className="text-xs opacity-75">ATS-friendly</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTemplate("modern")}
            className={`rounded-xl border p-3 text-left transition ${
              selectedTemplate === "modern"
                ? "border-red-600 bg-red-600 text-white"
                : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-red-600"
            }`}
          >
            <div className="mb-2 text-sm font-bold">Modern</div>
            <div className="text-xs opacity-75">Bold & visual</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTemplate("minimal")}
            className={`rounded-xl border p-3 text-left transition ${
              selectedTemplate === "minimal"
                ? "border-red-600 bg-red-600 text-white"
                : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-red-600"
            }`}
          >
            <div className="mb-2 text-sm font-bold">Minimal</div>
            <div className="text-xs opacity-75">Clean & simple</div>
          </button>
        </div>
      </div>

      <section
        ref={previewRef}
        className="h-fit overflow-hidden rounded-2xl border-t-4 border-red-600 bg-white shadow-2xl"
      >
        <ResumePreview resume={resume} template={selectedTemplate} />
      </section>
    </aside>
  );
}