"use client";

import { ReactNode, useEffect, useState } from "react";

export default function MSWProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      import("../mocks/browser").then(({ worker }) =>
        worker
          .start({ onUnhandledRequest: "bypass" })
          .then(() => setReady(true))
      );
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
