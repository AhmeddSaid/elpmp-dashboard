export const metadata = {
  title: {
    template: "%s | ELPMP Dashboard",
    default: "Login",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
