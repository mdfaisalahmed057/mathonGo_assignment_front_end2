import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Student = {
  rank: number;
  userId: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  subjects: {
    subjectId: {
      title: string;
    };
    totalMarkScored: number;
  }[];
  totalMarkScored: number;
  accuracy: number;
};

type ScreenSize = 'mobile' | 'tablet' | 'desktop' | null;

type LeaderboardTableProps = {
  data: Student[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
  bodyRef: React.RefObject<HTMLDivElement>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  screenSize: ScreenSize;
  getGridColumns: () => string;
  getMinWidth: () => string;
  getFontSize: () => string;
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  loading,
  headerRef,
  bodyRef,
  onScroll,
  screenSize,
  getGridColumns,
  getMinWidth,
  getFontSize,
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

const getPaginationItems = () => {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  if (currentPage <= 3) {
    pages.push(1, 2, 3, "...", totalPages);
    return pages;
  }

  if (currentPage > totalPages - 3) {
    pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    return pages;
  }
  pages.push(
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages
  );
  return pages;
};


  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-black/60">
        <div className="flex items-center gap-4 rounded-lg bg-white px-6 py-4 shadow-lg dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <div
        className="flex flex-col overflow-hidden rounded-lg border max-w-7xl mx-auto"
        style={{
          borderColor: 'var(--q3-stroke-normal)',
          backgroundColor: 'var(--q3-surface-default)',
          height: '70vh',
          minHeight: '600px',
        }}
      >
        <div ref={headerRef} onScroll={onScroll} className="overflow-x-auto scrollbar-none flex-shrink-0">
          <div
            className={`border-b px-4 py-2 font-medium grid gap-1 items-center ${getFontSize()}`}
            style={{
              gridTemplateColumns: getGridColumns(),
              borderBottomColor: 'var(--q3-stroke-normal)',
              backgroundColor: 'var(--q3-surface-dim)',
              color: 'var(--q3-neutral-light)',
              minWidth: getMinWidth(),
            }}
          >
            {screenSize === 'mobile' ? (
              <>
                <div className="text-left">Student</div>
                <div className="text-right">Overall Score</div>
                <div className="text-right">Phy</div>
                <div className="text-right">Chem</div>
                <div className="text-right">Math</div>
                <div className="text-right">Acc</div>
              </>
            ) : (
              <>
                <div className="text-center">Rank</div>
                <div className="text-left">Student Name</div>
                <div className="text-right">Overall Score</div>
                <div className="text-right">Phy</div>
                <div className="text-right">Chem</div>
                <div className="text-right">Math</div>
                <div className="text-right">Accuracy</div>
              </>
            )}
          </div>
        </div>

        <div ref={bodyRef} onScroll={onScroll} className="flex-1 overflow-auto">
          <div style={{ minWidth: getMinWidth() }}>
            {data.map((student) => {
              const physicsScore =
                student.subjects?.find((s) => s.subjectId?.title === 'Physics')?.totalMarkScored || 0;
              const chemScore =
                student.subjects?.find((s) => s.subjectId?.title === 'Chemistry')?.totalMarkScored || 0;
              const mathScore =
                student.subjects?.find((s) => s.subjectId?.title === 'Mathematics')?.totalMarkScored || 0;

              const circleStyle = {
                backgroundColor: 'var(--q3-surface-dimmer)',
                color: 'var(--q3-neutral-light)',
              };

              return (
                <div
                  key={student.userId?._id}
                  className={`border-b px-4 py-2 grid gap-1 items-center transition-colors hover:bg-[var(--q3-surface-dim)] ${getFontSize()}`}
                  style={{
                    gridTemplateColumns: getGridColumns(),
                    borderBottomColor: 'var(--q3-stroke-light)',
                    color: 'var(--q3-neutral-default)',
                  }}
                >
                  {screenSize === 'mobile' ? (
                    <>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div
                          className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                          style={{ fontSize: '8px', ...circleStyle }}
                        >
                          {student.rank}
                        </div>
                        <Avatar className="w-4 h-4 flex-shrink-0">
                          <AvatarImage src={student.userId?.profilePicture} alt={student.userId?.name} />
                          <AvatarFallback className="text-xs" style={{ fontSize: '8px' }}>
                            {student.userId?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate text-xs">
                          {student.userId?.name.split(' ')[0]}
                        </span>
                      </div>

                      <div className="font-medium text-right text-xs">
                        <div className="inline-block bg-[var(--q3-surface-dim)] py-1 px-3 rounded-full">
                          <span className="text-[var(--q3-neutral-default)]">
                            {student.totalMarkScored || 0}
                          </span>{' '}
                          /{' '}
                          <span className="font-normal text-[var(--q3-neutral-light-v2)]">300</span>
                        </div>
                      </div>

                      <div className="font-medium text-right text-xs">{physicsScore}</div>
                      <div className="font-medium text-right text-xs">{chemScore}</div>
                      <div className="font-medium text-right text-xs">{mathScore}</div>
                      <div className="font-medium text-right text-xs">
                        {(student.accuracy || 0).toFixed(2)}%
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-medium text-center flex justify-center items-center">
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                          style={circleStyle}
                        >
                          {student.rank}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 overflow-hidden">
                        <Avatar className={`${screenSize === 'tablet' ? 'w-5 h-5' : 'w-8 h-8'} flex-shrink-0`}>
                          <AvatarImage src={student.userId?.profilePicture} alt={student.userId?.name} />
                          <AvatarFallback className={screenSize === 'tablet' ? 'text-xs' : ''}>
                            {student.userId?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate">
                          {screenSize === 'tablet'
                            ? student.userId?.name.split(' ')[0]
                            : student.userId?.name}
                        </span>
                      </div>

                      <div className="font-medium text-right">
                        <div className="inline-block bg-[var(--q3-surface-dim)] py-1 px-3 rounded-full">
                          <span className="text-[var(--q3-neutral-default)]">
                            {student.totalMarkScored || 0}
                          </span>{' '}
                          /{' '}
                          <span className="font-normal text-[var(--q3-neutral-light-v2)]">300</span>
                        </div>
                      </div>

                      <div className="font-medium text-right">{physicsScore}</div>
                      <div className="font-medium text-right">{chemScore}</div>
                      <div className="font-medium text-right">{mathScore}</div>
                      <div className="font-medium text-right">
                        {(student.accuracy || 0).toFixed(2)}%
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-2 px-4 py-4 border-t flex-shrink-0"
          style={{
            backgroundColor: 'var(--q3-surface-dim)',
            borderTopColor: 'var(--q3-stroke-normal)',
          }}
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer text-sm hover:opacity-80 disabled:opacity-50 transition-opacity px-3 py-1 border border-[var(--q3-stroke-light)] rounded-full"
            style={{ color: 'var(--q3-neutral-light)' }}
          >
            Previous
          </button>

          {getPaginationItems().map((item, index) =>
            typeof item === 'string' ? (
              <span
                key={index}
                className="text-sm px-1"
                style={{ color: 'var(--q3-neutral-light)' }}
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(item)}
                className="cursor-pointer w-8 h-8 text-sm font-medium rounded-full flex items-center justify-center transition-all border"
                style={{
                  backgroundColor: item === currentPage ? '#432DD7' : 'transparent',
                  color: item === currentPage ? 'white' : 'var(--q3-neutral-light)',
                  borderColor:
                    item === currentPage
                      ? 'var(--q3-stroke-normal-v2)'
                      : 'var(--q3-stroke-light)',
                }}
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer text-sm hover:opacity-80 disabled:opacity-50 transition-opacity px-3 py-1 rounded-full border border-[var(--q3-stroke-light)]"
            style={{ color: 'var(--q3-neutral-light)' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
