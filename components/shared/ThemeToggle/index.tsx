"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import type { RootState } from "@/redux/app/store";
import { setTheme } from "@/redux/features/ui/uiSlice";
import { writeString } from "@/utils/storage";

export const THEME_KEY = "novamart-theme";

export default function ThemeToggle() {
  const t = useTranslations("Store.theme");
  const dispatch = useDispatch();
  const theme = useSelector((s: RootState) => s.ui.theme);

  useEffect(() => {
    const applied = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    dispatch(setTheme(applied));
  }, [dispatch]);

  const toggle = () => {
    const next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    writeString(THEME_KEY, next);
    dispatch(setTheme(next));
  };

  const label = theme === "dark" ? t("toLight") : t("toDark");

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-neutral-d-grey transition-colors hover:bg-tint-t5 dark:text-neutral-l-grey dark:hover:bg-white/10"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
}
