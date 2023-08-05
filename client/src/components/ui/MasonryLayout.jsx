import Masonry from 'react-masonry-css';
import Gem from '../gem/Gem';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ gems }) => (
  <Masonry
    className="flex animate-slide-fwd"
    breakpointCols={breakpointColumnsObj}
  >
    {gems?.map((gem) => (
      <Gem key={gem?._id} gem={gem} className="w-max" />
    ))}
  </Masonry>
);

export default MasonryLayout;
