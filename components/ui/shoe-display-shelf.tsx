import React, { useEffect, useState, useRef } from "react";
import SelectShoeButtons from "@/components/ui/selected-shoe-buttons";
import { AnimatePresence, motion } from "framer-motion";
import ShoeImage from "@/public/png/iso-two.png";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
interface LoadingShelfProps {
  progress: number;
}
// Array of PNG paths
const frames = [
  "/webp/iso-one.webp",
  "/webp/iso-two.webp",
  "/webp/iso-three.webp",
  "/webp/iso-four.webp",
  "/webp/iso-four-one.webp",
  "/webp/iso-three-two.webp",
  "/webp/iso-two-one.webp",
  // ...more frames
];

const ShoeDisplayShelf = () => {
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Import the model viewer component
    import("@google/model-viewer");

    const modelViewer = modelViewerRef.current;
    console.log(modelViewer);

    if (!modelViewer) return;

    // Define the progress event handler
    const handleProgress = (event: CustomEvent<{ totalProgress: number }>) => {
      const loadProgress = Math.floor(event.detail.totalProgress * 100);
      setProgress(loadProgress);
    };

    // Add the event listener
    modelViewer.addEventListener("progress", handleProgress);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener("progress", handleProgress);
      }
    };
  }, []);

  return (
    <ModelViewer
      src="glb/shoes-display-shelf.glb"
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
    >
      <AnimatePresence>
        {progress >= 100 ? (
          <>
            <SelectShoeButtons />
          </>
        ) : (
          <LoadingShelf progress={progress} />
        )}
      </AnimatePresence>
    </ModelViewer>
  );
};

export default ShoeDisplayShelf;

function ModelViewer(props: any) {
  useEffect(() => {
    // Dynamically import the web component on the client side
    import("@google/model-viewer");
  }, []);

  return <model-viewer {...props} />;
}

function LoadingShelf({ progress }: LoadingShelfProps) {
  return (
    <motion.div
      className="w-full h-full relative bg-[#93B3CD]"
      exit={{ opacity: 0 }}
    >
      <AnimatedLoadingSequence />
      <div
        slot="progress-bar"
        className="absolute w-[20%] -translate-1.5 h-fit text-center bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/20 p-4"
      >
        <motion.span
          className="h-4 bg-[#164055] block rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          exit={{ width: "0%" }}
        ></motion.span>
        <p className="my-1 text-sm text-gray-800 font-urbanist font-urbanist-italic-semibold">
          Loading 3D Model: {progress}%
        </p>
      </div>
    </motion.div>
  );
}

export function AnimatedLoadingSequence() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 1000 / 6); // 12 fps

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className="absolute top-10 left-0 right-0 w-1/2 h-[80%] m-auto  bg-white p-0.5">
        <motion.img
          key={frame}
          src={frames[frame]}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1, // Smooth transition duration
            ease: "easeInOut",
          }}
          className="w-full h-full object-cover"
        />

        <motion.img
          key={`preload-${(frame + 1) % frames.length}`}
          src={frames[(frame + 1) % frames.length]}
          className="w-full h-full object-cover opacity-0 absolute top-0 left-0"
        />
      </div>
    </AnimatePresence>
  );
}
