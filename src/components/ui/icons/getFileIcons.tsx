import {
  FaFile,
  FaFileAlt,
  FaFileArchive,
  FaFileAudio,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
} from 'react-icons/fa';

interface FileIconOptions {
  size?: number;
  className?: string;
}

export function getFileIcon(mimeType?: string, options?: FileIconOptions) {
  const size = options?.size ?? 18;
  const className = options?.className ?? 'text-gray-500';

  if (!mimeType) {
    return <FaFile size={size} className={className} />;
  }

  // IMAGE
  if (mimeType.startsWith('image/')) {
    return <FaFileImage size={size} className={className} />;
  }

  // PDF
  if (mimeType === 'application/pdf') {
    return <FaFilePdf size={size} className={className} />;
  }

  // WORD
  if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <FaFileWord size={size} className={className} />;
  }

  // EXCEL
  if (
    mimeType === 'application/vnd.ms-excel' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return <FaFileExcel size={size} className={className} />;
  }

  // POWERPOINT
  if (
    mimeType === 'application/vnd.ms-powerpoint' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return <FaFilePowerpoint size={size} className={className} />;
  }

  // ARCHIVE
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) {
    return <FaFileArchive size={size} className={className} />;
  }

  // VIDEO
  if (mimeType.startsWith('video/')) {
    return <FaFileVideo size={size} className={className} />;
  }

  // AUDIO
  if (mimeType.startsWith('audio/')) {
    return <FaFileAudio size={size} className={className} />;
  }

  // TEXT
  if (mimeType.startsWith('text/')) {
    return <FaFileAlt size={size} className={className} />;
  }

  // DEFAULT
  return <FaFile size={size} className={className} />;
}
