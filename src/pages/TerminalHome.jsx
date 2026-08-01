import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { personalDetails } from "../static/profileSection";
import aboutContent from "../static/aboutSection.json";
import experienceContent from "../static/experienceSection.json";
import certificationsData from "../static/certificationsData.json";
import { techStackData } from "../static/techStackData";
import { projectsContent } from "../static/projectsData";
import ConnectModal from "../components/ConnectModal";

/* ------------------------------------------------------------------ *
 * Interactive terminal landing.
 * - clickable command menu + real typeable prompt (Tab-complete, ↑ recall)
 * - each command REPLACES the output area, streamed in line by line
 * ------------------------------------------------------------------ */

const COMMANDS = [
  { cmd: "/about-me", desc: "who I am" },
  { cmd: "/experience", desc: "where I've worked" },
  { cmd: "/projects", desc: "things I've built" },
  { cmd: "/stack", desc: "tools I reach for" },
  { cmd: "/certifications", desc: "credentials" },
  { cmd: "/resume", desc: "grab my résumé" },
  { cmd: "/contact", desc: "get in touch" },
  { cmd: "/connect", desc: "let's work together" },
  { cmd: "/help", desc: "list every command" },
  { cmd: "/clear", desc: "back to start" },
];

const RESET_ALIASES = new Set(["/clear", "/home", "/whoami"]);

/* ----------------------------- motion ----------------------------- */
const blink = keyframes`0%,49%{opacity:1}50%,100%{opacity:0}`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ----------------------------- shell ------------------------------ */
const Screen = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.5rem",
  background:
    "radial-gradient(1100px 560px at 50% -12%, rgba(122,162,247,0.10), transparent 60%), rgba(11,12,16,0.70)",
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  [theme.breakpoints.down("sm")]: { padding: "0.85rem" },
}));

const Window = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "860px",
  maxHeight: "min(86vh, 760px)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(17,19,24,0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 30px 80px -24px rgba(0,0,0,0.65)",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: { maxHeight: "92vh" },
}));

const TitleBar = styled(Box)({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
});
const Dot = styled("span")(({ tone }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: tone,
}));
const TitleText = styled("span")({
  marginLeft: "8px",
  color: "#7A7D89",
  fontSize: "0.8rem",
  letterSpacing: "0.02em",
});

/* ------------------------- prompt tokens -------------------------- */
const Path = styled("span")({ color: "#7AA2F7", fontWeight: 600 });
const Tilde = styled("span")({ color: "#7A7D89" });
const Arrow = styled("span")({ color: "#E8A06B", fontWeight: 700 });
const Cmd = styled("span")({ color: "#E6E6E3" });
// Truthful caret: filled + blinking only while the input actually has DOM
// focus; otherwise a static hollow outline (how a real terminal shows an
// unfocused window). Driven by the data-focused attribute rather than a
// custom prop so it forwards to the DOM cleanly (data-* is always allowed).
const Cursor = styled("span")({
  display: "inline-block",
  width: "9px",
  height: "1.05em",
  marginLeft: "2px",
  transform: "translateY(2px)",
  '&[data-focused="true"]': {
    background: "#E8A06B",
    animation: `${blink} 1.05s steps(1) infinite`,
  },
  '&[data-focused="false"]': {
    background: "transparent",
    boxShadow: "inset 0 0 0 1.5px #E8A06B",
  },
});

/* --------------------------- output ------------------------------- */
const OutputScroll = styled(Box)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  padding: "26px 26px 8px",
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(255,255,255,0.14) transparent",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255,255,255,0.12)",
    borderRadius: "8px",
  },
  [theme.breakpoints.down("sm")]: { padding: "20px 18px 6px" },
}));
const Block = styled(Box)({ animation: `${fadeUp} 0.4s ease both` });

const EchoLine = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
  fontSize: "0.9rem",
  marginBottom: "18px",
});

const Name = styled("h1")({
  margin: "4px 0 6px",
  fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "#F5F5F2",
});
const Role = styled("p")({
  margin: 0,
  fontSize: "clamp(0.95rem, 2.6vw, 1.1rem)",
  color: "#7A7D89",
});
const Hint = styled("p")({
  marginTop: "18px",
  fontSize: "0.82rem",
  color: "#565963",
  lineHeight: 1.7,
});

