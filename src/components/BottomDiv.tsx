import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ScreenSize = "mobile" | "tablet" | "desktop" | null;

type BottomDivProps = {
  userStripRef: React.RefObject<HTMLDivElement>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  screenSize: ScreenSize;
  getGridColumns: () => string;
  getMinWidth: () => string;
  getFontSize: () => string;
};

const BottomDiv: React.FC<BottomDivProps> = ({
  userStripRef,
  onScroll,
  screenSize,
  getGridColumns,
  getMinWidth,
  getFontSize,
}) => {
  if (!screenSize) return null;

  return (
    <div className="sticky bottom-4 mt-4 z-10">
      <div
        className="max-w-7xl mx-auto rounded-l-xl rounded-r-xl border"
        style={{
          backgroundColor: "var(--q3-surface-dim)",
          borderColor: "var(--q3-stroke-normal)",
        }}
      >
        <div
          ref={userStripRef}
          onScroll={onScroll}
          className="overflow-x-auto scrollbar-none rounded-l-2xl rounded-r-2xl"
        >
          <div
            className={`px-4 py-3 grid gap-1 items-center ${getFontSize()}`}
            style={{
              gridTemplateColumns: getGridColumns(),
              color: "var(--q3-neutral-default)",
              minWidth: getMinWidth(),
            }}
          >
            {screenSize === "mobile" ? (
              <>
                <div className="flex items-center gap-2 overflow-hidden">
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                    style={{
                      fontSize: "8px",
                      backgroundColor: "#FFFFFF",
                      color: "var(--q3-neutral-light)",
                    }}
                  >
                    73
                  </div>
                  <Avatar className="w-4 h-4 flex-shrink-0">
                    <AvatarImage
                      src="https://ui-avatars.com/api/?name=Prem%20Raj%20Kumar&background=6366f1&color=fff"
                      alt="Prem Raj Kumar"
                    />
                    <AvatarFallback
                      className="text-xs"
                      style={{ fontSize: "8px" }}
                    >
                      PR
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate text-xs">
                    Prem (You)
                  </span>
                </div>

                <div className="font-medium text-right text-xs">
                  <div className="inline-block bg-white py-1 px-3 rounded-full">
                    <span className="text-[var(--q3-neutral-default)]">
                      199
                    </span>{" "}
                    /{" "}
                    <span className="font-normal text-[var(--q3-neutral-light-v2)]">
                      300
                    </span>
                  </div>
                </div>

                <div className="font-medium text-right text-xs">66</div>
                <div className="font-medium text-right text-xs">66</div>
                <div className="font-medium text-right text-xs">67</div>
                <div className="font-medium text-right text-xs">80.30%</div>
              </>
            ) : (
              <>
                <div className="font-medium text-center flex justify-center items-center">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "var(--q3-neutral-light)",
                    }}
                  >
                    73
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-hidden">
                  <Avatar
                    className={`${
                      screenSize === "tablet" ? "w-5 h-5" : "w-8 h-8"
                    } flex-shrink-0`}
                  >
                    <AvatarImage
                      src="https://ui-avatars.com/api/?name=Prem%20Raj%20Kumar&background=6366f1&color=fff"
                      alt="Prem Raj Kumar"
                    />
                    <AvatarFallback
                      className={screenSize === "tablet" ? "text-xs" : ""}
                    >
                      PR
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate">
                    Prem Raj Kumar (You)
                  </span>
                </div>

                <div className="font-medium text-right">
                  <div className="inline-block bg-white py-1 px-3 rounded-full">
                    <span className="text-[var(--q3-neutral-default)]">
                      199
                    </span>{" "}
                    /{" "}
                    <span className="font-normal text-[var(--q3-neutral-light-v2)]">
                      300
                    </span>
                  </div>
                </div>

                <div className="font-medium text-right">66</div>
                <div className="font-medium text-right">66</div>
                <div className="font-medium text-right">67</div>
                <div className="font-medium text-right">80.30%</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomDiv;
