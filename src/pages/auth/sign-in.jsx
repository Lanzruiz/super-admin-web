import { useAuth } from '@/context/AuthContext';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_OFFICER } from '../../graphql/queries';
import Modal2 from '@/components/Modal2';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { state, dispatchAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [loginOfficer, { loading }] = useMutation(LOGIN_OFFICER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginOfficer({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const token = data.loginOfficer.token;
      const expirationTime = 3600 * 1000; // Set expiration time to 1 hour
      const expiryDate = new Date().getTime() + expirationTime;
      localStorage.setItem('token', token);
      localStorage.setItem('expiryDate', expiryDate); // Store expiry date in localStorage
      dispatchAuth({
        type: 'LOGIN',
        payload: { user: data.loginOfficer },
        isLoggedIn: true,
      });
      navigate('/violation-admin/violations-table', {
        state: { from: location.pathname },
      });
      setAutoLogout(expirationTime); // Set auto logout timer
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date().getTime() > expiryDate) {
      logoutHandler(); // Call logout function if token is expired
    } else {
      const remainingTime = expiryDate - new Date().getTime();
      setAutoLogout(remainingTime); // Set auto logout timer for remaining time
    }
  }, []);

  const setAutoLogout = (expirationTime) => {
    setTimeout(() => {
      logoutHandler(); // Call logout function after expiration time
    }, expirationTime);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    dispatchAuth({
      type: 'LOGOUT',
    });
  };

  const handleForgotPassword = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <section className="py-10 flex justify-center items-center h-screen ">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-primary">
          <div className=" flex justify-center flex-col items-center lg:mt-12 mt-6">
            <Typography variant="h5" className="font-bold mt-4 text-white">
              SmartCity Reserved Parking System
            </Typography>
            <Typography variant="h3" className="font-bold mt-4 text-white">
              Violation Management Web Portal
            </Typography>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary"></div>
        <div className="z-10 max-w-md md:w-full bg-white p-12 rounded-lg shadow-xl">
          <div className="text-left">
            <header className="bg-primary p-1 w-full rounded-lg flex content-center justify-around">
              <div className="h-[32] w-[60]  flex">
                {' '}
                <img
                  src="/img/whp_logo.png"
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <img src="/img/smart_parking_logo.png" alt="" />
              <div className="h-[32] w-[81] flex">
                <img
                  src="/img/smart_philippines_logo.png"
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </header>

            <Typography variant="h2" className="font-bold mt-4">
              Sign In
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-sm font-normal mb-6"
              style={{ color: 'gray' }}
            >
              Enter your email and password to Sign In.
            </Typography>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter your password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right mt-2">
              <Link
                className="font-medium text-primary"
                onClick={handleForgotPassword}
              >
                {' '}
                Forgot Password
              </Link>
            </div>

            <Button
              className="mt-6 bg-primary"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Sign In
            </Button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </section>
      <Modal2
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={'Forgot Password?'}
      >
        <div className="p-4">
          <Typography variant="h6" className="mb-2 font-semibold">
            Forgot Password?
          </Typography>
          <Typography variant="paragraph" className="mb-4">
            If you've forgotten your password, please contact the administrator
            to reset it.
          </Typography>
        </div>
      </Modal2>
    </div>
  );
}

export default SignIn;
