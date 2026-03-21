"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export default function ClarityInit() {
  useEffect(() => {
    clarity.init("vz7ul1d4hc");
  }, []);

  return null;
}
