import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { LearningPath } from "../components/LearningPath";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <LearningPath />
      <Testimonials />
      <Footer />
    </main>
  );
}
