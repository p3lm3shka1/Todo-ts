import ICON_MOON from "../assets/images/icon-moon.svg";
import ICON_SUN from "../assets/images/icon-sun.svg";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const nextThemeLabel =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="theme-btn todo__theme-btn"
      onClick={onToggle}
      aria-label={nextThemeLabel}
    >
      <img src={theme === "dark" ? ICON_SUN : ICON_MOON} alt="" />
    </button>
  );
};

export default ThemeToggle;
