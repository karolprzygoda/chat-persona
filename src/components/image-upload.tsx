import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (src: FileList | null) => void;
  disabled?: boolean;
};

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(event.target.files);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg border-4 border-dashed border-primary/10">
      {preview ? (
        <div className="relative m-4 h-40 w-40">
          <Image
            fill
            alt="Preview"
            src={preview}
            className="rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2"
            onClick={handleClear}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex cursor-pointer flex-col items-center justify-center"
        >
          <div className="m-4 flex flex-col items-center justify-center pb-6 pt-5 transition hover:opacity-75">
            <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <Input
            id="dropzone-file"
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            disabled={disabled}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
