import { getLoginUrl } from "@/lib/auth";

interface OrcidButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function OrcidButton({
  size = "md",
  className = "",
}: OrcidButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-sm gap-2.5",
    lg: "px-8 py-3.5 text-base gap-3",
  };

  return (
    <a
      href={getLoginUrl()}
      className={`btn-orcid btn-3d shadow-3d inline-flex items-center rounded-xl font-semibold tracking-tight ${sizeClasses[size]} ${className}`}
    >
      {/* ORCID iD icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className={size === "sm" ? "w-4 h-4" : "w-5 h-5"}
        fill="currentColor"
      >
        <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#A6CE39" />
        <path
          d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 52.3c-5.4 0-9.9 4.4-9.9 9.9 0 5.4 4.4 9.9 9.9 9.9 5.4 0 9.9-4.4 9.9-9.9-.1-5.5-4.5-9.9-9.9-9.9zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 106 176 92.7 148.7 92.7h-24.4v79.7z"
          fill="#fff"
        />
      </svg>
      Sign in with ORCID
    </a>
  );
}
