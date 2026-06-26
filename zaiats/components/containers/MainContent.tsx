import { type ReactNode } from "react";
import Nav from "../navigation/Nav";
import { getDictionary } from "@/localization/locales";
import { LangSwitcher, ThemeSwitcher } from "../standalone/HeroWidgets";

async function MainContent({ children }: { children: ReactNode }) {
  const dict = await getDictionary();

  return (
    <div className="flex h-dvh w-full overflow-y-hidden p-4 text-(--main-color)">
      <Nav dict={dict.nav} /> 

      <div
        id="mainContainer"
        className="z-2 w-full overflow-x-hidden overflow-y-scroll bg-(--bg-color) transition-(--transition)"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      <ThemeSwitcher />
      <LangSwitcher />
    </div>
  );
}

export default MainContent;