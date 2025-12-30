// 导入所有图片资源
const images = import.meta.glob('../assets/character-images/*.{png,jpg,jpeg,svg}');
const flags = import.meta.glob('../assets/team-flags/*.{png,jpg,jpeg,svg}');

export function getImageUrl(path) {
  // 提取文件名
  const fileName = path.split('/').pop();

  // 检查是否在 character-images 中
  if (path.includes('character-images')) {
    const imagePath = `../assets/character-images/${fileName}`;
    if (images[imagePath]) {
      return images[imagePath]();
    }
  }

  // 检查是否在 team-flags 中
  if (path.includes('team-flags')) {
    const flagPath = `../assets/team-flags/${fileName}`;
    if (flags[flagPath]) {
      return flags[flagPath]();
    }
  }

  // 如果不是动态导入的图片，直接返回路径
  return path;
}

// 同步版本，用于已加载的图片
const imageCache = new Map();

export async function preloadImages(characterList) {
  for (const char of characterList) {
    try {
      // 预加载角色图片
      const charImgKey = `../assets/character-images/${char.img.split('/').pop()}`;
      if (images[charImgKey]) {
        const module = await images[charImgKey]();
        imageCache.set(char.img, module.default);
      }

      // 预加载队旗
      const flagImgKey = `../assets/team-flags/${char.flagImg.split('/').pop()}`;
      if (flags[flagImgKey]) {
        const module = await flags[flagImgKey]();
        imageCache.set(char.flagImg, module.default);
      }
    } catch (error) {
      console.warn(`Failed to load image: ${char.img}`, error);
    }
  }
}

export function getCachedImageUrl(path) {
  return imageCache.get(path) || path;
}
