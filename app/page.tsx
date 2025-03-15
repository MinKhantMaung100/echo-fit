"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import Liner from "@/public/svg/liner.svg";
import DisplayPoster from "@/public/webp/one.png";
import HeroImage from "@/public/webp/hero-image.webp";
import { AnimatePresence, motion } from "framer-motion";
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

export default function Home() {
  const containerRef = useRef(null);

  const modelViewerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    import("@google/model-viewer");

    const modelViewer = modelViewerRef.current;
    console.log(modelViewer);
    if (!modelViewer) return;

    modelViewer.addEventListener("progress", (event) => {
      const loadProgress = Math.floor(event.detail.totalProgress * 100);
      setProgress(loadProgress);
    });
  }, []);

  return (
    <section className="flex flex-col h-screen ">
      {/* 3d Model here */}
      <div className="relative w-full min-h-[60%]" ref={containerRef}>
        {/* <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={<Loader />}>
            <Model url="/glb/shoes-display-shelf.glb" />
            <OrbitControls />
          </Suspense>
        </Canvas> */}

        <ModelViewer
          src="glb/shoes-display-shelf.glb"
          ref={modelViewerRef}
          alt="3D Model"
          background-color="red"
          tone-mapping="aces"
          with-spotlight
          camera-controls
          camera-orbit="0deg 87deg 1m"
          camera-target="0m 5.1m 1m"
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
            {progress >= 100 ? null : <LoadingShelf progress={progress} />}
          </AnimatePresence>
          <button
            slot="hotspot-1"
            data-position="2.9 5 1"
            data-normal="0 1 0"
            className="relative w-fit h-fit"
          >
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping-2s rounded-full bg-blue-100 opacity-75 duration-1000"></span>
              <span className="relative inline-flex size-3 rounded-full bg-blue-100"></span>
            </span>
          </button>
        </ModelViewer>
      </div>

      {/* Shoe Preview */}
      <section></section>

      {/* Content */}
      <div className="bg-ambe-100 w-full min-h-[40%] py-8 px-16 flex flex-col justify-between">
        {/* Main Area */}
        <div className="flex items-center">
          <div className="w-[60%]">
            <h1 className="text-4xl font-urbanist font-urbanist-italic-semibold leading-12 text-my-primary b-red-300 w-fit flex flex-col gap-0">
              <span>Try-View-Buy</span>
              <span>Experience Shoes in 3D</span>
            </h1>
            <p className="text-xl pt-2 text-my-primary">
              Step into the Future with EcoFit's Virtual
              <br />
              Shoe Experience.
            </p>
          </div>

          <div className="w-[40%] bg-aber-200 overflow-hidden flex justify-end items-center b-amber-200">
            <Image
              src={HeroImage}
              alt="hero-image.webp"
              className="w-[16rem]"
            />
          </div>
        </div>

        {/* Footer */}
        <div>
          <Image src={Liner} alt="footer-liner-svg" className="w-[14rem]" />
        </div>
      </div>
    </section>
  );
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function ModelViewer(props: any) {
  useEffect(() => {
    // Dynamically import the web component on the client side
    import("@google/model-viewer");
  }, []);

  return <model-viewer {...props} />;
}

function LoadingShelf({ progress }) {
  return (
    <div
      slot="progress-bar"
      className="absolute w-full h-full bg-white bg-opacity-70 rounded-lg text-center shadow-md"
    >
      <div className="h-full bg-gray-200 rounded overflow-hidden my-1">
        <motion.div className="w-full h-full relative">
          <motion.div animate={{ opacity: `${progress}%` }}>
            <Image
              src={DisplayPoster}
              alt="footer-liner"
              className="w-full h-full relative z-10"
            />
          </motion.div>

          <motion.div
            className={`w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blue-400 to-blue-500 z-20 transition-all duration-500`}
            animate={{ width: `${100 - progress}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
            }}
          ></motion.div>
        </motion.div>
      </div>
      <p className="my-1 text-sm text-gray-800">Loading: {progress}%</p>
    </div>
  );
}
