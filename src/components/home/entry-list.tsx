import type { HomeEntry } from "@/types/content";
import Link from "next/link";

type EntryListProps = {
  entries: readonly HomeEntry[];
};

export function EntryList({ entries }: EntryListProps) {
  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li className="entry" key={entry.id}>
          <div className="entry-main">
            <h3
              className={
                entry.titleLanguage === "en"
                  ? "type-en-heading"
                  : "type-zh-heading"
              }
              lang={entry.titleLanguage ?? "zh-CN"}
            >
              {entry.href ? <Link href={entry.href}>{entry.title}</Link> : entry.title}
            </h3>
            <p
              className={
                entry.descriptionLanguage === "en"
                  ? "type-en-body"
                  : "type-zh-body"
              }
              lang={entry.descriptionLanguage ?? "zh-CN"}
            >
              {entry.description}
            </p>
          </div>
          <div className="entry-meta" aria-label="条目信息">
            {entry.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
            {entry.temporary ? <span className="entry-status">Temporary</span> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
