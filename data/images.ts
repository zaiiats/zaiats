const rawImages = [
  "/images/projects/trusty-settings.png",
  "/images/projects/profix-footer.png",
  "/images/projects/btw-menu.png",
  "/images/projects/trusty-products.png",
  "/images/projects/btw-settings.png",
  "/images/projects/filmania-account.png",
  "/images/projects/filmania-movie.png",
  "/images/projects/muka.png",
  "/images/projects/zakarpat.png",
  "/images/projects/nature.png",
  "/images/projects/zakarpat-about.png",
  "/images/projects/per6-contacts.png",
  "/images/projects/zakarpat-services.png",
  "/images/projects/profix-asortment.png",
  "/images/projects/btw-ready.png",
  "/images/projects/profix.png",
  "/images/projects/btw-passport.png",
  "/images/projects/trusty-contracts.png",
  "/images/projects/muka-game.png",
  "/images/projects/trusty.png",
  "/images/projects/profix-account.png",
  "/images/projects/trusty-product.png",
  "/images/projects/btw-catas.png",
  "/images/projects/trusty-dashboard.png",
  "/images/projects/nulp.png",
  "/images/projects/btw-game.png",
  "/images/projects/zakarpat-contacts.png",
  "/images/projects/per6.png",
  "/images/projects/btw-news.png",
  "/images/projects/vuln-hunt-account.png",
  "/images/projects/vuln-hunt-dashboard.png",
  "/images/projects/vuln-hunt-form.png",
  "/images/projects/vuln-hunt-panel.png",
  "/images/projects/vuln-hunt-program.png",
  "/images/projects/vuln-hunt-ticket.png",
  "/images/projects/vuln-hunt.png",
];

const mainProjectImages = [
  "/images/projects/vuln-hunt.png",
  "/images/projects/filmania-movie.png",
  "/images/projects/muka.png",
  "/images/projects/zakarpat.png",
  "/images/projects/profix.png",
  "/images/projects/trusty.png",
  "/images/projects/btw-game.png",
  "/images/projects/per6.png",
  "/images/projects/nulp.png",
  "/images/projects/nature.png",
];

function getProjectPrefix(url: string): string {
  const fileName = url.split("/").pop() || "";
  return fileName.split("-")[0].replace(".png", "");
}

// Простий детермінований псевдо-рандом (seed)
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function seededShuffle<T>(array: T[], seed = 42): T[] {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom(s++) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getShuffledProjectsImages(): string[][] {
  // Використовуємо стабільний seed, щоб сервер і клієнт бачили однаковий порядок
  const shuffledMains = seededShuffle(mainProjectImages, 123);
  const otherImages = seededShuffle(
    rawImages.filter((img) => !mainProjectImages.includes(img)),
    456,
  );

  const rowSizes = [7, 7, 8, 7, 7];
  const result: string[][] = rowSizes.map((size) => new Array(size).fill(""));

  // Вставляємо головні фото у центр рядків 2, 3, 4
  result[1][2] = shuffledMains.pop()!;
  result[1][3] = shuffledMains.pop()!;
  result[1][4] = shuffledMains.pop()!;

  result[2][2] = shuffledMains.pop()!;
  result[2][3] = shuffledMains.pop()!;
  result[2][4] = shuffledMains.pop()!;
  result[2][5] = shuffledMains.pop()!;

  result[3][2] = shuffledMains.pop()!;
  result[3][3] = shuffledMains.pop()!;
  result[3][4] = shuffledMains.pop()!;

  // Заповнюємо решту комірок
  for (let r = 0; r < result.length; r++) {
    for (let c = 0; c < result[r].length; c++) {
      if (result[r][c] !== "") continue;

      const validIndex = otherImages.findIndex((img) => {
        const currentPrefix = getProjectPrefix(img);

        if (c > 0 && result[r][c - 1] !== "") {
          if (getProjectPrefix(result[r][c - 1]) === currentPrefix)
            return false;
        }

        if (c < result[r].length - 1 && result[r][c + 1] !== "") {
          if (getProjectPrefix(result[r][c + 1]) === currentPrefix)
            return false;
        }

        return true;
      });

      if (validIndex !== -1) {
        result[r][c] = otherImages.splice(validIndex, 1)[0];
      } else {
        result[r][c] = otherImages.shift()!;
      }
    }
  }

  return result;
}
export const images = getShuffledProjectsImages();
