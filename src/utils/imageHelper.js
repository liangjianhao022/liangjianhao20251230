// 导入所有图片资源
const images = import.meta.glob('../assets/character-images/*.{png,jpg,jpeg,svg}');
const flags = import.meta.glob('../assets/team-flags/*.{png,jpg,jpeg,svg}');

// 同步版本，用于已加载的图片
const imageCache = new Map();

export async function preloadImages(characterList) {
  // 并行预加载所有图片
  const loadPromises = [];

  for (const char of characterList) {
    try {
      // 预加载角色图片
      const charImgKey = `../assets/character-images/${char.img.split('/').pop()}`;
      if (images[charImgKey]) {
        const charPromise = images[charImgKey]().then(module => {
          imageCache.set(char.img, module.default);
        });
        loadPromises.push(charPromise);
      }

      // 预加载队旗
      const flagImgKey = `../assets/team-flags/${char.flagImg.split('/').pop()}`;
      if (flags[flagImgKey]) {
        const flagPromise = flags[flagImgKey]().then(module => {
          imageCache.set(char.flagImg, module.default);
        });
        loadPromises.push(flagPromise);
      }
    } catch (error) {
      console.warn(`Failed to load image: ${char.img}`, error);
    }
  }

  // 等待所有图片加载完成
  await Promise.all(loadPromises);
}

export function getCachedImageUrl(path) {
  return imageCache.get(path) || path;
}
