import { alpha, Button } from "@mantine/core";

export default Button.extend({
  vars: (theme, props) => {
    if (props.variant === "filled") {
      const color = props.color || "brand-blue";

      return {
        root: {
          "--button-bg": theme.colors[color][5],
          "--button-hover": alpha(theme.colors[color][5], 0.9),
          "--button-color": theme.colors["dark"][9],
          "--mantine-color-disabled": alpha(theme.colors[color][5], 0.5),
          "--mantine-color-disabled-color": alpha("#fff", 0.5),
        },
      };
    }

    if (props.variant === "light") {
      const color = props.color || "slate";

      return {
        root: {
          "--button-bg": alpha(theme.colors[color][8], 0.5),
          "--button-hover": theme.colors[color][8],
          "--button-color": theme.colors[color][3],
          "--button-bd": `1px solid ${alpha(theme.colors[color][8], 0.7)}`,
        },
      };
    }

    return { root: {} };
  },
  defaultProps: {
    variant: "filled",
  },
});
