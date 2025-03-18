"use client";
import React, { useRef, useEffect } from "react";
import { useModelViewer } from "@/components/model-viewer";

const ShoeShowCase = () => {
  const modelViewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Import the model viewer component
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      //   src="/glb/shoes-display-shelf.glb"
      ref={modelViewerRef}
      alt="3D Model"
      background-color="red"
      tone-mapping="aces"
      with-spotlight
      camera-controls
      camera-orbit="0deg 87deg 1m"
      camera-target="0m 5m 0m"
      field-of-view="14deg"
      exposure="1"
      // Limit horizontal rotation (left-right)
      min-camera-orbit="0deg 0deg auto"
      max-camera-orbit="10deg 100deg 20m"
      // Limit zoom distance

      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(18deg, rgba(230,241,244,1) 0%, rgba(255,255,255,1) 100%)",
      }}
      interpolation-decay="200"
      rotation-per-second="0"
    ></model-viewer>
  );
};

export default ShoeShowCase;
