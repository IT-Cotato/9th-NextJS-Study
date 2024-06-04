"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const [theme, setTheme] = useState("light");

  const router = useRouter();

  useEffect(() => {
    const mode = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    if (mode == "") document.cookie = "mode=light; max-age=" + 60 * 60 * 30;
  }, []);

  const handleDarkMode = () => {
    document.cookie = "mode=dark; max-age=" + 60 * 60 * 30;
    setTheme("dark");
    router.refresh();
  };

  const handleLightMode = () => {
    document.cookie = "mode=light; max-age=" + 60 * 60 * 30;
    setTheme("light");
    router.refresh();
  };

  return (
    <div>
      {theme == "dark" ? (
        <span onClick={handleLightMode}>🌞</span>
      ) : (
        <span onClick={handleDarkMode}>🌛</span>
      )}
    </div>
  );
};

export default ThemeBtn;
