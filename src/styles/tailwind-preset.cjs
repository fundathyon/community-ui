/**
 * Tailwind CSS **v3** preset for @foundathyon/community-ui.
 *
 * Usage (tailwind.config.js):
 *
 *   module.exports = {
 *     presets: [require("@foundathyon/community-ui/tailwind-preset")],
 *     content: [
 *       "./src/**\/*.{ts,tsx}",
 *       "./node_modules/@foundathyon/community-ui/dist/**\/*.js",
 *     ],
 *   };
 *
 * And import the tokens once in your global CSS:
 *
 *   @import "@foundathyon/community-ui/tokens.css";
 *
 * Tailwind v4 consumers should use `@foundathyon/community-ui/theme.css` instead.
 */
const v = (name) => `var(--fdn-${name})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: v("bg"), subtle: v("bg-subtle") },
        surface: {
          DEFAULT: v("surface"),
          raised: v("surface-raised"),
          hover: v("surface-hover"),
        },
        border: { DEFAULT: v("border"), strong: v("border-strong") },
        text: {
          DEFAULT: v("text"),
          secondary: v("text-secondary"),
          muted: v("text-muted"),
          disabled: v("text-disabled"),
        },
        accent: {
          DEFAULT: v("accent-text"),
          solid: v("accent-solid"),
          "solid-hover": v("accent-solid-hover"),
          "solid-active": v("accent-solid-active"),
          bg: v("accent-bg"),
          border: v("accent-border"),
          "on-solid": v("accent-on-solid"),
        },
        focus: v("focus"),
        success: {
          DEFAULT: v("success-text"),
          bg: v("success-bg"),
          border: v("success-border"),
          solid: v("success-solid"),
        },
        warning: {
          DEFAULT: v("warning-text"),
          bg: v("warning-bg"),
          border: v("warning-border"),
          solid: v("warning-solid"),
        },
        danger: {
          DEFAULT: v("danger-text"),
          bg: v("danger-bg"),
          border: v("danger-border"),
          solid: v("danger-solid"),
        },
        info: {
          DEFAULT: v("info-text"),
          bg: v("info-bg"),
          border: v("info-border"),
          solid: v("info-solid"),
        },
        "on-solid": v("on-solid"),
      },
      fontFamily: {
        sans: v("font-sans"),
        mono: v("font-mono"),
      },
      fontSize: {
        display: ["2.375rem", { lineHeight: "2.75rem", fontWeight: "700", letterSpacing: "-0.02em" }],
        h1: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700", letterSpacing: "-0.02em" }],
        h2: ["1.375rem", { lineHeight: "1.75rem", fontWeight: "700", letterSpacing: "-0.015em" }],
        h3: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600", letterSpacing: "-0.01em" }],
        h4: ["0.9375rem", { lineHeight: "1.25rem", fontWeight: "600" }],
        h5: ["0.8125rem", { lineHeight: "1.125rem", fontWeight: "600" }],
        body: ["0.8125rem", { lineHeight: "1.25rem" }],
        "body-sm": ["0.75rem", { lineHeight: "1.125rem" }],
        label: ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }],
        caption: ["0.6875rem", { lineHeight: "0.9375rem" }],
        overline: ["0.65625rem", { lineHeight: "0.875rem", fontWeight: "600", letterSpacing: "0.05em" }],
        code: ["0.71875rem", { lineHeight: "1.125rem" }],
      },
      borderRadius: {
        sm: v("radius-sm"),
        md: v("radius-md"),
        lg: v("radius-lg"),
        xl: v("radius-xl"),
      },
      boxShadow: {
        xs: v("shadow-xs"),
        sm: v("shadow-sm"),
        md: v("shadow-md"),
        lg: v("shadow-lg"),
        xl: v("shadow-xl"),
      },
      transitionTimingFunction: {
        standard: v("ease-standard"),
        enter: v("ease-enter"),
        exit: v("ease-exit"),
      },
      spacing: {
        "control-xs": v("control-xs"),
        "control-sm": v("control-sm"),
        "control-md": v("control-md"),
        "control-lg": v("control-lg"),
        control: v("control-height"),
        sidebar: v("sidebar-width"),
        "sidebar-collapsed": v("sidebar-collapsed"),
        header: v("header-height"),
        "container-max": v("container-max"),
        "prose-max": v("prose-max"),
        "modal-sm": v("modal-sm"),
        "modal-md": v("modal-md"),
        "modal-lg": v("modal-lg"),
      },
    },
  },
};
