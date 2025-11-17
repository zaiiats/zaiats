import { useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../scripts/navigation";

export const useScrollOrNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollOrNavigate = (targetPath: string, elementId?: string) => {
    if (elementId) {
      if (location.pathname === targetPath) {
        requestAnimationFrame(() => {
          smoothScrollTo(elementId, elementId === "home");
        });
      } else {
        navigate(targetPath, { state: { scrollTo: elementId } });
      }
    } else {
      navigate(targetPath);
    }
  };

  return { scrollOrNavigate };
};
