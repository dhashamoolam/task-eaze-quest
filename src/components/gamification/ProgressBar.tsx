
interface ProgressBarProps {
  progress: number;
  max?: number;
}

const ProgressBar = ({ progress, max = 100 }: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));
  
  return (
    <div className="w-full bg-white/20 rounded-full h-2 mt-2 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-pink-400 to-violet-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
