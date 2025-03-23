import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="p-2">{children}</main>
    </div>
  );
};

export default MainLayout;
