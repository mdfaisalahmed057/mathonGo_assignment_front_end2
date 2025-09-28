import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon,MoonIcon,SunDimIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LeaderboardTable from './components/LeaderboardTable';
import BottomDiv from './components/BottomDiv';
const TopCards = ({ data, isDark }) => {
  const topThree = data.slice(0, 3);
const getRankStyles = (rank: any) => {
  switch(rank) {
    case 1:
      return {
        style: {
          background: 'var(--rank1-bg)',
          borderTop: '1px solid #FFC721',
          borderLeft: '1px solid #FFC721',
          borderRight: '1px solid #FFC721',
          borderBottom: 'none', 
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
        },
       rankBg: 'var(--rank2-rank-bg)',
        rankColor: 'var(--rank1-rank-color)',
        medalSrc: './1st.png' 
      };
    case 2:
      return {
        style: {
          background: 'var(--rank2-bg)',
          borderTop: '1px solid #8593A6',
          borderLeft: '1px solid #8593A6',
          borderRight: '1px solid #8593A6',
          borderBottom: 'none',
           borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
        },
        rankBg: 'var(--rank2-rank-bg)',
        rankColor: 'var(--rank2-rank-color)',
        medalSrc: './2.png'  
      };
    case 3:
      return {
        style: {
          background: 'var(--rank3-bg)',
          borderTop: '1px solid #F54A00',
          borderLeft: '1px solid #F54A00',
          borderRight: '1px solid #F54A00',
          borderBottom: 'none',
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
        },
           rankBg: 'var(--rank2-rank-bg)',
        rankColor: 'var(--rank2-rank-color)',
        medalSrc: './3.png'  
      };
    default:
      return {
        style: {
          background: 'var(--q3-surface-dim)',
          borderTop: '1px solid #EAF3FA',
          borderLeft: '1px solid #EAF3FA',
          borderRight: '1px solid #EAF3FA',
          borderBottom: 'none',
           borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
        },
        rankBg: 'var(--q3-surface-dimmer)',
        rankColor: 'var(--q3-neutral-light)',
        medalSrc: null
      };
  }
};
  return (
    <div className="hidden lg:grid grid-cols-4 gap-4 mb-6 mt-6 rounded-4xl">
      {topThree.map((student: any, index) => {
        const styles = getRankStyles(student.rank);
        const physicsScore = student.subjects?.find(s => s.subjectId?.title === 'Physics')?.totalMarkScored || 0;
        const chemScore = student.subjects?.find(s => s.subjectId?.title === 'Chemistry')?.totalMarkScored || 0;
        const mathScore = student.subjects?.find(s => s.subjectId?.title === 'Mathematics')?.totalMarkScored || 0;
        
        return (
          <div 
            key={student.userId._id} 
            className="p-4 space-y-3 overflow-hidden relative"
            style={{
              ...styles.style,
            }}
          >
            <div className="flex flex-col items-center relative ">
              <Avatar className="w-12 h-12 mb-2">
                <AvatarImage src={student.userId.profilePicture} alt={student.userId.name} />
                <AvatarFallback>{student.userId.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              {styles.medalSrc && (
                <div 
                  className="absolute" 
                  style={{ 
                    top: '48%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',  
                    width: '32px',  
                    height: '20px',  
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%', 
                  }}
                >
                  <img src={styles.medalSrc} alt={`${student.rank} Rank Medal`} className="w-full h-full object-contain" />
                </div>
              )}

              <h3 className="font-medium text-center mt-3" style={{ color: 'var(--q3-neutral-default)' }}>
                {student.userId.name}
              </h3>
              <div 
                className="px-2 py-1 rounded text-xs font-medium mt-1 text-black"
                style={{ 
                  backgroundColor: styles.rankBg,
                  color: styles.rankColor,
                  borderRadius: '40px'
                }}
              >
                {student.rank === 1 ? '1st' : student.rank === 2 ? '2nd' : '3rd'} Rank
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <img src='./check.png' alt="Overall Score icon"/>
                  <span style={{ color: 'var(--q3-neutral-light)' }}>Overall Score</span>
                </div>
                <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>
                  <span className='text-(--q3-neutral-light-v2) font-bold'> {student.totalMarkScored || 0}</span> / <span className='font-normal text-(--q3-neutral-light-v2) '>300</span>
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-(--q3-neutral-light-v2)">
                 <img src='./atom.png' alt="Physics Score icon"/>
                  <span style={{ color: 'var(--q3-neutral-light)' }}>Phy Score</span>
                </div>
                <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }} >{physicsScore}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                 <img src='./glass.png' alt="Chemistry Score icon"/>
                  <span style={{ color: 'var(--q3-neutral-light)' }}>Chem Score</span>
                </div>
                <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>{chemScore}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                 <img src='./multiplication.png' alt="Maths Score icon"/>
                  <span style={{ color: 'var(--q3-neutral-light)' }}>Maths Score</span>
                </div>
                <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>{mathScore}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <img src='./accry.png' alt="Accuracy icon"/>
                  <span style={{ color: 'var(--q3-neutral-light)' }}>Accuracy</span>
                </div>
                <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>{student.accuracy.toFixed(2)}%</span>
              </div>
            </div>
            
            <div
              className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${styles.style.background} 20%, transparent 100%)`
              }}
            />
          </div>
        );
      })}
      
      <div 
        className="p-4 space-y-3 overflow-hidden relative"
        style={{
          backgroundColor: 'var(--q3-surface-dim)',
          borderTop: '1px solid var(--q3-stroke-normal)',
          borderLeft: '1px solid var(--q3-stroke-normal)',
          borderRight: '1px solid var(--q3-stroke-normal)',
          borderBottom: 'none',
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
        }}
      >
        <div className="flex flex-col items-center">
          <Avatar className="w-12 h-12 mb-2">
            <AvatarImage 
              src="https://ui-avatars.com/api/?name=Prem%20Raj%20Kumar&background=6366f1&color=fff " 
              alt="Prem Raj Kumar" 
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-center" style={{ color: 'var(--q3-neutral-default)' }}>
            Prem Raj Kumar (You)
          </h3>
          <div 
            className="px-2 py-1 rounded text-xs font-medium mt-1 border "
            style={{ 
              backgroundColor: 'transparent',
              color: 'var(--q3-neutral-light)',
              borderColor: 'var(--q3-stroke-normal)',
              borderRadius: '40px'
            }}
          >
            73th Rank
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src='./check.png' alt="Overall Score icon"/>
              <span style={{ color: 'var(--q3-neutral-light)' }}>Overall Score</span>
            </div>
            <span className="font-bold" style={{ color: 'var(--q3-neutral-light-v2)' }}>
              109
              <span className="text-xs ml-1 font-normal" style={{ color: 'var(--q3-neutral-light)' }}>/300</span>
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src='./atom.png' alt="Physics Score icon"/>
              <span style={{ color: 'var(--q3-neutral-light)' }}>Phy Score</span>
            </div>
            <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>66</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src='./glass.png' alt="Chemistry Score icon"/>
              <span style={{ color: 'var(--q3-neutral-light)' }}>Chem Score</span>
            </div>
            <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>66</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src='./multiplication.png' alt="Maths Score icon"/>
              <span style={{ color: 'var(--q3-neutral-light)' }}>Maths Score</span>
            </div>
            <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>67</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src='./accry.png' alt="Accuracy icon"/>
              <span style={{ color: 'var(--q3-neutral-light)' }}>Accuracy</span>
            </div>
            <span className="font-normal" style={{ color: 'var(--q3-neutral-light-v2)' }}>80.30%</span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
          style={{
            background: `linear-gradient(to top, var(--q3-surface-dim) 20%, transparent 100%)`
          }}
        />
      </div>
    </div>
  );
};
 
const LeaderboardApp = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [topPerformers, setTopPerformers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>();
  const headerRef = useRef<any>(null);
  const bodyRef = useRef<any>(null);
  const userStripRef = useRef<any>(null);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) setScreenSize('mobile');
      else if (window.innerWidth < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleScroll = (e:any) => {
    const scrollLeft = e.target.scrollLeft;
    if (headerRef.current && headerRef.current !== e.target) {
      headerRef.current.scrollLeft = scrollLeft;
    }
    if (bodyRef.current && bodyRef.current !== e.target) {
      bodyRef.current.scrollLeft = scrollLeft;
    }
    if (userStripRef.current && userStripRef.current !== e.target) {
      userStripRef.current.scrollLeft = scrollLeft;
    }
  };

  const getGridColumns = () => {
    switch (screenSize) {
      case 'mobile': return 'minmax(120px, 1fr) 90px 60px 60px 60px 70px';
      case 'tablet': return '50px minmax(140px, 1fr) 120px 70px 70px 70px 80px';
      default: return '80px minmax(200px, 1fr) 150px 100px 100px 100px 100px';
    }
  };
  const getMinWidth = () => {
    switch (screenSize) {
      case 'mobile': return '540px';
      case 'tablet': return '600px';
      default: return '830px';
    }
  };
  const getFontSize = () => {
    switch (screenSize) {
      case 'mobile': return 'text-xs';
      case 'tablet': return 'text-xs';
      default: return 'text-sm';
    }
  };

  const fetchLeaderboardData = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.quizrr.in/api/hiring/leaderboard?page=${page}&limit=100`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data.results || []);
        setTotalPages(result.totalPages || 1)
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError(err.message);
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTopThree = async () => {
        try {
            const response = await fetch(`https://api.quizrr.in/api/hiring/leaderboard?page=1&limit=3`);
            if (!response.ok) throw new Error('Failed to fetch top performers');
            const result = await response.json();
            if (result.success && result.data) {
                setTopPerformers(result.data.results || []);
            }
        } catch (err) {
            console.error("Error fetching top performers:", err);
        }
    };
    fetchTopThree();
  }, []); 

  useEffect(() => {
    fetchLeaderboardData(currentPage);
  }, [currentPage]); 

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
  <div className="min-h-screen transition-colors" style={{ backgroundColor: 'var(--q3-surface-default)', color: 'var(--q3-neutral-default)' }}>
      <div className="max-w-7xl mx-auto p-2 sm:p-2 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 self-start bg-(--q3-surface-dimmer) rounded-full " 
              style={{ color: 'var(--q3-neutral-default)' }}
            >
              <ArrowLeftIcon size={20} />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--q3-neutral-default)' }}>
              Leaderboard
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--q3-neutral-light)' }}>
              JEE Main Test series / Qatar Part Test / Qatar Part Test DPP 11 - 1 CMU / Analysis / Leaderboard
            </p>
          </div>
      <Button 
        onClick={toggleTheme} 
        variant="outline" 
        size="sm"
        className="cursor-pointer flex items-center gap-2"
        style={{ 
          borderColor: 'var(--q3-stroke-normal)', 
          color: 'var(--q3-neutral-default)',
          backgroundColor: 'transparent'
        }}
      >
        {isDark ? <SunDimIcon size={18} /> : <MoonIcon size={18} />}
        <span className="hidden sm:inline">
          {isDark ? 'Light' : 'Dark'}
        </span>
      </Button>
        </div>

        {topPerformers.length > 0 && <TopCards data={topPerformers} isDark={isDark} />}

        {error && !loading && (
          <div className="mb-4 overflow-hidden rounded-lg border" style={{ 
            borderColor: 'var(--q3-danger-normal)', 
            backgroundColor: 'var(--q3-danger-light)' 
          }}>
            <div className="p-4">
              <div className="text-center" style={{ color: 'var(--q3-danger-dark)' }}>
                <p>Error loading data: {error}</p>
                <Button 
                  onClick={() => fetchLeaderboardData(currentPage)} 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  style={{ 
                    borderColor: 'var(--q3-danger-normal)', 
                    color: 'var(--q3-danger-dark)'
                  }}
                >
                  Retry
                </Button>
              </div>
            </div>
          </div>
        )}

     <LeaderboardTable 
          data={data} 
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          totalPages={totalPages}
          loading={loading}
          headerRef={headerRef}
          bodyRef={bodyRef}
          onScroll={handleScroll}
          screenSize={screenSize}
          getGridColumns={getGridColumns}
          getMinWidth={getMinWidth}
          getFontSize={getFontSize}
        />
      </div>

      {!loading && <BottomDiv
        userStripRef={userStripRef}
        onScroll={handleScroll}
        screenSize={screenSize}
        getGridColumns={getGridColumns}
        getMinWidth={getMinWidth}
        getFontSize={getFontSize}
      />}
    </div>
  );
};

export default LeaderboardApp;
