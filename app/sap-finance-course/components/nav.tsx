type NavVariant = "dark" | "light" | "transparent";

export function Nav({ variant = "dark" }: { variant?: NavVariant }) {
  const bg =
    variant === "dark"
      ? "bg-koenig-navy"
      : variant === "light"
        ? "bg-white border-b border-koenig-border"
        : "bg-transparent absolute top-0 left-0 right-0 z-50";

  const text = variant === "light" ? "text-koenig-dark" : "text-white";
  const mutedText =
    variant === "light" ? "text-koenig-gray" : "text-white/70";

  return (
    <nav className={`${bg} px-6 py-4`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <div className={`text-xl font-bold tracking-tight ${text}`}>
            KOENIG{" "}
            <span className={`text-xs font-normal ${mutedText}`}>
              step forward
            </span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span
              className={`rounded-md bg-koenig-blue px-4 py-2 text-sm font-medium text-white`}
            >
              All Courses
            </span>
            <span className={`text-sm ${mutedText} cursor-pointer`}>
              Technologies
            </span>
            <span className={`text-sm ${mutedText} cursor-pointer`}>
              Vendors
            </span>
            <span className={`text-sm ${mutedText} cursor-pointer`}>
              About
            </span>
            <span className={`text-sm ${mutedText} cursor-pointer`}>
              Contact
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/60 md:block">
            Search courses...
          </div>
          <span
            className={`rounded-md border px-4 py-2 text-sm font-medium ${
              variant === "light"
                ? "border-koenig-blue text-koenig-blue"
                : "border-white/30 text-white"
            }`}
          >
            Login
          </span>
        </div>
      </div>
    </nav>
  );
}
