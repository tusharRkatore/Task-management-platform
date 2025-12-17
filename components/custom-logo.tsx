export function TaskFlowLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center">
        {/* Custom geometric logo design */}
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* Outer circle */}
          <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" opacity="0.9" />
          {/* Checkmark design */}
          <path
            d="M12 20 L17 25 L28 14"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Decorative dots */}
          <circle cx="8" cy="12" r="2" fill="white" opacity="0.6" />
          <circle cx="32" cy="28" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        TaskFlow
      </span>
    </div>
  )
}

export function TaskFlowLogoSmall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logoGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#logoGradientSmall)" opacity="0.9" />
      <path
        d="M12 20 L17 25 L28 14"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="8" cy="12" r="2" fill="white" opacity="0.6" />
      <circle cx="32" cy="28" r="2" fill="white" opacity="0.6" />
    </svg>
  )
}
