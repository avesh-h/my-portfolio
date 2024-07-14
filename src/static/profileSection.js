import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import XIcon from "@mui/icons-material/X";

export const personalDetails = {
  name: "Avesh Hasanfatta",
  dep: "Full stack Developer",
  ability:
    "I am a passionate Full stack developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.",
  socialLinks: [
    {
      name: "github",
      link: "https://github.com/avesh-h",
      icon: <GitHubIcon sx={{ fontSize: 24 }} />,
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/in/avesh-h/",
      icon: <LinkedInIcon sx={{ fontSize: 24 }} />,
    },
    {
      name: "x",
      link: "https://twitter.com/Aves_hh",
      icon: <XIcon sx={{ fontSize: 24 }} />,
    },
    {
      name: "mail",
      link: "mailto:aveshhasanfatta1155@gmail.com",
      icon: <MailIcon sx={{ fontSize: 24 }} />,
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/aves_h_h/",
      icon: <InstagramIcon sx={{ fontSize: 24 }} />,
    },
  ],
};
