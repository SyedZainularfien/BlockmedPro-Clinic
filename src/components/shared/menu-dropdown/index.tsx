import React, { useRef, useState } from 'react';

import useClickOutside from '@/hooks/outside-click/useOutsideClick';
import { IDropdownItemType } from '@/types';
import Iconify from '../iconify';

type ThreeDotsDropdownProps = {
  items: IDropdownItemType[];
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  icon?: any;
  iconStyling?: string;
  idx?: number;
  totalDataLength?: number;
  reduceValue?: number;
};

const variantStyles = {
  default: {
    bg: 'bg-white',
    text: 'text-black',
    hoverBg: 'hover:bg-primary-dark',
    hoverText: 'hover:text-white',
  },
  primary: {
    bg: 'bg-white',
    text: 'text-black',
    hoverBg: 'hover:bg-primary-dark',
    hoverText: 'hover:text-white',
  },
  secondary: {
    bg: 'bg-white',
    text: 'text-red',
    hoverBg: 'hover:bg-red',
    hoverText: 'hover:text-white',
  },
};

const MenuDropdown = ({
  items,
  position = 'left',
  icon,
  idx = 0,
  totalDataLength = 0,
  reduceValue = 1,
}: ThreeDotsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: IDropdownItemType) => {
    if (!item.isDisabled && item.onClick) {
      item?.onClick();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* button */}
      <button ref={buttonRef} type="button" onClick={toggleDropdown} aria-expanded={isOpen} aria-haspopup="true">
        {icon ? icon : <Iconify icon="mdi:dots-vertical" className="text-gray-600" width={22} height={22} />}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 w-48 bg-white rounded-xl shadow-xl focus:outline-none ${
            idx >= totalDataLength - reduceValue ? 'mb-2 bottom-full' : 'mt-0.5 top-full'
          } ${position === 'left' ? 'right-3' : 'left-0'}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-2 flex flex-col gap-1.5 overflow-y-auto" role="none">
            {items?.map((dropdownItem, index) => {
              const variant = variantStyles[dropdownItem.variant ?? 'default'];
              return (
                <React.Fragment key={dropdownItem.id || `item-${index}`}>
                  <button
                    onClick={() => handleItemClick(dropdownItem)}
                    className={`mx-2 text-left text-sm flex items-center rounded-lg px-4 py-3 gap-3 ${variant.bg} ${variant.text} ${variant.hoverBg} ${variant.hoverText} ${dropdownItem.isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition-colors`}
                    role="menuitem"
                    disabled={dropdownItem.isDisabled}
                  >
                    <Iconify
                      icon={dropdownItem.icon}
                      className={`flex-shrink-0 ${dropdownItem.iconStyling}`}
                      width={20}
                      height={20}
                    />
                    {dropdownItem.label}
                  </button>
                  {dropdownItem.id !== (items?.[items.length - 1]?.id ?? '') && (
                    <hr className="border-t border-gray-200" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
