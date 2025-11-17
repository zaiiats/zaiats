import { useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../scripts/navigation";

export const useScrollOrNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollOrNavigate = (targetPath: string, elementId: string) => {
    if (location.pathname === targetPath) {
      setTimeout(() => {
        smoothScrollTo(elementId, elementId === "home");
      }, 0);
    } else {
      navigate(targetPath, { state: { scrollTo: elementId } });
    }
  };

  return { scrollOrNavigate };
};
