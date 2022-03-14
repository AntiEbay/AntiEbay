import React from "react";
//Text that can be used as a logo
/**
 *
 * @returns A JSX element that changes based on the size of the screen.
 * On smaller screens A-E will be shown while on larger screens Anti-eBay is shown.
 */
const Logo = () => {
  return (
    <div className="flex text-sm md:text-base tracking-tighter text-white font-bold italic border-solid border-x-neutral-700">
      <span className=" hidden md:flex">Anti-eBay</span>
      <span className=" mt-1 flex md:hidden">A-E</span>
    </div>
  );
};

export default Logo;
