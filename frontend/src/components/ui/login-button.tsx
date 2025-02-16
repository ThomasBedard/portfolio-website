import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full"
      onClick={() =>
        loginWithRedirect({ authorizationParams: { prompt: "login" } })
      }
    >
      Log In
      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
    </button>
  );
};

export default LoginButton;
