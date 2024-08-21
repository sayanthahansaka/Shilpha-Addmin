import React, { useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, Modal } from 'reactstrap'
import shilpa from '../assets/images/logo/logo.svg'
import Cookies from 'cookies-js'
import { toast } from 'react-toastify'
import { loginUser } from '../servirces/auth'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
  const source = require(`@src/assets/images/pages/${illustration}`).default

  const handleLogin = async () => {
    if (!username) {
      toast.error("Username cannot be empty")
      return
    }

    if (!password) {
      toast.error("Password cannot be empty")
      return
    }

    try {
      const res = await loginUser({ email: username, password })
      console.log('API Response:', res)

      if (res.success) {
        Cookies.set("ACCESS_TOKEN", res.token)
        Cookies.set("REFRESH_TOKEN", res.refreshToken || '')
        localStorage.setItem("userData", JSON.stringify(res))
        localStorage.setItem("userRole", JSON.stringify(res.userResponse.userRole))
        history.push('/home')
      } else {
        toast.error("Login failed. Please check your credentials and try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.")
      console.error("Error during login:", error)
    }
  }

  return (
    <Row className="m-0 justify-content-center">
      <Col sm="8" xl="7" lg="10" md="8" className="d-flex justify-content-center">
        <Modal
          isOpen={true}
          toggle={() => { }}
          className="modal-dialog-centered modal-sm login-form"
          fade={false}
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <div className={"align-center"}>
                      <img src={shilpa} alt={"."} className={"bcon-off-logo-reg"} style={{ width: "50%", height: "50%" }} />
                    </div>
                    <Form onSubmit={e => e.preventDefault()} className={"mt-1"}>
                      {errorMessage && (
                        <div className="text-danger mb-2">
                          {errorMessage}
                        </div>
                      )}
                      <FormGroup className="form-label-group position-relative not-has-icon-left">
                        <Input
                          type="text"
                          placeholder="Mobile"
                          onChange={(e) => { setUsername(e.target.value) }}
                        />
                        <Label>Mobile</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative not-has-icon-left">
                        <Input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <Label>Password</Label>
                      </FormGroup>

                      <div className="d-flex justify-content-center center signin-btn-wrapper mt-3">
                        <Button.Ripple color="primary" type="submit" className={"cmn-gradient-bg signin-btn"} onClick={handleLogin}>
                          Login
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Modal>
      </Col>
    </Row>
  )
}

export default Login
