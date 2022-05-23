import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout = (props: ChatLayoutProps) => {
  const { children } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: "3rem",
          borderBottom: "1px solid #cccccc",
        }}
      >
        <p style={{ margin: 0 }}>cHat</p>
      </div>
      <div
        style={{
          flexGrow: "1",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: "3rem",
          borderTop: "1px solid #cccccc",
        }}
      >
        footer
      </div>
    </div>
  );
};

export default ChatLayout;
