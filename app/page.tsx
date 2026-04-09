import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { LearningPath } from "../components/LearningPath";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { getSession } from "@/lib/getSession";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header initialSession={session} />
      <Hero />
      <Features />
      <LearningPath />
      <Testimonials />
      <Footer />
    </main>
  );
}
