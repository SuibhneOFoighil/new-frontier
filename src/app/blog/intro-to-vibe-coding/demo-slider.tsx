"use client"

import type React from "react"

import { useState, useCallback, useMemo, forwardRef, useImperativeHandle, useRef, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ============================================================================
// TYPES & INTERFACES - Customize these to add new configuration options
// ============================================================================

export type AnimationType = "fire" | "ice" | "sparkles" | "waves" | "pulse" | "ripple" | "glow" | "none"
export type SliderSize = "sm" | "md" | "lg" | "xl"
export type SliderVariant = "default" | "minimal" | "bold" | "glass" | "neon"

/**
 * Color configuration for each slider state
 * CUSTOMIZABLE: Add new color properties here
 */
export interface ColorConfig {
  background: string | string[] // Single color or array for gradients
  button: string | string[] // Slider button colors
  glow: string // Glow/shadow color
  particles: string // Animation particle color
  text: string // Label text color
  shadow?: string // Optional custom shadow
  border?: string // Optional border color
}

/**
 * Animation configuration
 * CUSTOMIZABLE: Modify these to change animation behavior
 */
export interface AnimationConfig {
  type: AnimationType
  duration?: number // Animation duration in milliseconds
  intensity?: number // Animation intensity (0-2, default 1)
  particleCount?: number // Number of particles for particle-based animations
  easing?: string // CSS easing function
  delay?: number // Animation delay
}

/**
 * Complete state configuration (ON or OFF)
 * CUSTOMIZABLE: This defines everything about each state
 */
export interface SliderStateConfig {
  colors: ColorConfig
  emoji: string
  animation: AnimationConfig
  label: string
  description?: string
}

/**
 * Theme configuration combining both states
 * CUSTOMIZABLE: Create new themes by defining onState and offState
 */
export interface ThemeConfig {
  name: string
  onState: SliderStateConfig
  offState: SliderStateConfig
  size?: SliderSize
  variant?: SliderVariant
}

/**
 * Main component props
 * CUSTOMIZABLE: Add new props here for additional functionality
 */
export interface SliderProps {
  // State Management
  value?: boolean // Controlled component value
  defaultValue?: boolean // Uncontrolled default value
  onChange?: (value: boolean, event?: React.MouseEvent) => void
  onToggle?: (value: boolean) => void
  disabled?: boolean

  // Configuration - MOST CUSTOMIZABLE PART
  onState?: Partial<SliderStateConfig> // Override ON state properties
  offState?: Partial<SliderStateConfig> // Override OFF state properties
  theme?: string | ThemeConfig // Use predefined theme or custom theme
  size?: SliderSize
  variant?: SliderVariant

  // Styling Overrides
  width?: number | string
  height?: number | string
  borderRadius?: number | string
  className?: string
  style?: React.CSSProperties

  // Accessibility
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
  id?: string

  // Advanced Customization
  transitionConfig?: {
    duration?: number
    easing?: string
    stiffness?: number
    damping?: number
  }

  // Event Callbacks
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
  onStateChange?: (state: SliderStateConfig) => void

  // Custom Rendering
  children?: ReactNode
  renderLabel?: (state: SliderStateConfig, isOn: boolean) => ReactNode
  renderButton?: (state: SliderStateConfig, isOn: boolean) => ReactNode
  unstyled?: boolean // Remove all default styling
}

// Animation component props
interface AnimationProps {
  colors: ColorConfig
  config: AnimationConfig
  isActive: boolean
  size: { width: number; height: number }
}

// ============================================================================
// CONFIGURATION OBJECTS - Customize these to change defaults
// ============================================================================

/**
 * Size configurations
 * CUSTOMIZABLE: Modify dimensions and add new sizes
 */
const sizeConfig = {
  sm: { width: 60, height: 32, buttonSize: 24, fontSize: "text-sm" },
  md: { width: 96, height: 48, buttonSize: 40, fontSize: "text-base" },
  lg: { width: 120, height: 60, buttonSize: 52, fontSize: "text-lg" },
  xl: { width: 144, height: 72, buttonSize: 64, fontSize: "text-xl" },
}

/**
 * Visual variant configurations
 * CUSTOMIZABLE: Add new variants or modify existing ones
 */
const variantConfig = {
  default: {
    borderRadius: "rounded-full",
    shadow: "shadow-lg",
    border: "",
  },
  minimal: {
    borderRadius: "rounded-full",
    shadow: "",
    border: "border",
  },
  bold: {
    borderRadius: "rounded-lg",
    shadow: "shadow-2xl",
    border: "border-2",
  },
  glass: {
    borderRadius: "rounded-2xl",
    shadow: "shadow-xl",
    border: "border border-white/20",
    backdrop: "backdrop-blur-sm bg-white/10",
  },
  neon: {
    borderRadius: "rounded-full",
    shadow: "shadow-2xl",
    border: "border-2",
    glow: true,
  },
}

/**
 * Predefined themes
 * CUSTOMIZABLE: Add your own themes here or modify existing ones
 */
const baseThemes: Record<string, ThemeConfig> = {
  fireIce: {
    name: "Fire & Ice",
    onState: {
      colors: {
        background: ["#dc2626", "#ea580c", "#facc15"], // Red to orange to yellow gradient
        button: ["#fef3c7", "#fed7aa"], // Light yellow to orange gradient
        glow: "#ff6400",
        particles: "#fef08a",
        text: "#ff6b35",
      },
      emoji: "🔥",
      animation: { type: "fire", duration: 2000, intensity: 0.8, particleCount: 6 },
      label: "FIRE MODE",
      description: "Blazing hot and fierce!",
    },
    offState: {
      colors: {
        background: ["#bfdbfe", "#93c5fd", "#e0f2fe"], // Light blue gradient
        button: ["#ffffff", "#dbeafe"],
        glow: "#60a5fa",
        particles: "#ffffff99",
        text: "#60a5fa",
      },
      emoji: "🧊",
      animation: { type: "ice", duration: 3000, intensity: 0.6, particleCount: 8 },
      label: "ICE MODE",
      description: "Cool, calm, and frozen.",
    },
  },

  nature: {
    name: "Nature",
    onState: {
      colors: {
        background: ["#fbbf24", "#f59e0b", "#d97706"], // Golden yellow gradient
        button: ["#fef3c7", "#fde68a"],
        glow: "#f59e0b",
        particles: "#fbbf24",
        text: "#d97706",
      },
      emoji: "☀️",
      animation: { type: "pulse", duration: 2000, intensity: 0.7 },
      label: "SUNNY",
      description: "Bright and warm sunshine!",
    },
    offState: {
      colors: {
        background: ["#4c1d95", "#5b21b6", "#6d28d9"], // Purple gradient
        button: ["#e5e7eb", "#d1d5db"],
        glow: "#8b5cf6",
        particles: "#c4b5fd",
        text: "#a78bfa",
      },
      emoji: "🌙",
      animation: { type: "sparkles", duration: 1500, intensity: 0.9, particleCount: 12 },
      label: "MOONLIGHT",
      description: "Peaceful and serene night.",
    },
  },

  tech: {
    name: "Tech Status",
    onState: {
      colors: {
        background: ["#10b981", "#059669", "#047857"], // Green gradient
        button: ["#d1fae5", "#a7f3d0"],
        glow: "#10b981",
        particles: "#6ee7b7",
        text: "#059669",
      },
      emoji: "🟢",
      animation: { type: "waves", duration: 2000, intensity: 0.6 },
      label: "ONLINE",
      description: "Connected and ready!",
    },
    offState: {
      colors: {
        background: ["#ef4444", "#dc2626", "#b91c1c"], // Red gradient
        button: ["#fee2e2", "#fecaca"],
        glow: "#ef4444",
        particles: "#f87171",
        text: "#dc2626",
      },
      emoji: "🔴",
      animation: { type: "pulse", duration: 1000, intensity: 0.8 },
      label: "OFFLINE",
      description: "Disconnected from network.",
    },
  },

  cosmic: {
    name: "Cosmic",
    onState: {
      colors: {
        background: ["#ec4899", "#8b5cf6", "#06b6d4"], // Pink to purple to cyan
        button: ["#fdf2f8", "#f3e8ff"],
        glow: "#ec4899",
        particles: "#f472b6",
        text: "#ec4899",
      },
      emoji: "🌈",
      animation: { type: "sparkles", duration: 1200, intensity: 1.0, particleCount: 15 },
      label: "RAINBOW",
      description: "Colorful and magical!",
    },
    offState: {
      colors: {
        background: ["#1e1b4b", "#312e81", "#3730a3"], // Dark blue gradient
        button: ["#e2e8f0", "#cbd5e1"],
        glow: "#6366f1",
        particles: "#a5b4fc",
        text: "#818cf8",
      },
      emoji: "🌌",
      animation: { type: "sparkles", duration: 2500, intensity: 0.7, particleCount: 20 },
      label: "GALAXY",
      description: "Infinite cosmic wonder.",
    },
  },

  minimal: {
    name: "Minimal",
    variant: "minimal",
    onState: {
      colors: {
        background: "#000000",
        button: "#ffffff",
        glow: "#000000",
        particles: "#666666",
        text: "#000000",
      },
      emoji: "●",
      animation: { type: "none" },
      label: "ON",
      description: "Active state",
    },
    offState: {
      colors: {
        background: "#e5e7eb",
        button: "#f9fafb",
        glow: "#9ca3af",
        particles: "#d1d5db",
        text: "#6b7280",
      },
      emoji: "○",
      animation: { type: "none" },
      label: "OFF",
      description: "Inactive state",
    },
  },

  neon: {
    name: "Neon",
    variant: "neon",
    onState: {
      colors: {
        background: ["#ff0080", "#ff8c00", "#00ff80"], // Neon gradient
        button: "#ffffff",
        glow: "#ff0080",
        particles: "#00ffff",
        text: "#ff0080",
        border: "#ff0080",
      },
      emoji: "⚡",
      animation: { type: "glow", duration: 800, intensity: 1.2 },
      label: "CHARGED",
      description: "High energy mode!",
    },
    offState: {
      colors: {
        background: "#1a1a1a",
        button: "#333333",
        glow: "#666666",
        particles: "#444444",
        text: "#888888",
        border: "#333333",
      },
      emoji: "○",
      animation: { type: "none" },
      label: "STANDBY",
      description: "Low power mode",
    },
  },
}

// ============================================================================
// ANIMATION COMPONENTS - Customize these or add new animation types
// ============================================================================

/**
 * Fire animation with flickering particles
 * CUSTOMIZABLE: Modify particle behavior, colors, and movement patterns
 */
const FireAnimation = ({ colors, config }: AnimationProps) => {
  const particleCount = config.particleCount || 6
  const intensity = config.intensity || 0.8
  const duration = config.duration || 2000

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Fire particles - CUSTOMIZABLE: Change particle size, movement, count */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: colors.particles,
            width: `${2 + intensity}px`,
            height: `${2 + intensity}px`,
            left: `${20 + i * (60 / particleCount)}%`,
            top: `${30 + (i % 2) * 20}%`,
          }}
          animate={{
            y: [-2 * intensity, -8 * intensity, -2 * intensity],
            opacity: [0.8, 1, 0.8],
            scale: [0.8, 1.2 * intensity, 0.8],
          }}
          transition={{
            duration: duration / 1000 + i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: config.easing || "easeInOut",
          }}
        />
      ))}
      {/* Fire glow effect - CUSTOMIZABLE: Change glow intensity and color */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `${colors.glow}30` }}
        animate={{ opacity: [0.5, 0.8 * intensity, 0.5] }}
        transition={{
          duration: duration / 1000,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}

/**
 * Ice animation with crystalline effects
 * CUSTOMIZABLE: Modify crystal patterns, rotation, and sparkle effects
 */
const IceAnimation = ({ colors, config }: AnimationProps) => {
  const particleCount = config.particleCount || 8
  const intensity = config.intensity || 0.6
  const duration = config.duration || 3000

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ice crystals - CUSTOMIZABLE: Change crystal shape, rotation, positioning */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: colors.particles,
            width: `${0.5 + intensity}px`,
            height: `${12 * intensity}px`,
            left: `${15 + i * (70 / particleCount)}%`,
            top: `${20 + (i % 3) * 15}%`,
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.8 * intensity, 0.3],
            scale: [0.8, 1 * intensity, 0.8],
          }}
          transition={{
            duration: duration / 1000 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: config.easing || "easeInOut",
          }}
        />
      ))}
      {/* Frost effect - CUSTOMIZABLE: Change frost pattern and opacity */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `${colors.glow}20` }}
        animate={{ opacity: [0.3, 0.6 * intensity, 0.3] }}
        transition={{
          duration: duration / 1000,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}

/**
 * Sparkles animation with twinkling stars
 * CUSTOMIZABLE: Modify sparkle patterns, timing, and distribution
 */
const SparklesAnimation = ({ colors, config }: AnimationProps) => {
  const particleCount = config.particleCount || 12
  const intensity = config.intensity || 0.9
  const duration = config.duration || 1500

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sparkle particles - CUSTOMIZABLE: Change sparkle behavior and distribution */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: colors.particles,
            width: `${1 + intensity}px`,
            height: `${1 + intensity}px`,
            left: `${10 + i * (80 / particleCount)}%`,
            top: `${20 + (i % 4) * 15}%`,
          }}
          animate={{
            scale: [0, 1.2 * intensity, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: duration / 1000 + i * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            ease: config.easing || "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </motion.div>
  )
}

/**
 * Waves animation with ripple effects
 * CUSTOMIZABLE: Modify wave count, speed, and ripple patterns
 */
const WavesAnimation = ({ colors, config }: AnimationProps) => {
  const intensity = config.intensity || 0.6
  const duration = config.duration || 2000

  return (
    <motion.div
      className="absolute inset-0 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Wave rings - CUSTOMIZABLE: Change wave count, timing, and scale */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: colors.particles }}
          animate={{
            scale: [0.8, 1.2 * intensity, 0.8],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: duration / 1000 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: config.easing || "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  )
}

/**
 * Pulse animation with breathing effect
 * CUSTOMIZABLE: Modify pulse timing, scale, and opacity changes
 */
const PulseAnimation = ({ colors, config }: AnimationProps) => {
  const intensity = config.intensity || 0.7
  const duration = config.duration || 2000

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: colors.glow }}
      animate={{
        opacity: [0.2, 0.6 * intensity, 0.2],
        scale: [0.95, 1.05 * intensity, 0.95],
      }}
      transition={{
        duration: duration / 1000,
        repeat: Number.POSITIVE_INFINITY,
        ease: config.easing || "easeInOut",
      }}
    />
  )
}

/**
 * Ripple animation with expanding circles
 * CUSTOMIZABLE: Modify ripple count, expansion speed, and fade timing
 */
const RippleAnimation = ({ colors, config }: AnimationProps) => {
  const intensity = config.intensity || 0.8
  const duration = config.duration || 1500

  return (
    <motion.div
      className="absolute inset-0 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ripple circles - CUSTOMIZABLE: Change ripple behavior and timing */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: colors.particles }}
          animate={{
            scale: [0, 2 * intensity],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  )
}

/**
 * Glow animation with radial light effect
 * CUSTOMIZABLE: Modify glow intensity, blur amount, and pulsing
 */
const GlowAnimation = ({ colors, config }: AnimationProps) => {
  const intensity = config.intensity || 1.0
  const duration = config.duration || 800

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle, ${colors.glow}40, transparent 70%)`,
        filter: `blur(${2 * intensity}px)`,
      }}
      animate={{
        opacity: [0.3, 1 * intensity, 0.3],
        scale: [0.8, 1.2 * intensity, 0.8],
      }}
      transition={{
        duration: duration / 1000,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

/**
 * Animation registry - CUSTOMIZABLE: Add your own animations here
 * To add a new animation:
 * 1. Create an animation component following the pattern above
 * 2. Add it to this registry with a unique key
 * 3. Use the key in your theme's animation.type property
 */
const animationRegistry = {
  fire: FireAnimation,
  ice: IceAnimation,
  sparkles: SparklesAnimation,
  waves: WavesAnimation,
  pulse: PulseAnimation,
  ripple: RippleAnimation,
  glow: GlowAnimation,
  none: () => null, // No animation
}

// ============================================================================
// UTILITY FUNCTIONS - Internal helpers (usually don't need customization)
// ============================================================================

/**
 * Merges state configurations with overrides
 * INTERNAL: Used for combining theme defaults with custom overrides
 */
const mergeStateConfig = (base: SliderStateConfig, override?: Partial<SliderStateConfig>): SliderStateConfig => {
  if (!override) return base

  return {
    ...base,
    ...override,
    colors: { ...base.colors, ...override.colors },
    animation: { ...base.animation, ...override.animation },
  }
}

/**
 * Creates CSS gradient from color array or returns single color
 * INTERNAL: Converts color configuration to CSS values
 */
const createGradient = (colors: string | string[]): string => {
  if (typeof colors === "string") return colors
  return `linear-gradient(to right, ${colors.join(", ")})`
}

// ============================================================================
// MAIN SLIDER COMPONENT - The core component
// ============================================================================

/**
 * Imperative API for controlling slider programmatically
 * CUSTOMIZABLE: Add new methods here for additional control
 */
export interface SliderRef {
  toggle: () => void
  setValue: (value: boolean) => void
  getValue: () => boolean
  focus: () => void
}

/**
 * Advanced Slider Component
 *
 * USAGE EXAMPLES:
 *
 * Basic usage:
 * <Slider theme="fireIce" size="md" />
 *
 * Controlled component:
 * <Slider value={isOn} onChange={setIsOn} theme="nature" />
 *
 * Custom configuration:
 * <Slider
 *   theme="fireIce"
 *   onState={{ emoji: "⚡", animation: { intensity: 1.5 } }}
 *   size="lg"
 * />
 *
 * Custom theme:
 * <Slider theme={{
 *   name: "Custom",
 *   onState: { colors: {...}, emoji: "🎮", animation: {...}, label: "GAMING" },
 *   offState: { colors: {...}, emoji: "😴", animation: {...}, label: "SLEEP" }
 * }} />
 */
export const Slider = forwardRef<SliderRef, SliderProps>(
  (
    {
      // State management props
      value,
      defaultValue = false,
      onChange,
      onToggle,
      disabled = false,

      // Configuration props - MAIN CUSTOMIZATION POINTS
      onState, // Override ON state properties
      offState, // Override OFF state properties
      theme = "fireIce", // Theme name or custom theme object
      size = "md", // Size variant
      variant = "default", // Visual variant

      // Styling override props
      width,
      height,
      borderRadius,
      className,
      style,
      unstyled = false,

      // Accessibility props
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      id,

      // Advanced configuration
      transitionConfig = {},

      // Event callbacks
      onAnimationStart,
      onAnimationEnd,
      onStateChange,

      // Custom rendering
      children,
      renderLabel,
      renderButton,
    },
    ref,
  ) => {
    // ========================================================================
    // COMPONENT STATE AND REFS
    // ========================================================================

    const buttonRef = useRef<HTMLButtonElement>(null)
    const [internalValue, setInternalValue] = useState(defaultValue)

    // Determine if component is controlled or uncontrolled
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    // ========================================================================
    // THEME AND CONFIGURATION RESOLUTION
    // ========================================================================

    /**
     * Resolve theme configuration
     * CUSTOMIZABLE: This determines how themes are resolved
     */
    const resolvedTheme = useMemo(() => {
      if (typeof theme === "string") {
        return baseThemes[theme] || baseThemes.fireIce // Fallback to fireIce if theme not found
      }
      return theme
    }, [theme])

    /**
     * Merge theme states with custom overrides
     * CUSTOMIZABLE: This is where onState/offState props are applied
     */
    const currentOnState = useMemo(
      () => mergeStateConfig(resolvedTheme.onState, onState),
      [resolvedTheme.onState, onState],
    )

    const currentOffState = useMemo(
      () => mergeStateConfig(resolvedTheme.offState, offState),
      [resolvedTheme.offState, offState],
    )

    // Current active state based on slider value
    const currentState = currentValue ? currentOnState : currentOffState

    // ========================================================================
    // STYLING CONFIGURATION
    // ========================================================================

    /**
     * Size and variant styling
     * CUSTOMIZABLE: Modify sizeConfig and variantConfig objects above
     */
    const sizeStyles = sizeConfig[size]
    const variantStyles = variantConfig[variant]

    /**
     * Calculate dimensions and positioning
     * CUSTOMIZABLE: Override with width/height props
     */
    const sliderWidth = width || sizeStyles.width
    const sliderHeight = height || sizeStyles.height
    const buttonSize = sizeStyles.buttonSize
    const buttonOffset =
      typeof sliderWidth === "number" ? sliderWidth - buttonSize - 4 : `calc(${sliderWidth} - ${buttonSize}px - 4px)`

    /**
     * Generate CSS styles for slider and button
     * CUSTOMIZABLE: These styles can be overridden with style prop
     */
    const sliderStyles = {
      width: sliderWidth,
      height: sliderHeight,
      background: createGradient(currentState.colors.background),
      borderRadius: borderRadius || (typeof sliderHeight === "number" ? sliderHeight / 2 : "50%"),
      ...style,
    }

    const buttonStyles = {
      width: buttonSize,
      height: buttonSize,
      background: createGradient(currentState.colors.button),
      boxShadow: `0 0 15px ${currentState.colors.glow}60`,
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    /**
     * Handle slider toggle
     * CUSTOMIZABLE: Add additional logic here for custom behavior
     */
    const handleToggle = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) return

        const newValue = !currentValue

        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue(newValue)
        }

        // Call event handlers
        onChange?.(newValue, event)
        onToggle?.(newValue)
        onStateChange?.(newValue ? currentOnState : currentOffState)
      },
      [currentValue, disabled, isControlled, onChange, onToggle, onStateChange, currentOnState, currentOffState],
    )

    // ========================================================================
    // IMPERATIVE API
    // ========================================================================

    /**
     * Expose imperative methods via ref
     * CUSTOMIZABLE: Add new methods here for additional programmatic control
     */
    useImperativeHandle(
      ref,
      () => ({
        toggle: () => handleToggle({} as React.MouseEvent),
        setValue: (newValue: boolean) => {
          if (!isControlled) {
            setInternalValue(newValue)
          }
          onChange?.(newValue)
        },
        getValue: () => currentValue,
        focus: () => buttonRef.current?.focus(),
      }),
      [handleToggle, currentValue, isControlled, onChange],
    )

    // ========================================================================
    // ANIMATION COMPONENT RESOLUTION
    // ========================================================================

    /**
     * Get animation component for current state
     * CUSTOMIZABLE: Add custom animations to animationRegistry above
     */
    const AnimationComponent = animationRegistry[currentState.animation.type] || animationRegistry.none

    // ========================================================================
    // RENDER LOGIC
    // ========================================================================

    // Return unstyled version if requested
    if (unstyled) {
      return (
        <div className={className} style={style}>
          {children}
        </div>
      )
    }

    return (
      <div className="text-center space-y-6">
        {/* Main Slider Container */}
        <motion.div
          className="relative"
          animate={{
            filter: `drop-shadow(0 0 20px ${currentState.colors.glow}80)`,
          }}
          transition={{ duration: transitionConfig.duration || 0.5 }}
        >
          {/* Slider Button Track */}
          <motion.button
            ref={buttonRef}
            className={cn(
              "relative p-1 transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2",
              variantStyles.borderRadius,
              variantStyles.shadow,
              variantStyles.border,
              disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
            style={sliderStyles}
            onClick={handleToggle}
            disabled={disabled}
            whileTap={disabled ? {} : { scale: 0.95 }}
            // Accessibility attributes
            aria-label={ariaLabel || `Toggle ${currentState.label}`}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-checked={currentValue}
            role="switch"
            id={id}
          >
            {/* Background Animation Layer */}
            <AnimatePresence mode="wait" onExitComplete={onAnimationEnd}>
              <AnimationComponent
                key={currentState.animation.type}
                colors={currentState.colors}
                config={currentState.animation}
                isActive={currentValue}
                size={{
                  width: typeof sliderWidth === "number" ? sliderWidth : 96,
                  height: typeof sliderHeight === "number" ? sliderHeight : 48,
                }}
              />
            </AnimatePresence>

            {/* Sliding Button */}
            <motion.div
              className={cn(
                "relative flex items-center justify-center z-10 shadow-lg transition-all duration-500",
                variantStyles.borderRadius,
                sizeStyles.fontSize,
              )}
              style={buttonStyles}
              layout
              transition={{
                type: "spring",
                stiffness: transitionConfig.stiffness || 500,
                damping: transitionConfig.damping || 30,
              }}
              animate={{
                x: currentValue ? buttonOffset : 0,
              }}
              onAnimationStart={onAnimationStart}
            >
              {/* Button Content - Custom render or emoji */}
              {renderButton ? (
                renderButton(currentState, currentValue)
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentState.emoji}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 20,
                    }}
                  >
                    {currentState.emoji}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Status Text - Default or Custom */}
        {!children && !renderLabel && (
          <motion.div
            className="text-center"
            animate={{ color: currentState.colors.text }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className={cn("font-bold mb-2", sizeStyles.fontSize)}
              animate={{
                textShadow: `0 0 10px ${currentState.colors.glow}80`,
              }}
            >
              {currentState.label}
            </motion.h2>
            {currentState.description && <p className="opacity-80">{currentState.description}</p>}
          </motion.div>
        )}

        {/* Custom Label Renderer */}
        {renderLabel && renderLabel(currentState, currentValue)}

        {/* Custom Children */}
        {children}
      </div>
    )
  },
)

Slider.displayName = "Slider"

// ============================================================================
// USAGE EXAMPLES AND PRESETS - Copy these for quick setup
// ============================================================================

/**
 * Example: Basic Fire & Ice Slider
 * COPY THIS: Simple usage with predefined theme
 */
export function FireIceSlider() {
  return <Slider theme="fireIce" size="md" />
}

/**
 * Example: Controlled Slider with Custom State
 * COPY THIS: For controlled components with state management
 */
export function ControlledSlider() {
  const [isOn, setIsOn] = useState(false)

  return (
    <Slider
      theme="nature"
      value={isOn}
      onChange={setIsOn}
      size="lg"
      onState={{
        emoji: "⚡",
        label: "SUPERCHARGED",
        animation: { type: "sparkles", intensity: 1.5, particleCount: 25 },
      }}
    />
  )
}

/**
 * Example: Custom Theme Slider
 * COPY THIS: For completely custom themes
 */
export function CustomThemeSlider() {
  const customTheme: ThemeConfig = {
    name: "Gaming",
    onState: {
      colors: {
        background: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
        button: ["#ffffff", "#f0f0f0"],
        glow: "#ff6b6b",
        particles: "#ffffff",
        text: "#ff6b6b",
      },
      emoji: "🎮",
      animation: { type: "sparkles", duration: 1000, intensity: 1.2, particleCount: 20 },
      label: "GAMING MODE",
      description: "Ready to play!",
    },
    offState: {
      colors: {
        background: "#2d3748",
        button: "#4a5568",
        glow: "#718096",
        particles: "#a0aec0",
        text: "#718096",
      },
      emoji: "😴",
      animation: { type: "pulse", duration: 3000, intensity: 0.3 },
      label: "SLEEP MODE",
      description: "System at rest",
    },
  }

  return <Slider theme={customTheme} size="lg" />
}

/**
 * Example: Multiple Size Variants
 * COPY THIS: To show different sizes
 */
export function SizeVariantsExample() {
  return (
    <div className="space-y-8">
      <Slider theme="fireIce" size="sm" />
      <Slider theme="fireIce" size="md" />
      <Slider theme="fireIce" size="lg" />
      <Slider theme="fireIce" size="xl" />
    </div>
  )
}

/**
 * Example: All Predefined Themes
 * COPY THIS: To showcase all available themes
 */
export function AllThemesExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Slider theme="fireIce" />
      <Slider theme="nature" />
      <Slider theme="tech" />
      <Slider theme="cosmic" />
      <Slider theme="minimal" />
      <Slider theme="neon" />
    </div>
  )
}

// Export the main component as default
export default Slider

// ============================================================================
// CUSTOMIZATION GUIDE
// ============================================================================

/*
🎨 HOW TO CUSTOMIZE THIS COMPONENT:

1. THEMES - Add new themes to baseThemes object:
   - Define onState and offState with colors, emoji, animation, and labels
   - Use theme="yourThemeName" in component

2. ANIMATIONS - Add new animations to animationRegistry:
   - Create animation component following existing patterns
   - Add to registry with unique key
   - Use in theme's animation.type property

3. SIZES - Modify sizeConfig object:
   - Add new size variants with width, height, buttonSize, fontSize
   - Use size="yourSize" in component

4. VARIANTS - Modify variantConfig object:
   - Add new visual styles with borderRadius, shadow, border
   - Use variant="yourVariant" in component

5. COLORS - In theme configuration:
   - background: string or string[] for gradients
   - button: string or string[] for gradients  
   - glow: string for shadow/glow effects
   - particles: string for animation particles
   - text: string for label text

6. OVERRIDES - Use onState/offState props:
   - Override specific properties without creating full theme
   - Merge with existing theme configuration

7. CUSTOM RENDERING - Use render props:
   - renderLabel: Custom label rendering
   - renderButton: Custom button content
   - children: Custom content below slider

8. EVENTS - Available callbacks:
   - onChange: Value changes
   - onToggle: Toggle events
   - onStateChange: State object changes
   - onAnimationStart/End: Animation lifecycle

9. ACCESSIBILITY - Built-in support:
   - ARIA labels and roles
   - Keyboard navigation
   - Focus management
   - Screen reader support

10. STYLING - Override with:
    - className: Additional CSS classes
    - style: Inline styles
    - width/height: Custom dimensions
    - borderRadius: Custom border radius
    - unstyled: Remove all default styles

QUICK START:
1. Copy this entire file to your project
2. Import: import Slider from './advanced-slider'
3. Use: <Slider theme="fireIce" size="md" />
4. Customize: Modify baseThemes or create custom themes
*/