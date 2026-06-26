"use client";

import { projects } from "@/data/projects";
import { COURSES } from "@/data/courses";
import { skills } from "@/data/skills";
import { useEffect, useRef, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () => {
  const sectW = window.innerWidth - 3 * 16;
  const maxW = 700;
  return Math.min(sectW, maxW);
};

const getServerSnapshot = () => 700;

interface AboutDictionary {
  about: string;
  stats: {
    instagram: string;
    telegram: string;
    email: string;
    skills: string;
    projects: string;
    years: string;
    courses: string;
  };
  text: {
    paragraph1: string;
    paragraph2: string;
  };
}

export default function About({ dict }: { dict: AboutDictionary }) {
  const yearsOfExperience = Math.floor(
    (new Date().getTime() - new Date("2024-01-01").getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );

  const size = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div id="about" className="pt-15 select-none">
      <h2 className="text-center font-eurostyle text-[2rem] font-medium pb-3 max-[680px]:pt-4">
        {dict.about}
      </h2>
      <div
        style={{ width: size, height: size }}
        className="flex justify-center mx-auto"
      >
        <div className="relative w-full h-full aspect-square ">
          <div className="absolute w-3/4 h-3/4 border-2 border-dashed border-(--grey-color) rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="font-eurostyle text-[2.5rem] font-bold [line-break:anywhere]">
              {yearsOfExperience}+
            </p>
            <p className="text-[0.9rem] opacity-70">{dict.stats.years}</p>
          </div>

          <RotatingElements dict={dict} size={size} />
        </div>
      </div>
    </div>
  );
}

function RotatingElements({
  dict,
  size,
}: {
  dict: AboutDictionary;
  size: number;
}) {
  const statsCounters = [
    {
      value: Object.values(projects).length,
      label: dict.stats.projects,
    },
    {
      value: Object.values(skills).flat().length,
      label: dict.stats.skills,
    },
    {
      value: Object.values(COURSES).length,
      label: dict.stats.courses,
    },
    {
      value: "B2",
      label: "English",
    },
  ];

  const N = statsCounters.length;
  const A = 360 / N;
  const orbitRadius = (size * 3) / 8;

  const targetVelocity = 0.02;
  const friction = 0.0002;

  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>(new Array(N));
  const rafIdRef = useRef<number | null>(null);

  const systemAngleRef = useRef(0);
  const isDraggingRef = useRef(false);

  const lastMouseAngleRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const currentVelocityRef = useRef(targetVelocity);

  const updatePositions = () => {
    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      const angleDeg = systemAngleRef.current + i * A;
      const radians = angleDeg * (Math.PI / 180);

      const X = Math.cos(radians) * orbitRadius;
      const Y = Math.sin(radians) * orbitRadius;

      el.style.transform = `translate3d(calc(-50% + ${X}px), calc(-50% + ${Y}px), 0)`;
    });
  };

  const startAnimation = (initialVelocity: number) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    let lastTime = performance.now();
    currentVelocityRef.current = initialVelocity;

    const step = (time: number) => {
      let dt = time - lastTime;
      if (dt > 64) dt = 16;
      lastTime = time;

      const currentV = currentVelocityRef.current;

      const smoothing = 0.002;

      currentVelocityRef.current =
        currentV + (targetVelocity - currentV) * smoothing * dt;

      systemAngleRef.current += currentVelocityRef.current * dt;
      updatePositions();

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    const rect = containerRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    lastMouseAngleRef.current = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX,
    );
    lastMoveTimeRef.current = performance.now();
    currentVelocityRef.current = 0;

    containerRef.current!.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const rect = containerRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const currentMouseAngle = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX,
    );
    let deltaAngle = currentMouseAngle - lastMouseAngleRef.current;

    if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
    if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

    const deltaDegrees = deltaAngle * (180 / Math.PI);
    systemAngleRef.current += deltaDegrees;

    updatePositions();

    const now = performance.now();
    const dt = now - lastMoveTimeRef.current;

    if (dt > 0) {
      const instantVelocity = deltaDegrees / dt;
      currentVelocityRef.current =
        currentVelocityRef.current * 0.5 + instantVelocity * 0.5;
    }

    lastMouseAngleRef.current = currentMouseAngle;
    lastMoveTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    containerRef.current!.releasePointerCapture(e.pointerId);

    startAnimation(currentVelocityRef.current);
  };

  useEffect(() => {
    updatePositions();
    startAnimation(targetVelocity);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full touch-none cursor-pointer active:cursor-pointer"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {statsCounters.map((stat, index) => (
        <StatCard
          ref={(el) => {
            elementsRef.current[index] = el;
          }}
          key={index}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
}

function StatCard({
  value,
  label,
  ref,
}: {
  value: string | number;
  label: string;
  ref: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={ref}
      className="group absolute top-1/2 left-1/2 w-37.5 h-37.5 flex flex-col justify-center items-center p-6 border border-(--grey-color-light) rounded-full text-center bg-(--reverse-color) pointer-events-none transition-colors hover:border-(--grey-color)"
    >
      <div className="font-eurostyle text-[2.5rem] font-bold [line-break:anywhere]">
        {value}
      </div>
      <div className="text-[0.9rem] opacity-70">{label}</div>
    </div>
  );
}
