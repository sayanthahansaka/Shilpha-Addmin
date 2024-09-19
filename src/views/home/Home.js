import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="shadow-sm">
            <CardBody className="text-center">
              <h1 className="display-4 mb-3">Welcome Shilpha Admin</h1>
              <p className="lead">Manage your dashboard with ease</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
