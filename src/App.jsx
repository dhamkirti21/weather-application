import '@/App.css';
import BackgroundWrapper from './components/BackgroundWrapper';
import { useSelector } from 'react-redux';
import AnimationWrapper from "@/components/motion/ScrollUpDiv"
import Box from './components/Box';
import { memo } from 'react';

function App() {
  const mode = memo(useSelector((state) => state.mode));
  const textColor = mode === "clear sky" || mode === "few-clouds" ? "text-white" : "text-slate-200";


  return (
    <BackgroundWrapper>
      <AnimationWrapper>
        <div className="w-full h-full flex flex-col justify-center items-center py-12">
          <div className={`p-6 ${textColor} bg-white/20 dark:bg-gray-800/40 rounded-lg shadow-lg backdrop-blur-sm`}>
            <Box key={mode} mode={mode} />
          </div>
        </div>
      </AnimationWrapper>
    </BackgroundWrapper>
  );
}

export default App;
