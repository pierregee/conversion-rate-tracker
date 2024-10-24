"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useNetwork, { NetworkOption, networkOptions } from "@/hooks/useNetwork";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"; // Or your preferred icon library

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
    <div className="relative inline-block p-4">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-2 rounded-md bg-white px-4 py-2 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {network}
          {!isOpen && <ChevronDownIcon className="h-5 w-5" />}
          {isOpen && <ChevronUpIcon className="h-5 w-5 mt-1" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-md bg-white shadow-lg">
          <div className="py-1" role="menu" tabIndex={-1}>
            {Object.keys(networkOptions).map((option) => (
              <a
                key={option}
                href="#"
                className="text-gray-600 block px-4 py-2 text-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-300"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(option as NetworkOption);
                }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkDropdown;
