const regex = /^http.+youtu.+?(\w+)$/;

export const getPreviewImgByLink = (
  url: string | undefined,
): string | undefined => {
  if (!url) {
    return;
  }

  const result = regex.exec(url);
  if (!result) {
    return;
  }

  const id = result[1];

  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
};