const SectionTitle = styled("h2")({
  margin: "0 0 14px",
  fontSize: "1.05rem",
  fontWeight: 700,
  color: "#E8A06B",
  letterSpacing: "0.02em",
});
const Para = styled("p")({
  margin: "0 0 14px",
  fontSize: "0.9rem",
  lineHeight: 1.8,
  color: "#C7C9D1",
});
const Muted = styled("span")({ color: "#7A7D89" });

const ListCard = styled(Box)({
  padding: "14px 16px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.02)",
  cursor: "pointer",
  transition: "border-color 0.2s, background 0.2s, transform 0.2s",
  "&:hover": {
    borderColor: "rgba(232,160,107,0.5)",
    background: "rgba(255,255,255,0.04)",
    transform: "translateY(-2px)",
  },
});
const CardTitle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "10px",
  color: "#F0F0EE",
  fontSize: "0.98rem",
  fontWeight: 600,
});
const CardSub = styled("div")({
  color: "#8A8D97",
  fontSize: "0.82rem",
  marginTop: "4px",
  lineHeight: 1.6,
});
const Chip = styled("span")({
  display: "inline-block",
  padding: "2px 9px",
  marginRight: "6px",
  marginTop: "8px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.03)",
  color: "#9AA0AE",
  fontSize: "0.72rem",
});
const CatLabel = styled("div")({
  color: "#7AA2F7",
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  margin: "0 0 8px",
});
const LinkRow = styled("a")({
  display: "flex",
  gap: "12px",
  alignItems: "baseline",
  padding: "8px 0",
  color: "#C7C9D1",
  fontSize: "0.9rem",
  textDecoration: "none",
  "&:hover span.val": { color: "#E8A06B" },
});

/* ---------------------------- input ------------------------------- */
const InputArea = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  borderTop: "1px solid rgba(255,255,255,0.06)",
  padding: "14px 26px 18px",
  [theme.breakpoints.down("sm")]: { padding: "12px 18px 16px" },
}));
const PromptRow = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.95rem",
  cursor: "text",
  [theme.breakpoints.down("sm")]: { fontSize: "0.8rem", gap: "6px" },
}));
const HiddenInput = styled("input")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "transparent",
  cursor: "text",
  font: "inherit",
});
const MenuRow = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "14px",
});
const MenuChip = styled("button")(({ theme }) => ({
  font: "inherit",
  display: "inline-flex",
  alignItems: "baseline",
  gap: "8px",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.02)",
  color: "#C7C9D1",
  fontSize: "0.82rem",
  cursor: "pointer",
  transition: "border-color 0.2s, background 0.2s, color 0.2s",
  "&:hover": {
    borderColor: "rgba(232,160,107,0.6)",
    background: "rgba(232,160,107,0.08)",
    color: "#F0F0EE",
  },
  [theme.breakpoints.down("sm")]: { padding: "6px 10px", fontSize: "0.78rem", gap: "6px" },
}));
// Descriptions are hidden on phones to keep the command menu compact & tappable.
const ChipDesc = styled("span")(({ theme }) => ({
  color: "#565963",
  fontSize: "0.74rem",
  [theme.breakpoints.down("sm")]: { display: "none" },
}));

/* --------------------------- helpers ------------------------------ */
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const normalize = (raw) => {
  let s = (raw || "").trim().toLowerCase();
  if (!s) return "";
  if (!s.startsWith("/")) s = "/" + s;
  return s;
};

const renderRich = (text) =>
  text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: "#E6E6E3", fontWeight: 700 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

