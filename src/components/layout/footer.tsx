export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ProjectPro. All rights reserved.</p>
      </div>
    </footer>
  );
}
