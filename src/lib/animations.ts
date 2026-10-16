/**
 * Centralized animation variants for Motion for React.
 * Use these across components for consistency.
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.92 },
};

export const popIn = {
  initial: { opacity: 0, scale: 0.7 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export const smoothTransition = {
  type: "tween" as const,
  ease: [0.4, 0, 0.2, 1],
  duration: 0.3,
};

export const slowSpring = {
  type: "spring" as const,
  stiffness: 180,
  damping: 20,
};

/** Card hover variants */
export const cardHover = {
  rest: { y: 0, boxShadow: "0 2px 16px rgba(236,72,153,0.08)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(236,72,153,0.16)" },
};

/** Answer option variants */
export const answerOption = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
  selected: { scale: 1.01 },
};

/** Progress bar fill variant */
export const progressFill = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
};

/** Result reveal */
export const resultReveal = {
  initial: { opacity: 0, scale: 0.8, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 18,
    },
  },
};

/** Score count-up wrapper */
export const scoreBounce = {
  animate: {
    scale: [1, 1.2, 0.95, 1.05, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};
