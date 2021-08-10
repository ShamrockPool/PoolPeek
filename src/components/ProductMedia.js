import React from 'react';
import PropTypes from 'utils/propTypes';

import { Media, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Typography from 'components/Typography';
import ReactImageFallback from "react-image-fallback";

const ProductMedia = ({ image, title, description, poolid, right, imgWidth, imgHeight,  ...restProps }) => {
  return (
    // <a href={`https://poolpeek.com/#/pool/${poolid}`} target="_blank" rel="noreferrer">
    <Link to={`/pool/${poolid}`}>
      {/* <Media {...restProps}> */}
      {/* <Media center> */}
      {/* <Media body className="overflow-hidden">

            

        </Media> */}
      {/* <div>
        <Col>
          <Row>
            <img
              src={image}
              className="rounded"
              style={{ width: "12vh", height: "12vh", cursor: 'pointer' }}
            />
          </Row>
          <Row>
            <h6><b> {title} </b></h6>
          </Row>
        </Col>
      </div> */}


        <div style={{ display: 'inline-block', paddingRight: '10px' }}>
          <Link to={`/pool/${poolid}`}>
            <h6>
              <ReactImageFallback
                src={image}
                width={imgWidth}
                height={imgHeight}
                fallbackImage={null} />
              <b>&nbsp;{title}</b>
            </h6>
            {/* <p>{item.description}</p> */}
          </Link>
        </div>


      {/* <Media
          object
          src={image}
          className="rounded mr-2 mb-2"
          style={{ width: 120, height: 'auto' }} */}
      {/* /> */}
      {/* </Media> */}
      {/* <Media body className="overflow-hidden">
          <Media heading tag="h5" className="text-truncate">
            <h5><b> {title} </b></h5>
          </Media>
          <p>{description}</p>
        </Media> */}
      {/* <Media right className="align-self-center">
          {right && typeof right === 'string' ? (
            <Typography type="h4">{right}</Typography>
          ) : (
            right
          )}
        </Media> */}

      {/* </Media> */}
    </Link>
  );
};

ProductMedia.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  poolid: PropTypes.string,
  right: PropTypes.node,
};

export default ProductMedia;
