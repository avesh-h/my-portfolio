import mernAppImg from "../assets/images/memories-mern.png";
import promptoverseApp from "../assets/images/prompto-verse.png";
import playoverse from "../assets/images/playo-time.png";

export const projectsContent = {
  projects: [
    {
      id: 1,
      name: "Memories App",
      summary: "Clone of Social network site",
      deployement: "Vercel",
      details:
        "Further details about Project Alpha, including objectives, milestones, and team members.",
      image: mernAppImg,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "In Progress",
      technologies: [
        "React",
        "MUI",
        "Node.js",
        "MongoDB",
        "Mongoose ORM",
        "Express.js",
        "Redux",
        "Socket.io",
      ],
      link: "https://mern-memories-app-xi.vercel.app/posts",
    },
    {
      id: 2,
      name: "Play-O-Time",
      summary: "Game Bookings Note App",
      deployement: "Render",
      details:
        "Further details about Project Beta, including objectives, milestones, and team members.",
      image: playoverse,
      startDate: "2023-02-01",
      endDate: "Present",
      status: "In Progress",
      technologies: [
        "Next-JS-14",
        "MUI",
        "Next-auth",
        "Redux-Toolkit-Query",
        "MongoDB",
        "Redis",
        "Mongoose ORM",
        "Cron-job.org",
      ],
      link: "https://play-o-time.onrender.com/login",
    },
    {
      id: 3,
      name: "Prompt-O-Verse",
      summary: "Saved Your AI generated Prompt in your profile.",
      description: "A detailed description of Project Gamma.",
      details:
        "Further details about Project Gamma, including objectives, milestones, and team members.",
      image: promptoverseApp,
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      status: "Planning",
      technologies: ["Next.js", "MongoDB", "Mongoose ORM", "Next-auth"],
      link: "https://propmpto-verse.vercel.app/",
    },
  ],
};
