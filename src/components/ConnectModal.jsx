import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";

/* /connect dialog — a small Mac-window styled modal with a contact form that
 * posts to Web3Forms (no backend). Set the access key via env:
 *   REACT_APP_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx        */
const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || "";

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const popIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled(Box)({
  position: "fixed",
  inset: 0,
  zIndex: 1200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.2rem",
  background: "rgba(6,7,11,0.62)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  animation: `${fadeIn} 0.2s ease`,
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
});

const Dialog = styled(Box)({
  width: "100%",
  maxWidth: "520px",
  maxHeight: "92vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(20,22,28,0.94)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 40px 100px -20px rgba(0,0,0,0.8)",
  animation: `${popIn} 0.28s cubic-bezier(0.2,0.8,0.2,1)`,
});

const TitleBar = styled(Box)({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
});
const Dot = styled("button")(({ tone, interactive }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: tone,
  border: "none",
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  "& span": {
    opacity: 0,
    fontSize: "9px",
    fontWeight: 700,
    color: "rgba(0,0,0,0.55)",
    transition: "opacity 0.15s ease",
  },
  ...(interactive ? { "&:hover span": { opacity: 1 } } : {}),
}));
const TitleText = styled("span")({
  marginLeft: "8px",
  color: "#7A7D89",
  fontSize: "0.8rem",
});

const Body = styled(Box)({ padding: "22px 24px 26px", overflowY: "auto" });

const Echo = styled(Box)({
  fontSize: "0.85rem",
  marginBottom: "6px",
  "& .path": { color: "#7AA2F7", fontWeight: 600 },
  "& .arrow": { color: "#E8A06B", fontWeight: 700 },
  "& .cmd": { color: "#E6E6E3" },
});
const Lede = styled("p")({
  margin: "0 0 20px",
  color: "#7A7D89",
  fontSize: "0.82rem",
  lineHeight: 1.6,
});

const Form = styled("form")({ display: "flex", flexDirection: "column", gap: "14px" });
const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "14px",
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
}));
const FieldWrap = styled(Box)({ flex: 1, display: "flex", flexDirection: "column", gap: "6px" });
const Label = styled("label")({
  color: "#8A8D97",
  fontSize: "0.72rem",
  letterSpacing: "0.06em",
  "& .opt": { color: "#565963" },
});
const fieldBase = {
  font: "inherit",
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.03)",
  color: "#E6E6E3",
  fontSize: "0.85rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  "&:focus": {
    borderColor: "rgba(232,160,107,0.7)",
    background: "rgba(255,255,255,0.05)",
  },
  "&::placeholder": { color: "#4d505a" },
  "&:-webkit-autofill": {
    WebkitTextFillColor: "#E6E6E3",
    transition: "background-color 9999s ease-in-out 0s",
  },
};
const Input = styled("input")(fieldBase);
const Textarea = styled("textarea")({
  ...fieldBase,
  resize: "vertical",
  minHeight: "96px",
  lineHeight: 1.6,
});

const Submit = styled("button")({
  font: "inherit",
  marginTop: "4px",
  padding: "11px 18px",
  borderRadius: "8px",
  border: "1px solid rgba(232,160,107,0.55)",
  background: "rgba(232,160,107,0.12)",
  color: "#F0C9A8",
  fontSize: "0.88rem",
  cursor: "pointer",
  transition: "background 0.2s, border-color 0.2s, opacity 0.2s",
  "&:hover:not(:disabled)": {
    background: "rgba(232,160,107,0.2)",
    borderColor: "rgba(232,160,107,0.85)",
  },
  "&:disabled": { opacity: 0.6, cursor: "default" },
});
const ErrorLine = styled("p")({
  margin: 0,
  color: "#FF7A7A",
  fontSize: "0.8rem",
});
const Success = styled(Box)({
  textAlign: "center",
  padding: "26px 8px",
  "& .check": { fontSize: "2rem", color: "#4ade80" },
  "& .big": { color: "#F0F0EE", fontSize: "1.05rem", margin: "10px 0 6px" },
  "& .sub": { color: "#7A7D89", fontSize: "0.85rem", lineHeight: 1.6 },
});
const CloseBtn = styled("button")({
  font: "inherit",
  marginTop: "20px",
  padding: "9px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.03)",
  color: "#C7C9D1",
  cursor: "pointer",
  "&:hover": { borderColor: "rgba(232,160,107,0.6)", color: "#F0F0EE" },
});
// visually-hidden honeypot for spam bots
const Honeypot = styled("input")({
  position: "absolute",
  left: "-9999px",
  opacity: 0,
  height: 0,
  width: 0,
});

