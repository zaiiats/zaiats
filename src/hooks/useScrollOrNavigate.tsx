import { useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '../scripts/navigation';

export const useScrollOrNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollOrNavigate = (targetPath: string, elementId: string) => {
    if (location.pathname === targetPath) {
      // вже на цьому шляху → просто скрол
      setTimeout(() => {
        smoothScrollTo(elementId);
      }, 0);
    } else {
      // перейти на інший шлях і скролнути після переходу
      navigate(targetPath, { state: { scrollTo: elementId } });
    }
  };

  return { scrollOrNavigate };
};
