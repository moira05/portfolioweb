import styles from "./KycImgCover.module.css";

interface Props {
  src: string;
  alt: string;
  isHovered: boolean;
}

export default function KycImgCover({ src, alt, isHovered }: Props) {
  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${styles.img} ${isHovered ? styles.imgHovered : ""}`}
      />
    </div>
  );
}
