import type { ReactNode } from "react";

type ContentSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function ContentSection({
  id,
  title,
  description,
  children,
}: ContentSectionProps) {
  return (
    <section id={id} className="content-section" aria-labelledby={`${id}-title`}>
      <div
        className={`section-heading${description ? "" : " section-heading--compact"}`}
      >
        <h2 id={`${id}-title`} className="type-en-heading" lang="en">
          {title}
        </h2>
        {description ? <p className="type-zh-body">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
