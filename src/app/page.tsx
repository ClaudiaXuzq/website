import { experience } from "@content/experience";
import { projects } from "@content/projects";
import { research } from "@content/research";
import { siteContent } from "@content/site";
import { ContentSection } from "@/components/home/content-section";
import { EntryList } from "@/components/home/entry-list";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TypewriterAbout } from "@/components/typewriter/typewriter-about";
import { TypewriterSequence } from "@/components/typewriter/typewriter-sequence";
import { getLatestPosts } from "@/lib/blog";

export default function Home() {
  const writing = getLatestPosts(5).map((post) => ({
    id: post.slug,
    href: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    titleLanguage: post.lang,
    descriptionLanguage: post.lang,
    date: post.date,
    meta: [post.date, ...(post.author ? [`来自 ${post.author}`] : post.tags.slice(0, 1))],
  }));
  return (
    <div className="site-frame">
      <TypewriterSequence
        phrases={siteContent.typewriterIntro}
        aboutLines={siteContent.intro.en.lines}
      >
        <SiteHeader name={siteContent.name} navigation={siteContent.navigation} />

        <main id="main-content">
          <TypewriterAbout label={siteContent.intro.label} />

          <ContentSection
            id="experience"
            title={siteContent.sections.experience.title}
            description={siteContent.sections.experience.description}
          >
            <EntryList entries={experience} />
          </ContentSection>

          <ContentSection
            id="research"
            title={siteContent.sections.research.title}
            description={siteContent.sections.research.description}
          >
            <EntryList entries={research} />
          </ContentSection>

          <ContentSection
            id="projects"
            title={siteContent.sections.projects.title}
            description={siteContent.sections.projects.description}
          >
            <EntryList entries={projects} />
          </ContentSection>

          <ContentSection
            id="writing"
            title={siteContent.sections.writing.title}
            description={siteContent.sections.writing.description}
          >
            <EntryList entries={writing} />
          </ContentSection>
        </main>
      </TypewriterSequence>

      <SiteFooter content={siteContent.footer} links={siteContent.socialLinks} />
    </div>
  );
}
