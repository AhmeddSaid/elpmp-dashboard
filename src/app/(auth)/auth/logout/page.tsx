import React from "react";
import logoutAction from "./action";

export default async function page() {
  await logoutAction();

  return (
    <div className="flex items-center justify-center h-screen ">
      Logging Out...
    </div>
  );
}
