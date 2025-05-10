import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
