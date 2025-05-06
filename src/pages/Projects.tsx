import { useParams } from 'react-router-dom';

function Project() {
  const { projectName } = useParams();

  return <div>{projectName}</div>;
}

export default Project;
