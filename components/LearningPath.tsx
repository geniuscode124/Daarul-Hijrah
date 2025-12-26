import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Foundations of Fiqh",
    description: "Master the fundamentals of Islamic jurisprudence with our beginner-friendly course.",
    image: "https://images.unsplash.com/photo-1531164659940-21e9011115f7?q=80&w=2670&auto=format&fit=crop", // Islamic Geometry
    link: "#",
  },
  {
    title: "Quranic Arabic",
    description: "Unlock the language of the Quran and deepen your understanding of its divine message.",
    image: "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?q=80&w=2670&auto=format&fit=crop", // Quran
    link: "#",
  },
  {
    title: "Seerah Studies",
    description: "Walk through the life of the Prophet Muhammad (PBUH) in this detailed and inspiring series.",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2670&auto=format&fit=crop", // Mosque
    link: "#",
  },
  {
    title: "Advanced Tajweed",
    description: "Perfect your recitation of the Quran with in-depth rules and expert, personalized guidance.",
    image: "https://images.unsplash.com/photo-1646229227468-ba6eb534d368?q=80&w=2670&auto=format&fit=crop", // Calligraphy
    link: "#",
  },
];

export function LearningPath() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Find Your <span className="text-accent">Learning Path</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Whether you're starting your journey or deepening your knowledge, we have a path for you.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
          {courses.map((course) => (
            <div key={course.title} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg">
              <div className="relative h-48 w-full">
                 <Image 
                    src={course.image} 
                    alt={course.title}
                    fill
                    className="object-cover"
                 />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-4 flex-auto text-base text-muted-foreground">
                  {course.description}
                </p>
                <div className="mt-6">
                  <Link 
                    href={course.link} 
                    className="flex items-center text-sm font-semibold leading-6 text-primary hover:text-accent transition-colors"
                  >
                    Explore Path <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
