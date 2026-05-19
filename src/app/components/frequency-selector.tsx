import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type FrequencyOption = {
  value: string;
  label: string;
  sublabel?: string;
  price: number;
  originalPrice: number;
  isRecommended?: boolean;
};

export interface FrequencySelectorProps {
  options: FrequencyOption[];
  defaultValue?: string;
  onFrequencyChange?: (frequency: string) => void;
  interactive?: boolean;
}

export function FrequencySelector({
  options,
  defaultValue,
  onFrequencyChange,
  interactive = true,
}: FrequencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.value
  );

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onFrequencyChange?.(value);
  };

  const handleToggle = () => {
    if (interactive) {
      setIsOpen(!isOpen);
    }
  };

  if (!selectedOption) return null;

  const isSubscription = selectedOption.price < selectedOption.originalPrice;

  return (
    <div className="w-[295px] flex flex-col gap-[4px] relative">
      <div className="rounded-[10px] border border-[#e2d9c2] relative">
        {/* "Added to cart" label with green checkmark */}
        <div className="absolute top-[-8px] left-[8px] bg-white px-[4px] z-10 flex items-center gap-[4px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect width="11.2812" height="11.2812" rx="5.64062" fill="#B9C2A6" />
            <path d="M2.50684 6.26725L4.59596 8.7742C5.29233 7.38145 7.1029 4.17813 8.7742 2.50684" stroke="white" strokeWidth="0.626736" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Simplon Norm',sans-serif] font-medium text-[10px] text-[#4d523c] leading-[1.5]">
            Added to cart
          </p>
        </div>

        {/* Closed State - Button */}
        <button
          onClick={handleToggle}
          disabled={!interactive}
          className={`w-full px-[12px] py-[16px] flex flex-col gap-[4px] ${
            interactive ? "cursor-pointer hover:bg-[#fafaf8]" : "cursor-default"
          } transition-colors rounded-[10px]`}
        >
          <div className="flex gap-[12px] items-center w-full">
            {/* Product Info */}
            <div className="flex flex-col items-start flex-1 text-left">
              <p className="font-['Simplon Norm',sans-serif] text-[12px] text-[#4d523c] tracking-[0.24px] leading-[1.5]">
                {selectedOption.label}
              </p>
            </div>

            {/* Chevron - only show if interactive */}
            {interactive && (
              <>
                <motion.svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="shrink-0"
                  animate={{ rotate: isOpen ? -135 : 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    d="M8.5 1.5V8.5H1.5"
                    stroke="#323429"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </>
            )}
          </div>
        </button>

        {/* Expanded Options */}
        <AnimatePresence>
          {isOpen && interactive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#e2d9c2]"
            >
              <div className="flex flex-col">
                {options.map((option, index) => {
                  const isSelected = option.value === selectedValue;
                  const isOptionSubscription = option.price < option.originalPrice;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full px-[12px] py-[12px] min-h-[56px] flex gap-[12px] items-center hover:bg-[#fafaf8] transition-colors ${
                        index !== 0 ? "border-t border-[#e2d9c2]" : ""
                      }`}
                    >
                      {/* Radio button */}
                      <div className="size-[16px] rounded-full border-2 border-[#323429] flex items-center justify-center shrink-0">
                        {isSelected && (
                          <div className="size-[8px] rounded-full bg-[#323429]" />
                        )}
                      </div>

                      {/* Option info */}
                      <div className="flex flex-col gap-[2px] items-start flex-1 text-left">
                        <p className="font-['Simplon Norm',sans-serif] text-[12px] text-[#4d523c] tracking-[0.24px] leading-[1.5]">
                          {option.label}
                        </p>
                      </div>

                      {/* Option price - only for one-time purchase */}
                      {!isOptionSubscription && (
                        <div className="flex flex-col gap-[2px] items-end shrink-0">
                          <p className="font-['Simplon Norm',sans-serif] font-medium text-[14px] text-[#161716] leading-[1.5]">
                            ${option.price.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom pricing row */}
      <div className="flex items-center justify-between px-[12px] pt-[8px] w-full">
        {isSubscription ? (
          <>
            <p className="font-['Simplon Norm',sans-serif] leading-[1.5] text-[#4d523c] text-[10px] tracking-[0.2px]">
              60% off first subscription order
            </p>
            <div className="flex items-center gap-[6px]">
              <p className="font-['Simplon Norm',sans-serif] text-[10px] text-[#6c6c6c] line-through tracking-[0.2px] leading-[1.5]">
                ${selectedOption.originalPrice.toFixed(2)}
              </p>
              <div className="bg-[#ecff92] px-[4px] rounded-[4px] flex items-center justify-center">
                <p className="font-['Simplon Norm',sans-serif] font-medium text-[14px] text-[#161716] leading-[1.5]">
                  ${selectedOption.price.toFixed(2)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div />
            <p className="font-['Simplon Norm',sans-serif] font-medium text-[14px] text-[#161716] leading-[1.5]">
              ${selectedOption.price.toFixed(2)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}