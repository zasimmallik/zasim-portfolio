import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Cloud, fetchSimpleIcons, renderSimpleIcon, SimpleIcon } from "react-icon-cloud";

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#ECEEF2" : "#050507";
  const fallbackHex = theme === "light" ? "#090A0C" : "#FFFFFF";
  const minContrastRatio = theme === "dark" ? 2.2 : 1.5;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  });
};

interface IconCloudProps {
  iconSlugs?: string[];
  imageArray?: string[];
}

export default function IconCloud({
  // Default to an empty array if not provided
  iconSlugs = [],

  imageArray,
}: IconCloudProps) {
  const [data, setData] = useState<{ simpleIcons: Record<string, SimpleIcon> } | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme || "dark";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldFetch && iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }
  }, [shouldFetch, iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, currentTheme)
    );
  }, [data, currentTheme]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      {/* @ts-expect-error - Cloud component types might be incompatible */}
      <Cloud {...cloudProps}>
        <>
          <>{renderedIcons}</>
          {imageArray &&
            imageArray.length > 0 &&
            imageArray.map((image, index) => {
              return (
                <a key={index} href="#" onClick={(e) => e.preventDefault()}>
                  <img height="42" width="42" alt="A globe" src={image} />
                </a>
              );
            })}
        </>
      </Cloud>
    </div>
  );
}

