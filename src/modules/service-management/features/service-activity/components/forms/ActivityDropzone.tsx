import ComponentCard from '@/components/common/ComponentCard';
import { useAppSelector } from '@/core/store/base/hook';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaTrash } from 'react-icons/fa';

interface ActivityDropzoneProps {
  onChange: (files: File[]) => void;
  isSubmitting: boolean;
}

export function ActivityDropzone({ onChange, isSubmitting }: ActivityDropzoneProps) {
  const progress = useAppSelector(s => s.ui.uploadProgress);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (index: number) => {
    if (isSubmitting) return;
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    disabled: isSubmitting,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
      'image/svg+xml': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    },
  });

  return (
    <ComponentCard title={"Döküman Ekle 'Opsiyonel'"}>
      <div className="relative rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700 dark:bg-gray-700">
        <div
          {...getRootProps()}
          className={`relative min-h-[250px] rounded-xl border-2 border-dashed p-6 text-center transition ${
            isDragActive
              ? 'border-blue-500 bg-gray-700 dark:bg-gray-300'
              : 'border-gray-600 bg-gray-300 dark:bg-gray-700'
          } ${isSubmitting ? 'pointer-events-none blur-sm' : 'cursor-pointer'} `}
        >
          <input {...getInputProps()} />

          {files.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-gray-700 p-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Dosyaları Buraya Sürükle ve Bırak
              </h4>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                PNG, JPG, WebP, SVG, DOC, XLS, PDF <br />
                veya <span className="text-blue-400 underline">Dosya Seç</span>
              </p>
            </div>
          ) : (
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {files.map((file, index) => {
                const preview = URL.createObjectURL(file);

                return (
                  <div key={`${file.name}-${index}`} className="relative">
                    <div className="relative overflow-hidden rounded-lg border border-gray-700">
                      {file.type === 'application/pdf' ? (
                        <div className="flex h-[140px] flex-col items-center justify-center p-2 text-sm text-gray-400">
                          <FaFilePdf size={40} />
                          <p className="mt-2 line-clamp-2 text-center text-xs">{file.name}</p>
                        </div>
                      ) : (
                        <Image
                          src={preview}
                          alt={file.name}
                          width={200}
                          height={140}
                          className="h-[140px] w-full object-cover"
                        />
                      )}

                      {!isSubmitting && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeFile(index);
                          }}
                          className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-500"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* UPLOAD OVERLAY */}
        {isSubmitting && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/50">
            <div className="w-2/3 max-w-sm">
              <p className="mb-2 text-center text-sm font-semibold text-white">
                Yükleniyor... %{progress}
              </p>

              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-600">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mb-2 text-center text-sm font-semibold text-white">
                Lütfen sayfayı kapatmayınız !
              </div>
            </div>
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
