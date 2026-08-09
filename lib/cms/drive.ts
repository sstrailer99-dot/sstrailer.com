const DRIVE_FILE_PATTERNS = [
  /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
  /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
  /docs\.google\.com\/.*\/d\/([a-zA-Z0-9_-]+)/,
];

export function extractGoogleDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  for (const pattern of DRIVE_FILE_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function normalizeGoogleDriveVideoUrl(url: string): {
  fileId: string;
  embedUrl: string;
  previewUrl: string;
} {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    throw new Error("Invalid Google Drive link. Paste a share link like https://drive.google.com/file/d/FILE_ID/view");
  }

  return {
    fileId,
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
  };
}

export function isGoogleDriveUrl(url: string) {
  return /drive\.google\.com|docs\.google\.com/.test(url);
}
