import { styles as s } from "./AuthLayout.styles";
import { AuthLayoutProps } from "./AuthLayout.types";

export default function AuthLayout({
  children,
  isSpaced = false,
}: AuthLayoutProps) {
  return (
    <div className={s().container()}>
      <div className={s().inner()}>
        <div className={s().content({ isSpaced })}>{children}</div>
      </div>
    </div>
  );
}
