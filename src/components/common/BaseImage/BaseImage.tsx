import { FC } from 'react';
import c from 'classnames';
import Image from 'next/image';
import styles from './BaseImage.module.scss';

interface Props {
  src: any;
  alt: string;
  left?: boolean;
  width: number;
  testId?: string;
  right?: boolean;
  height: number;
  center?: boolean;
  circle?: boolean;
  pointer?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  handleEvent?: () => void;
}

const BaseImage: FC<Props> = ({
  src,
  alt,
  width,
  center,
  height,
  testId,
  circle,
  pointer,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  left = false,
  right = false,
  handleEvent = () => {},
}) => {
  return (
    <div
      onClick={handleEvent}
      data-testid={`base-image-${testId}`}
      style={{ marginTop, marginLeft, marginRight, marginBottom }}
      className={c(styles.container, center && styles.center, pointer && styles.pointer)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={c(left && styles.left, right && styles.right, circle && styles.circle)}
      />
    </div>
  );
};

export default BaseImage;
