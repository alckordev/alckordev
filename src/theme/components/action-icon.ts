import { alpha, ActionIcon } from "@mantine/core";

export default ActionIcon.extend({
  vars: (theme, props) => {
    if (props.variant === "filled") {
      return {
        root: {
          "--ai-bg": theme.colors["brand-blue"][5],
          "--ai-hover": alpha(theme.colors["brand-blue"][5], 0.9),
          "--ai-color": theme.colors["dark"][9],
          "--mantine-color-disabled": alpha(theme.colors["brand-blue"][5], 0.5),
          "--mantine-color-disabled-color": alpha("#fff", 0.5),
        },
      };
    }

    return { root: {} };
  },
  defaultProps: {
    variant: "filled",
  },
});
