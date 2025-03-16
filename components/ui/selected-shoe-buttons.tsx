import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuickShow from "./quick-show";

interface ShoeButtonProps {
  hotspot: string;
  position: string;
  shoe: string;
  onQuick: (shoeName: string) => void;
}

const SelectShoeButtons = () => {
  const [activeQuick, setActiveQuick] = useState<string | null>(null);

  const handleQucikShow = (shoeName: string) => {
    setActiveQuick(shoeName);
  };

  return (
    <>
      <AdidasSamba>
        {/* Adidas Samba Green */}
        <ShoeButton
          hotspot="hotspot-8"
          position="0.7 3.5 1"
          shoe="adidas-samba-og-blue"
          onQuick={handleQucikShow}
        />

        {/* Adidas Samba Purple */}
        <ShoeButton
          hotspot="hotspot-9"
          position="-1.1 3.5 1"
          shoe="adidas-samba-og-purple"
          onQuick={handleQucikShow}
        />

        {/* Adidas Samba Blue */}
        <ShoeButton hotspot="hotspot-10" position="-0.2 4.4 1" />

        {/* Adidas Samba Grey */}
        <ShoeButton hotspot="hotspot-11" position="0.7 5.2 1" />

        {/* Adidas Samba Red */}
        <ShoeButton hotspot="hotspot-12" position="-1.1 5.2 1" />
      </AdidasSamba>
      <NikeDuns />
      <AdidasSamSmith />
      <VanSkateBlack />
      <NikeAirmax />
      <QcCloud9 />
      <NikeAirForceOne />
      <QuickShow />
    </>
  );
};

export default SelectShoeButtons;

const ShoeButton = ({ hotspot, position, shoe, onQuick }: ShoeButtonProps) => {
  return (
    <motion.button
      slot={hotspot}
      data-position={position}
      data-normal="0 1 0"
      className="relative w-fit h-fit cursor-pointer"
      initial={{ scale: 1, opacity: 0.7 }}
      whileHover={{ scale: 3, opacity: 1 }}
      onClick={() => onQuick(shoe)}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping-2s rounded-full bg-blue-100 opacity-75 duration-1000"></span>
        <span className="relative inline-flex size-2 rounded-full bg-blue-100"></span>
      </span>
    </motion.button>
  );
};

import { ReactNode } from "react";

const AdidasSamba = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const NikeDuns = () => {
  return (
    <>
      {/* Nike Dun Grey */}
      <ShoeButton hotspot="hotspot-2" position="4.9 5 1" />

      {/* Nike Dun Valetine */}
      <ShoeButton hotspot="hotspot-3" position="6.7 5.45 1" />

      {/* Nike Dun Indigo */}
      <ShoeButton hotspot="hotspot-4" position="6.7 4.3 1" />

      {/* Nike Dun UCLA */}
      <ShoeButton hotspot="hotspot-5" position="6.7 3.1 1" />

      {/* Nike Dun Panda */}
      <ShoeButton hotspot="hotspot-6" position="4.9 3.1 1" />
    </>
  );
};

const AdidasSamSmith = () => {
  return (
    <>
      {/* Adidas Sam Smith */}
      <ShoeButton hotspot="hotspot-16" position="-5.2 3.1 1" />
    </>
  );
};

const VanSkateBlack = () => {
  return (
    <>
      {/* Van Skate Black */}
      <ShoeButton hotspot="hotspot-7" position="2.9 3.1 1" />
    </>
  );
};

const NikeAirmax = () => {
  return (
    <>
      {/* Nike Airmax Blue */}
      <ShoeButton hotspot="hotspot-17" position="-7.1 3.1 1" />

      {/* Nike Airmax Pink */}
      <ShoeButton hotspot="hotspot-18" position="-7.1 4.2 1" />

      {/* Nike Airmax Brown */}
      <ShoeButton hotspot="hotspot-19" position="-7.1 5.45 1" />
    </>
  );
};

const QcCloud9 = () => {
  return (
    <>
      {/* QC Cloud 9 Black */}
      <ShoeButton hotspot="hotspot-13" position="-3.1 5 1" />

      {/* QC Cloud 9 Sand */}
      <ShoeButton hotspot="hotspot-14" position="-5.2 5 1" />

      {/* QC Cloud 9 Grey */}
      <ShoeButton hotspot="hotspot-15" position="-3.1 3.1 1" />
    </>
  );
};

const NikeAirForceOne = () => {
  return (
    <>
      {/* Nike Air Force One */}
      <ShoeButton hotspot="hotspot-1" position="2.9 5 1" />
    </>
  );
};
