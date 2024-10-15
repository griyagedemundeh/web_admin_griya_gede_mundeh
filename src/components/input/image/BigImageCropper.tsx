import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  maxWidth: number;
  maxHeight: number;
  onCrop: (blob: Blob) => void;
  onclose?: () => void;
}

interface HTMLImageElementWithCropper extends HTMLImageElement {
  cropper?: Cropper;
}

export default function BigImageCropper({
  src,
  maxWidth,
  maxHeight,
  onCrop,
  onclose,
}: Props) {
  const [isCropping, setIsCropping] = useState(true);
  const cropperRef = useRef<HTMLImageElementWithCropper>(null);

  useEffect(() => {
    if (cropperRef.current) {
      //   console.log('cropperRef.current', cropperRef.current);
      const cropper = new Cropper(cropperRef.current, {
        viewMode: 1,
        cropBoxResizable: true,
        data: {
          //define cropbox size
          width: 240,
          height: 90,
        },
        ready() {
          cropper?.setDragMode("move");
        },
      });

      cropperRef.current.cropper = cropper;

      return () => {
        cropper?.destroy();
      };
    }
  }, [cropperRef, maxWidth, maxHeight]);

  const handleCrop = () => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.cropper?.getCroppedCanvas({
      width: maxWidth,
      height: maxHeight,
    });

    canvas?.toBlob((blob: any) => {
      onCrop(blob);
      setIsCropping(false);
    });
  };

  const handleCancel = () => {
    setIsCropping(false);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
      setIsCropping(true);
    }
  };

  return (
    <div>
      {isCropping ? (
        <div>
          <img
            ref={cropperRef}
            src={src}
            alt="Image to crop"
            onLoad={handleImageLoad}
            className="rounded-lg"
          />
          <div className="flex justify-end w-full pt-6 space-x-3 border-t">
            <SecondaryButton
              label="Batal"
              unSubmit={true}
              onClick={() => {
                handleCancel();

                if (onclose) {
                  onclose();
                }
              }}
            />

            <PrimaryButton
              unSubmit={true}
              label="Simpan"
              onClick={handleCrop}
            />
          </div>
        </div>
      ) : (
        <img src={src} alt="Image" className="rounded-lg object-cover" />
      )}
    </div>
  );
}
