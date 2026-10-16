import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-[104px] pb-24 text-center">
      <Container>
        <div className="mx-auto max-w-md space-y-6">
          <span className="eyebrow mx-auto justify-center">Error 404</span>
          <h1 className="page-h1 text-white">Page not found</h1>
          <p className="lead-text text-[rgba(226,233,255,0.74)]">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="pt-4">
            <Button variant="primary" href="/">
              Return to home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
