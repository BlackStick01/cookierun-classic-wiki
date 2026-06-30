type AdFrameProps = {
  src: string;
  width: number;
  height: number;
  title: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export function AdFrame({
  src,
  width,
  height,
  title,
  className,
  loading = "lazy",
}: AdFrameProps) {
  if (!src) return null;

  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      scrolling="no"
      loading={loading}
      className={className}
      style={{
        width,
        height,
        border: "none",
        overflow: "hidden",
        display: "block",
        background: "transparent",
      }}
    />
  );
}