/* builds the ordered blocks for a given command */
const buildOutput = (command, navigate) => {
  switch (command) {
    case "home":
      return [
        <Box key="id">
          <Name>{personalDetails.name}</Name>
          <Role>{personalDetails.dep}</Role>
          <Hint>
            Type a command below, click one, or run <Muted>/help</Muted>. Try{" "}
            <Muted>/projects</Muted> or <Muted>/about-me</Muted>.
          </Hint>
        </Box>,
      ];

    case "/about-me":
      return [
        <SectionTitle key="t">About</SectionTitle>,
        ...aboutContent.paragraphs.map((p, i) => <Para key={i}>{p}</Para>),
      ];

    case "/experience":
      return [
        <SectionTitle key="t">Experience</SectionTitle>,
        ...experienceContent.experienceData.map((job, i) => (
          <Box key={i} sx={{ mb: "20px" }}>
            <CardTitle>
              <span>{job.title}</span>
              <Muted style={{ fontSize: "0.78rem" }}>{job.duration}</Muted>
            </CardTitle>
            <CardSub style={{ color: "#7AA2F7" }}>{job.company}</CardSub>
            <Box
              component="ul"
              sx={{ m: "8px 0 0", pl: "18px", color: "#B3B6BF" }}
            >
              {job.responsibilities.map((r, j) => (
                <li key={j} style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                  {renderRich(r)}
                </li>
              ))}
            </Box>
          </Box>
        )),
      ];

    case "/projects":
      return [
        <SectionTitle key="t">Projects</SectionTitle>,
        ...projectsContent.projects.map((p) => (
          <ListCard
            key={p.id}
            data-card="true"
            onClick={() => navigate(`/project/${p.id}`)}
          >
            <CardTitle>
              <span>{p.name}</span>
              <Muted>↗</Muted>
            </CardTitle>
            <CardSub>{p.summary}</CardSub>
            <Box>
              {p.technologies.slice(0, 5).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
              {p.technologies.length > 5 && (
                <Chip>+{p.technologies.length - 5}</Chip>
              )}
            </Box>
          </ListCard>
        )),
      ];

    case "/stack":
      return [
        <SectionTitle key="t">Stack</SectionTitle>,
        ...techStackData.map((g) => (
          <Box key={g.category} sx={{ mb: "16px" }}>
            <CatLabel>{g.category}</CatLabel>
            <Box>
              {g.items.map((it) => (
                <Chip key={it} style={{ borderColor: `${g.color}44` }}>
                  {it}
                </Chip>
              ))}
            </Box>
          </Box>
        )),
      ];

    case "/certifications":
      return [
        <SectionTitle key="t">Certifications</SectionTitle>,
        ...certificationsData.map((c) => (
          <ListCard
            key={c.id}
            data-card="true"
            onClick={() => navigate(`/certificate/${c.id}`)}
          >
            <CardTitle>
              <span>{c.name}</span>
              <Muted>↗</Muted>
            </CardTitle>
            <CardSub>
              {c.issuer} · {c.date}
            </CardSub>
          </ListCard>
        )),
      ];

    case "/contact":
      return [
        <SectionTitle key="t">Contact</SectionTitle>,
        <Para key="p">Fastest ways to reach me:</Para>,
        ...personalDetails.socialLinks.map((s) => (
          <LinkRow
            key={s.name}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Arrow>❯</Arrow>
            <span style={{ minWidth: 90, color: "#7AA2F7" }}>{s.name}</span>
            <span className="val">{s.link.replace(/^mailto:/, "")}</span>
          </LinkRow>
        )),
      ];

    case "/resume":
      return [
        <SectionTitle key="t">Résumé</SectionTitle>,
        <Para key="p">
          Grab the latest copy below. <Muted>(opens in a new tab)</Muted>
        </Para>,
        <LinkRow
          key="dl"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Arrow>❯</Arrow>
          <span className="val">download résumé.pdf ↗</span>
        </LinkRow>,
      ];

    case "/help":
      return [
        <SectionTitle key="t">Commands</SectionTitle>,
        ...COMMANDS.map((c) => (
          <Box
            key={c.cmd}
            sx={{ display: "flex", gap: "16px", mb: "6px", fontSize: "0.88rem" }}
          >
            <span style={{ color: "#E8A06B", minWidth: 150 }}>{c.cmd}</span>
            <Muted>{c.desc}</Muted>
          </Box>
        )),
      ];

    default:
      return [
        <Para key="nf">
          <span style={{ color: "#FF6B6B" }}>command not found:</span>{" "}
          {command}
          <br />
          <Muted>run /help to see what's available</Muted>
        </Para>,
      ];
  }
};

/* ============================ component ============================ */
const TerminalHome = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const interactedRef = useRef(false);
  const wasConnectOpenRef = useRef(false);
  const [command, setCommand] = useState("home");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastRun, setLastRun] = useState("");
  const [connectOpen, setConnectOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const focusInput = () => inputRef.current?.focus();
  // Never steal focus back to the terminal when:
  //  - the connect modal is open (its fields would blur instantly),
  //  - this is a touch device (would pop the keyboard unexpectedly),
  //  - the user just finished selecting text (refocusing would clear it),
  //  - the click landed on something that navigates away (a link or a card).
  const focusInputSafe = (e) => {
    if (connectOpen) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.getSelection()?.toString()) return;
    if (e?.target?.closest?.("a, [data-card]")) return;
    focusInput();
  };
  const markInteracted = () => {
    interactedRef.current = true;
  };

  const openConnect = () => {
    setConnectOpen(true);
    try {
      sessionStorage.setItem("connectShown", "1");
    } catch {}
  };

  useEffect(() => {
    // Don't auto-focus on touch — it would pop the keyboard on page load.
    if (window.matchMedia("(pointer: fine)").matches) focusInput();
  }, []);

  // Auto-run /connect ~10s after landing — once per session, and only if the
  // visitor hasn't already started interacting with the terminal.
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = !!sessionStorage.getItem("connectShown");
    } catch {}
    if (alreadyShown) return;
    const t = setTimeout(() => {
      if (!interactedRef.current) typeAndRun("/connect");
    }, 10000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the caret honest when the OS window itself loses/regains focus
  // (alt-tab, clicking the address bar, ...) — the input's own focus/blur
  // events don't fire for that, so without this the caret would lie.
  useEffect(() => {
    const onWindowBlur = () => setIsFocused(false);
    const onWindowFocus = () =>
      setIsFocused(document.activeElement === inputRef.current);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);
    return () => {
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
    };
  }, []);

  // Return focus to the terminal once the connect modal closes.
  useEffect(() => {
    if (wasConnectOpenRef.current && !connectOpen) focusInputSafe();
    wasConnectOpenRef.current = connectOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectOpen]);

  const execute = (raw) => {
    const norm = normalize(raw);
    if (!norm) return;
    setLastRun(norm);
    setInput("");
    if (norm === "/connect") {
      openConnect();
      return;
    }
    if (RESET_ALIASES.has(norm)) {
      setCommand("home");
      return;
    }
    setCommand(norm);
  };

  // click-to-type: animates the command into the prompt, then runs it
  const typeAndRun = (cmd) => {
    if (busy) return;
    if (reduced()) return execute(cmd);
    setBusy(true);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setInput(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(id);
        setTimeout(() => {
          setBusy(false);
          execute(cmd);
        }, 200);
      }
    }, 70);
  };

  const matches = useMemo(() => {
    const norm = normalize(input);
    if (!norm) return COMMANDS;
    return COMMANDS.filter((c) => c.cmd.startsWith(norm));
  }, [input]);

  const onKeyDown = (e) => {
    if (busy) {
      e.preventDefault();
      return;
    }
    markInteracted();
    if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (matches.length) setInput(matches[0].cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (lastRun) setInput(lastRun);
    } else if (e.key === "Escape") {
      setInput("");
    }
  };

  const echo = command === "home" ? "whoami" : command;
  const blocks = buildOutput(command, navigate);

  return (
    <Screen onClick={focusInputSafe}>
      <Window>
        <TitleBar>
          <Dot tone="#FF5F56" />
          <Dot tone="#FFBD2E" />
          <Dot tone="#27C93F" />
          <TitleText>avesh@portfolio — zsh</TitleText>
        </TitleBar>

        <OutputScroll key={command}>
          <EchoLine>
            <Path>avesh@portfolio</Path>
            <Tilde>~</Tilde>
            <Arrow>❯</Arrow>
            <Cmd>{echo}</Cmd>
          </EchoLine>
          {blocks.map((node, i) => (
            <Block
              key={i}
              style={{ animationDelay: `${Math.min(i * 55, 500)}ms` }}
            >
              {node}
            </Block>
          ))}
        </OutputScroll>

        <InputArea>
          <PromptRow onClick={focusInputSafe}>
            <Path>avesh@portfolio</Path>
            <Tilde>~</Tilde>
            <Arrow>❯</Arrow>
            <Cmd>{input}</Cmd>
            <Cursor data-focused={isFocused} />
            <HiddenInput
              ref={inputRef}
              value={input}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              onChange={(e) => {
                if (busy) return;
                markInteracted();
                setInput(e.target.value);
              }}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </PromptRow>

          <MenuRow>
            {matches.map((c) => (
              <MenuChip
                key={c.cmd}
                onClick={() => {
                  markInteracted();
                  typeAndRun(c.cmd);
                }}
              >
                {c.cmd}
                <ChipDesc>{c.desc}</ChipDesc>
              </MenuChip>
            ))}
          </MenuRow>
        </InputArea>
      </Window>

      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </Screen>
  );
};

export default TerminalHome;
