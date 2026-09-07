// 元画像の実寸（歪みなく切り出すために使用）
const IMG_W = 1024;
const IMG_H = 559;
const ZOOM = 4.8;
const SPRITE_URL = "/hedgehog-sprite.jpg";

export function Mascot({
  pos,
  size = 48,
}: {
  pos: { x: number; y: number };
  size?: number;
}) {
  // アスペクト比を保ったまま拡大する（高さ基準でZOOM倍、幅は画像の実比率から算出）。
  // 単純に backgroundSize: "480% 480%" のような同一%指定にすると、
  // 正方形のアイコン枠に対して非正方形の元画像が歪んで表示されるため、
  // ここでは常に元画像の縦横比（IMG_W / IMG_H）を保つよう計算している。
  const scaledH = size * ZOOM;
  const scaledW = scaledH * (IMG_W / IMG_H);

  return (
    <div
      className="flex-shrink-0 rounded-full overflow-hidden border"
      style={{
        width: size,
        height: size,
        borderColor: "#E8E2D5",
        backgroundColor: "#FDFBF7",
        backgroundImage: `url(${SPRITE_URL})`,
        backgroundPosition: `${pos.x}% ${pos.y}%`,
        backgroundSize: `${scaledW}px ${scaledH}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
