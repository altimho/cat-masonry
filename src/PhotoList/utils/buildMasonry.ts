import { getPhotoById } from '../../photoCollection';
import { Masonry } from '../../Masonry';

export const buildMasonry = (
  colsNumber: number,
  ids: number[],
  width: number,
) => {
  const masonry = new Masonry(colsNumber);

  ids.forEach((id) => {
    const photo = getPhotoById(id);
    if (photo) {
      const k = photo.width / width;
      masonry.push(photo.id, Math.round(photo.height / k));
    }
  });

  return masonry;
};
