import About from "@/components/sectors/About";
import Projects from "@/components/sectors/Projects";
import { getDictionary } from "@/localization/locales";
import Hero from "@/components/sectors/Hero";
import ArrowDown from "@/components/navigation/ArrowDown";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <>
      <div>
        <div className="min-h-120">
          <Hero dict={dict.hero} />
        </div>

        <About dict={dict.about} />

        <div className="min-h-120">
          <Projects dict={dict.projects} />
        </div>
      </div>
      <ArrowDown />
    </>
  );
}
