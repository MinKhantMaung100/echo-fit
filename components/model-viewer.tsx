import { useState, useEffect, useRef } from "react";

// Define the type for ModelViewer element
interface ModelViewerElement extends HTMLElement {
  addEventListener(
    type: "progress",
    listener: (event: CustomEvent<{ totalProgress: number }>) => void
  ): void;
  removeEventListener(
    type: "progress",
    listener: (event: CustomEvent<{ totalProgress: number }>) => void
  ): void;
}

interface UseModelViewerOptions {
  onProgressComplete?: () => void;
  onProgressUpdate?: (progress: number) => void;
  children?: React.ReactNode;
}

export function useModelViewer(options?: UseModelViewerOptions) {
  const modelViewerRef = useRef<ModelViewerElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Import the model viewer component
    import("@google/model-viewer");

    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    // Define the progress event handler
    const handleProgress = (event: CustomEvent<{ totalProgress: number }>) => {
      const loadProgress = Math.floor(event.detail.totalProgress * 100);
      setProgress(loadProgress);

      // Call the optional progress update callback
      options?.onProgressUpdate?.(loadProgress);

      // If we've reached 100%, mark as loaded and call the completion callback
      if (loadProgress === 100 && !isLoaded) {
        setIsLoaded(true);
        options?.onProgressComplete?.();
      }
    };

    // Add the event listener
    modelViewer.addEventListener("progress", handleProgress);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener("progress", handleProgress);
      }
    };
  }, [options, isLoaded]);

  return {
    modelViewerRef,
    progress,
    isLoaded,
  };
}
