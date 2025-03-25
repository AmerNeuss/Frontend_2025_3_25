import * as motion from "motion/react-client";

interface LoginButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void; // Optional click handler
}

export default function AddProjectButton({
  type = "button",
  className = "",
  children,
  onClick,
}: LoginButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 0.8 }}
      whileTap={{ scale: 0.8 }}
      className={className}
      type={type}
      onClick={onClick}
      style={box}
    >
      {children}
    </motion.button>
  );
}

/**
 * ==============   Styles   ================
 */
const box = {
  backgroundColor: 'rgba(72, 195, 137, 1)',
  borderRadius: 5,
  color: "black",
  border: "none",
  cursor: "pointer",
};
