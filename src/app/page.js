import "./styles/page.css";

import PortfolioItem from "@/components/portfolioItem";

export default function Home() {

  const portfolioItems = [
    {
      title: "Track Mood",
      description: "With TrackMood you can easily track your daily moods on a calendar. Sign in with gmail and set your daily mood for tracking. Its responsive for all screen sizes.",
      link: "testlink.com",
      videoPath: "/videos/track-mood.mp4"
    },
    {
      title: "Project Two",
      description: "Description for project two.",
      link: "link-to-project-two.com",
      videoPath: "/videos/project-two.mp4"
    },
    {
      title: "Project Three",
      description: "Description for project three.",
      link: "link-to-project-three.com",
      videoPath: "/videos/project-three.mp4"
    }
  ];

  return (
    <div className="portfolio-container">
      <div className="first-portfolio-row">
        {portfolioItems.slice(0, 2).map((item, index) => (
          <PortfolioItem
            key={index}
            title={item.title}
            description={item.description}
            link={item.link}
            videoPath={item.videoPath}
          />
        ))}
      </div>
    </div>
  )
}