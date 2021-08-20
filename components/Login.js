/** @format */

import Button from "@material-tailwind/react/Button";
import { signIn } from "next-auth/client";
function Login() {
  const logo =
    "https://www.dignited.com/wp-content/uploads/2020/04/Google-Docs-Header-1280x720-1-1024x576.png";
  return (
    <div className="w-1/3 mx-auto">
      <img src={logo} alt="" className="h-36 w-auto mx-auto mt-64" />
      <Button
        color="lightBlue"
        buttonType="filled"
        size="lg"
        rounded={false}
        block={true}
        iconOnly={false}
        ripple="light"
        onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  );
}

export default Login;
