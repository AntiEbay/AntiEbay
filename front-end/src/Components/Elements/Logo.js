import react from "react";
//Text that can be used as a logo
const Logo = () => {
  return (
    <div className="flex text-sm md:text-base tracking-tighter text-white font-bold italic border-solid border-x-neutral-700">
      <span className=" hidden md:flex">Anti-eBay</span>
      <span className=" flex md:hidden">A-E</span>
    </div>
  );
};

export default Logo;
