export const smoothScrollTo = (id: string, isWithOffset = false, isSmooth = true) => {
  const el = document.getElementById(id);
  const mainContainer = document.getElementById("mainContainer");

  if (!el || !mainContainer) return;

  const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const offset = remPx * (isWithOffset ? 3 : 1);

  const targetY = el.offsetTop - offset;

  mainContainer.scrollTo({
    top: targetY,
    ...(isSmooth ? { behavior: "smooth" } : {}),
  });
};
