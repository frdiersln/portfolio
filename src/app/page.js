import "./styles/page.css";

import PortfolioItem from "@/components/portfolioItem";

export default function Home() {

  const portfolioItems = [
    {
      title: "Track Mood",
      description: "With TrackMood you can easily track your daily moods on a calendar. After sign in with gmail, set your daily mood for start your journey of self-discovery.",
      link: "https://trackmood.vercel.app/",
      videoPath: "/videos/track-mood.mp4"
    },
    {
      title: "Mememix",
      description: "Open-source fully automated youtube meme channel. That automation is done by a python script that scrapes the top memes from coub and uploads them to youtube after merge them.",
      link: "https://youtube.com/@mememix3276",
      videoPath: "/videos/mememix.mp4"
    },
    {
      title: "pickNPrep",
      description: "A web application that lists recipes that can be made with selected ingredients. (Using spoonacular api)",
      link: "https://frdiersln.github.io/eatsplorer/",
      videoPath: "/videos/pickNprep.mp4"
    },
    {
      title: "Pickizard",
      description: "a web application that allows users to select the winner with tournement system from a list they have created.",
      link: "https://pickizard.vercel.app/",
      videoPath: "/videos/pickizard.mp4"
    },
    {
      title: "Inflation Calculator",
      description: "A vuejs application that calculates the current value of a debt issued in the past.",
      link: "https://github.com/frdiersln/BorcEnflasyonuHesabi",
      videoPath: "/videos/BorcEnflasyonuHesabi.mp4"
    },
    {
      title: "Loan Landing",
      description: "A basic landing page that created with basicly vanilla html/css for a loan company.",
      link: "https://cocky-roentgen-544ceb.netlify.app/",
      videoPath: "/videos/LoanLanding.mp4"
    },
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
      <div className="second-portfolio-area">
        {portfolioItems.slice(2).map((item, index) => (
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