import { ThemeProvider } from "next-themes";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <main className="p-2">{children}</main>
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
