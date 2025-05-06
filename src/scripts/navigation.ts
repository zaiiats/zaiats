export const smoothScrollTo = (id: string, remOffset = 4) => {
  const el = document.getElementById(id);
  const mainContainer = document.getElementById('mainContainer');

  if (!el || !mainContainer) return;

  const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const offset = remPx * remOffset;

  const targetY = el.offsetTop - offset;

  mainContainer.scrollTo({ top: targetY, behavior: 'smooth' });
};
