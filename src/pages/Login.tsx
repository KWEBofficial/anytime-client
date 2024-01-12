import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      Login, Introduction Page
      <div>
        <button onClick={() => navigate('/main')}>Login Success</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}
