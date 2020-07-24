import React from "react";
import { Link } from "gatsby";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/sections.sass";

import { Row, Col } from "reactstrap";

const About = () => {
  return (
    <div className="about white d-none d-md-block">
      <Row>
        <Col sm md="6">
          <div className="aboutHeader">About</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Blanditiis, quas sunt iusto velit, enim veritatis numquam fugiat,
            atque delectus architecto amet sit officiis saepe reprehenderit
            distinctio optio. Et repellat voluptatem maxime! Consequatur
            repudiandae quas, a illo eius nemo eligendi explicabo?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi sint
            voluptatum, inventore possimus ad at similique tempore unde
            asperiores laborum, cum architecto quae eum rerum?
          </p>
        </Col>
        <Col sm md="6">
          <div className="aboutHeader">Navlinks</div>
          <div className="pageLinks">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">All Blogs</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default About;