import React from 'react';
import { Image, ImageProps, ImageTheme, ArchitecturalPlaceholder } from './Image';

export type VisualTheme = ImageTheme;

export interface ArchitecturalVisualProps {
  theme?: VisualTheme;
  imageUrl?: string;
  alt?: string;
  className?: string;
  badgeText?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '16:10' | 'auto';
  showOverlay?: boolean;
}

export type SafeImageProps = ImageProps & {
  fallbackTheme?: ImageTheme;
};

// Export ArchitecturalPlaceholder as ArchitecturalIllustrationFallback for backward compatibility
export const ArchitecturalIllustrationFallback = ArchitecturalPlaceholder;

// Export SafeImage as a wrapper over Image
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackTheme,
  theme,
  ...props
}) => {
  return <Image src={src} theme={theme || fallbackTheme} {...props} />;
};

// Export ArchitecturalVisual as a wrapper over Image
export const ArchitecturalVisual: React.FC<ArchitecturalVisualProps> = ({
  theme = 'luxury-villa',
  imageUrl,
  alt = 'Advance Property Construction Architecture',
  className = '',
  badgeText,
  aspectRatio = '4:3',
  showOverlay = true,
}) => {
  return (
    <Image
      src={imageUrl}
      theme={theme}
      alt={alt}
      className={className}
      containerClassName="w-full h-full"
      aspectRatio={aspectRatio}
      showOverlay={showOverlay}
      badgeText={badgeText}
    />
  );
};

export { Image, ArchitecturalPlaceholder };
export default Image;
