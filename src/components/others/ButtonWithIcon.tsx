import clsx from "clsx";
import Link from "next/link";

const baseStyles =
  "rounded-full border py-3.5 px-6 relative text-sm font-serif flex items-center text-center justify-center w-full duration-500 transition-colors outline-0";

export default function ButtonWithIcon({
  icon,
  href,
  onClick,
  children,
  className,
  iconClassName,
}: {
  icon?: any;
  href?: string;
  className?: string;
  onClick?: () => void;
  iconClassName?: string;
  children?: React.ReactNode;
}) {
  className = clsx(baseStyles, className);

  const ButtonIcon = icon;

  return href ? (
    <Link href={href} onClick={onClick} className={className}>
      {icon && (
        <ButtonIcon
          className={`h-6 w-6 absolute left-3.5 !shrink-0 ${iconClassName}`}
        />
      )}
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {icon && (
        <ButtonIcon
          className={`h-6 w-6 absolute left-3.5 !shrink-0 ${iconClassName}`}
        />
      )}
      {children}
    </button>
  );
}
