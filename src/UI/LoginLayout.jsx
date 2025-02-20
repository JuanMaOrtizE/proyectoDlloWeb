import Header from "./Header";

function LoginLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default LoginLayout;
