import mernAppImg from "../assets/images/memories-mern.png";
import promptoverseApp from "../assets/images/prompto-verse.png";
import playoverse from "../assets/images/playo-time.png";

export const projectsContent = {
  projects: [
    {
      id: 1,
      name: "Memories App",
      summary: "Full-stack social networking platform",
      description:
        "A full-stack social networking platform built with a microservices architecture (Post, Chat, Mail, User services) using RabbitMQ for async task delegation. Features real-time chat and group messaging via Socket.io, along with standard social interactions — posts, likes, and comments.",
      highlights: [
        "Developed a **social networking platform** with features for post, update, delete, and interacting (like/comment) on user content with **React-JS**.",
        "Implemented **real-time chat and group messaging** using **Socket.io**, allowing seamless communication between users.",
        "Architected the application using **microservices** (Post, Chat, Mail, User services) to integrate **RabbitMQ** for async task delegation and email notifications.",
      ],
      image: mernAppImg,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "Completed",
      technologies: [
        "React",
        "MUI",
        "Node.js",
        "MongoDB",
        "Mongoose ORM",
        "Express.js",
        "Redux",
        "Socket.io",
        "RabbitMQ",
        "Vercel",
        "Render",
      ],
      link: "https://mem-client-side-service.vercel.app/posts",
    },
    {
      id: 2,
      name: "Play-O-Time",
      summary: "Sports event scheduling platform",
      description:
        "A sports event scheduling platform built with Next.js 14 and Next Auth for secure authentication. Integrated a Redis Message Queue that cut game creation time by 60%, and automated database cleanup via cron jobs to remove outdated game data and reduce storage costs.",
      highlights: [
        "Developed a **sports event scheduling platform** with **Next.js 14** and **Next Auth** for secure user authentication and efficient game management.",
        "Integrated **Redis Message Queue**, reducing game creation time by **60%** and significantly boosting **API performance**.",
        "Automated **database management** with cron jobs to delete outdated game data, improving database efficiency and reducing storage costs.",
      ],
      image: playoverse,
      startDate: "2023-02-01",
      endDate: "Present",
      status: "In Progress",
      technologies: [
        "Next.js 14",
        "MUI",
        "Next-auth",
        "RTK Query",
        "MongoDB",
        "Redis",
        "Mongoose ORM",
        "Cron-job.org",
        "Render",
      ],
      link: "https://game-poll.vercel.app/login",
    },
    {
      id: 3,
      name: "Prompt-O-Verse",
      summary: "AI prompt sharing & discovery app",
      description:
        "A prompt-sharing app built with Next.js 13 leveraging both server and client components for optimized rendering. Users authenticate via Google OAuth, create AI prompts tagged with hashtags, and can search, copy, and browse other users' prompts.",
      highlights: [
        "Developed an application using **Next.js 13** with **server and client components** for optimized rendering performance.",
        "Implemented **Google authentication** with **Next-auth.js**, enhancing security and user experience.",
        "Built a prompt discovery system where users can create prompts with **hashtags**, search, copy, and view other users' prompts.",
      ],
      image: promptoverseApp,
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      status: "Completed",
      technologies: ["Next.js 13", "MongoDB", "Mongoose ORM", "Next-auth"],
      link: "https://propmpto-verse.vercel.app/",
    },
  ],
};