const ConnectModal = ({ open, onClose }) => {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrMsg("");
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // autofocus only on real pointer devices (avoid popping mobile keyboard)
    if (window.matchMedia("(pointer: fine)").matches) {
      setTimeout(() => firstFieldRef.current?.focus(), 60);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (fd.get("botcheck")) return; // honeypot tripped
    if (!ACCESS_KEY) {
      setStatus("error");
      setErrMsg("Form isn't configured yet — add your Web3Forms key.");
      return;
    }
    const payload = {
      access_key: ACCESS_KEY,
      subject: `Portfolio /connect — ${fd.get("name") || "someone"}`,
      from_name: "Portfolio · /connect",
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") || "—",
      message: fd.get("message"),
    };
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) setStatus("success");
      else {
        setStatus("error");
        setErrMsg(json.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error — please try again.");
    }
  };

  return (
    <Overlay
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        // keep clicks inside the modal from bubbling to the terminal shell,
        // which would otherwise steal focus back to its hidden input
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Dialog>
        <TitleBar>
          <Dot tone="#FF5F56" interactive onClick={onClose} aria-label="Close">
            <span>×</span>
          </Dot>
          <Dot tone="#FFBD2E" as="span" />
          <Dot tone="#27C93F" as="span" />
          <TitleText>connect — avesh@portfolio</TitleText>
        </TitleBar>

        <Body>
          {status === "success" ? (
            <Success>
              <div className="check">✓</div>
              <div className="big">message sent</div>
              <div className="sub">
                Thanks for reaching out — I'll get back to you soon.
              </div>
              <CloseBtn onClick={onClose}>close</CloseBtn>
            </Success>
          ) : (
            <>
              <Echo>
                <span className="path">avesh@portfolio</span>{" "}
                <span className="arrow">❯</span>{" "}
                <span className="cmd">./connect --to avesh</span>
              </Echo>
              <Lede>Got a project, role, or idea? Drop it here.</Lede>

              <Form onSubmit={onSubmit}>
                <Honeypot type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
                <Row>
                  <FieldWrap>
                    <Label htmlFor="cn-name">name</Label>
                    <Input
                      id="cn-name"
                      name="name"
                      required
                      placeholder="Your name"
                      ref={firstFieldRef}
                    />
                  </FieldWrap>
                  <FieldWrap>
                    <Label htmlFor="cn-email">email</Label>
                    <Input
                      id="cn-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                    />
                  </FieldWrap>
                </Row>
                <FieldWrap>
                  <Label htmlFor="cn-phone">
                    phone <span className="opt">(optional)</span>
                  </Label>
                  <Input id="cn-phone" name="phone" placeholder="+91 ..." />
                </FieldWrap>
                <FieldWrap>
                  <Label htmlFor="cn-msg">message</Label>
                  <Textarea
                    id="cn-msg"
                    name="message"
                    required
                    placeholder="Tell me a bit about it..."
                  />
                </FieldWrap>

                {status === "error" && <ErrorLine>{errMsg}</ErrorLine>}

                <Submit type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "sending…" : "send message ↗"}
                </Submit>
              </Form>
            </>
          )}
        </Body>
      </Dialog>
    </Overlay>
  );
};

export default ConnectModal;
