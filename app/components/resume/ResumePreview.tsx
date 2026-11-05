import ClassicTemplate from "./ClassicTemplate"
import ModernTemplate from "./MordernTemplate";
import MinimalTemplate from "./MinimalTemplate";

import type {
  Resume,
  ResumeTemplate,
} from "./types";

type ResumePreviewProps = {
  resume: Resume;
  template: ResumeTemplate;
};

export default function ResumePreview({
  resume,
  template,
}: ResumePreviewProps) {
  switch (template) {
    case "modern":
      return <ModernTemplate resume={resume} />;

    case "minimal":
      return <MinimalTemplate resume={resume} />;

    case "classic":
    default:
      return <ClassicTemplate resume={resume} />;
  }
}