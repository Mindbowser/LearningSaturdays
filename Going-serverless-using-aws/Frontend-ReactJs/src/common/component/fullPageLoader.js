import React from "react";
import PropTypes from "prop-types";
import {Row, Col} from "reactstrap";
import {MAIN_SPINNER} from "../../constants/image";

// common loader for full page
const FullPageLoader = ({className}) => {
    return (<React.Fragment>
        <Row className={className}>
            <Col lg={
                    {
                        size: 4,
                        offset: 4
                    }
                }
                md={
                    {
                        size: 4,
                        offset: 4
                    }
                }
                className="align-center">
                <div>
                    <img src={MAIN_SPINNER}
                        alt=""
                        width="60px"/>
                </div>
            </Col>
        </Row>
    </React.Fragment>);
};

FullPageLoader.propTypes = {
    className: PropTypes.string
};

FullPageLoader.defaultProps = {
    className: undefined
};

export default FullPageLoader;
