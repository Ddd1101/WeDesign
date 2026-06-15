import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface Props {
  onUpload: (dataUrl: string) => void;
  onClose?: () => void;
  currentImage?: string;
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export default function ImageUpload({
  onUpload,
  onClose,
  currentImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState("");

  const handleFile = (file: File) => {
    setError("");
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("仅支持 PNG、JPG、WebP 格式");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("图片大小不能超过 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      onUpload(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="预览"
            className="w-20 h-20 rounded-xl object-cover border border-white/10"
          />
          <button
            onClick={() => {
              setPreview(null);
              inputRef.current?.click();
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 rounded-xl border-2 border-dashed border-[#d4a843]/30 flex flex-col items-center justify-center gap-1 hover:border-[#d4a843]/60 hover:bg-[#d4a843]/5 transition-all"
        >
          <Upload className="w-6 h-6 text-[#d4a843]/60" />
          <span className="text-[10px] text-[#d4a843]/50">上传图片</span>
        </button>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <p className="text-[10px] text-[#f8f0e3]/25">
        支持 PNG/JPG/WebP，最大 2MB
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
