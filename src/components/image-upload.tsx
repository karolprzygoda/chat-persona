import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";

type Avatar = {
  path: string;
  file: FileList | null;
};

type ImageUploadProps = {
  value: Avatar;
  onChange: (avatar: Avatar | null) => void;
  disabled?: boolean;
};

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onChange({
          path: result,
          file: event.target.files,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    onChange({
      path: "",
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative flex w-full justify-center">
      {value.file && value.path ? (
        <div className="relative aspect-square w-full max-w-[400px]">
          <Image
            fill
            sizes={"400px"}
            alt="Preview"
            src={value.path}
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
          className="flex aspect-square w-full max-w-[400px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition hover:border-primary/70"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG or JPG (MAX. 50 MB)
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
