import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 mt-auto">
      <MaxWidthWrapper className="text-center">
        <p>&copy; {new Date().getFullYear()} StudKits. All rights reserved.</p>
      </MaxWidthWrapper>
    </footer>
  );
}
