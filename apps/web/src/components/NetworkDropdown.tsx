"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useNetwork, { NetworkOption, networkOptions } from "@/hooks/useNetwork";

function NetworkDropdown() {
  const { network, setNetwork } = useNetwork();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: NetworkOption) => {
    setNetwork(option);
    router.push(`${pathname}?network=${networkOptions[option]}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>{network}</button>
      {isOpen && (
        <ul className="absolute">
          {Object.keys(networkOptions).map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option as NetworkOption)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NetworkDropdown;
