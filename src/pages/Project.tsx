import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  
`

function Project() {
  const { projectName } = useParams();

  return <StyledSection>{projectName}</StyledSection>;
}

export default Project;
