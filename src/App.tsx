import styled from 'styled-components';
import Gallery from './components/Gallery';
import { image } from './imageType';

const App = () => {
  return (
    <MainContainer>
      <Gallery image={image} />
    </MainContainer>
  );
};

export default App;

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;
