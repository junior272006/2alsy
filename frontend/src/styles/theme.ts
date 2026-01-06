import { createTheme, rem } from "@mantine/core";
import "@mantine/core";

export const theme = createTheme({
  fontFamily: "Work Sans, sans-serif",

  headings: {
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(36), lineHeight: "1.25" },
      h2: { fontSize: rem(32), lineHeight: "1.3" },
      h3: { fontSize: rem(28), lineHeight: "1.35" },
      h4: { fontSize: rem(24), lineHeight: "1.4" },
      h5: { fontSize: rem(20), lineHeight: "1.45" },
      h6: { fontSize: rem(16), lineHeight: "1.5" },
    },
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(13),
    md: rem(15),
    lg: rem(16),
    xl: rem(18),
  },

  colors: {
    // 🟢 Vert principal – branding & CTA
    brandGreen: [
      "#E6FAF0",
      "#C1F3D9",
      "#91EABF",
      "#63E1A5",
      "#39D88B",
      "#22C871",
      "#179858",
      "#0E673F",
      "#074526",
      "#032312",
    ],

    // 🟠 Orange – accents / promotions
    brandOrange: [
      "#FFF3E6",
      "#FFE0BF",
      "#FFC999",
      "#FFB273",
      "#FF993F",
      "#FF7F00",
      "#E66A00",
      "#B35400",
      "#804000",
      "#4D2800",
    ],

    // 🔵 Bleu – hover / liens / info
    brandBlue: [
      "#E6F0FA",
      "#C3DAF5",
      "#99C1EF",
      "#70A8E9",
      "#4D90E3",
      "#2C78DE",
      "#1F5BAF",
      "#154281",
      "#0C2A54",
      "#051427",
    ],

    // 🟣 Violet – premium / highlights
    brandPurple: [
      "#F3EDFF",
      "#DED3FF",
      "#C6B6FF",
      "#AD97FF",
      "#957AFF",
      "#7C5CFF",
      "#6247CC",
      "#483399",
      "#2F2066",
      "#171033",
    ],

    // 🔴 Rouge – erreurs / danger
    brandRed: [
      "#FFEDED",
      "#FFD6D6",
      "#FFB3B3",
      "#FF8F8F",
      "#FF6B6B",
      "#F03E3E",
      "#C92A2A",
      "#A51111",
      "#7A0000",
      "#4D0000",
    ],

    // 🟡 Jaune – warnings / alertes
    brandYellow: [
      "#FFF9DB",
      "#FFF3BF",
      "#FFEC99",
      "#FFE066",
      "#FFD43B",
      "#FCC419",
      "#E0A800",
      "#B08800",
      "#806600",
      "#4D3D00",
    ],

    // ⚪ Neutres – backgrounds / textes
    neutral: [
      "#FFFFFF",
      "#F9FAFB",
      "#F1F3F5",
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#ADB5BD",
      "#868E96",
      "#495057",
      "#212529",
    ],
  },

  /** 🌿 Vert comme couleur principale */
  primaryColor: "brandGreen",

  components: {
    Paper: {
      defaultProps: {
        withBorder: true,
        shadow: "sm",
        radius: "md",
      },
    },

    Button: {
      defaultProps: {
        variant: "filled",
        radius: "lg",
        color: "brandGreen",
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },

    ActionIcon: {
      defaultProps: {
        variant: "light",
        color: "brandBlue",
        radius: "xl",
      },
    },

    ThemeIcon: {
      defaultProps: {
        variant: "light",
        color: "brandGreen",
        radius: "xl",
      },
    },

    Badge: {
      defaultProps: {
        radius: "sm",
        variant: "light",
      },
    },
  },

  defaultGradient: {
    from: "brandGreen.5",
    to: "brandBlue.5",
    deg: 135,
  },

  defaultRadius: "md",
});
