import React from "react";

interface AuthorizationLayoutProps {
  children: React.ReactNode;
}

export default function AuthorizationLayout({
  children,
}: AuthorizationLayoutProps) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
