import { useCallback, useRef, useEffect, useState, FC } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import styles from './inputUploadImage.module.scss';
import BaseButton from '../BaseButton';

interface Props {
  // oldImages: any;
  bucketUrl: string;
  marginTop?: number;
  inputName?: string;
  setFieldValue?: any;
  handleChange?: any;
  marginBottom?: number;
  handleDeleteImages?: (image: string, oldImages: any) => void;
}

const InputUploadImage: FC<Props> = ({
  bucketUrl,
  marginTop,
  inputName,
  // oldImages,
  marginBottom,
  setFieldValue,
  handleChange,
  handleDeleteImages = null,
}) => {
  // const [previewImage, setPreviewImage] = useState<any>(oldImages);
  const [newPreviewsImage, setNewPreviewsImage] = useState<any>([]);
  const fileUpload: any = useRef();

  const handleChangeImage = useCallback((e: any) => {
    e.preventDefault();
    const fileList = Array.from(e.target.files);

    const mappedFiles = fileList.map((file: any) => ({
      ...file,
      preview: URL.createObjectURL(file),
      imageName: file,
    }));
    setNewPreviewsImage(mappedFiles);

    setFieldValue && setFieldValue('newImages', e.target.files);
    handleChange && handleChange(e);
  }, []);

  const removeNewPreviewImage = useCallback(
    (image: any) => {
      const imagePreview = newPreviewsImage.filter((preview: any) => {
        return preview.preview !== image;
      });
      setNewPreviewsImage(imagePreview);
    },
    [newPreviewsImage],
  );

  // const removeOldImage = useCallback(
  //   (image: string) => {
  //     return (
  //       handleDeleteImages !== null && handleDeleteImages(image, oldImages)
  //     );
  //   },
  //   [oldImages]
  // );

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click();
  }, []);

  // useEffect(() => {
  //   if (oldImages) {
  //     if (oldImages.length > 0 && previewImage.length === 0) {
  //       setPreviewImage(oldImages);
  //     }
  //   }
  // }, [oldImages]);

  return (
    <div>
      <div className={styles.containerImagePreview}>
        {/* {oldImages &&
          oldImages.map((image: any) => {
            return (
              <div key={image} className={styles.containerImage}>
                <img
                  alt="pets-love"
                  src={`${bucketUrl}${image}`}
                  className={styles.imagePreview}
                />
                {handleDeleteImages && (
                  <div className={styles.middle}>
                    <div
                      onClick={() => removeOldImage(image)}
                      className={styles.containerIcon}
                    >
                      <MdCancel className={styles.iconImage} size={20} />
                    </div>
                  </div>
                )}
              </div>
            );
          })} */}
        {newPreviewsImage &&
          newPreviewsImage.map((image: any) => {
            return (
              <div key={image.preview} className={styles.containerImage}>
                <img
                  alt="pets-love"
                  src={image.preview}
                  className={styles.imagePreview}
                />
                <div className={styles.middle}>
                  <div
                    onClick={() => removeNewPreviewImage(image.preview)}
                    className={styles.containerIcon}
                  >
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        style={{ marginTop, marginBottom, width: '100%' }}
        className={styles.colInputImage}
      >
        <input
          multiple
          type="file"
          name={inputName}
          ref={fileUpload}
          className={styles.inputFile}
          onChange={handleChangeImage}
          placeholder="placeholderImages"
        />
        <BaseButton
          text="Subir fotos"
          marginRightIcon={10}
          onClick={onClickFileUpload}
          icon={<AiOutlineCloudUpload size={18} />}
        />
      </div>
    </div>
  );
};

export default InputUploadImage;
