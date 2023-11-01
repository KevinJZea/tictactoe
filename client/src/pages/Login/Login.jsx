import { LoginForm } from '../../components/LoginForm/LoginForm';
import './Login.scss';

export function Login() {
  return (
    <div className="LoginPage">
      <LoginForm />
      <h4 className="LoginPage--note">
        <strong>Note:</strong> Your Privacy Matters! We want you to know that
        none of the data you enter here will be stored or retained. Your
        information will be securely deleted as soon as your session ends. We
        value your privacy and ensure a safe and enjoyable experience.
        Let&apos;s get started!
      </h4>
    </div>
  );
}
