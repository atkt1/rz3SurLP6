import { cn } from '@/lib/utils';

interface NextButtonProps {
  isEnabled: boolean;
  onClick: () => void;
}

export function NextButton({ isEnabled, onClick }: NextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isEnabled}
      className={cn(
        "mt-6 w-full sm:w-auto ml-auto",
        "flex items-center justify-center gap-2",
        "px-6 py-2.5 rounded-lg font-medium",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        isEnabled
          ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
          : "bg-gray-100 text-gray-400 cursor-not-allowed",
      )}
      aria-label={isEnabled ? "Continue to next step" : "Please fill in required fields"}
    >
      Next
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  );
}