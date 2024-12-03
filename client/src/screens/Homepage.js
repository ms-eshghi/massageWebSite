import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './';

function Homepage() {
  return (
    <Carousel>
      pla
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Homepage;