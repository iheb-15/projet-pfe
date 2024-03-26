import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './Authentification.css';
import Logo from './media/logo.png';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function CodeOTP() {
  const history = useHistory();
  // Renaming `code` to `otp` and `setCode` to `setOtp`
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleEnvoyerClick = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    try {
      const response = await axios.put('http://localhost:3002/api/reset-password-with-otp', {
        otp, 
        newPassword,
        email
      });

      if (response.status === 200) {
        toast.success('Password reset successfully, redirecting...',{
          position:'top-center',
        });
      
        setTimeout(() => history.push('/login'), 2000); // Redirect after a short delay for better user experience
      } else {
        toast.error('Unexpected response from server.',{
          position:'top-center',
        });
      }
    } catch (error) {
      toast.error('Failed to reset password. Please try again.',{
        position:'top-center',
      });
    }
  };

  const handleOtpChange = (event) => setOtp(event.target.value); // Renamed `handleCodeChange` to `handleOtpChange`
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  return (
    <>
      <Container fluid className="main">
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={3} className="sub-main">
            <div className="imgs">
              <div className="container-image">
                <img src={Logo} alt="logo" className="logo" />
              </div>
            </div>

            <Form onSubmit={handleEnvoyerClick}>
              <h4 className="title">REC-INOV</h4>

              <Form.Group>
                <div className="input-container">
                  <input
                    placeholder="Email"
                    className="input-field"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </Form.Group>

              {/* Updated placeholder text and changed `handleCodeChange` to `handleOtpChange` */}
              <Form.Group>
                <div className="input-container">
                  <input
                    placeholder="Enter OTP"
                    className="input-field"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <div className="input-container">
                <input
                    placeholder="New Password"
                    className="input-field"
                    type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  {/* Icône pour afficher/masquer le mot de passe */}
                  {showPassword ? (
                        <EyeTwoTone  className="password-toggle" onClick={() => setShowPassword(false)} />
                        ) : (
                        <EyeInvisibleOutlined  className="password-toggle" onClick={() => setShowPassword(true)} />
                      )}
                </div>
              </Form.Group>

              <button type="submit" className="login-btn">
                Envoyer
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" />
    </>
  );
}

export default CodeOTP;