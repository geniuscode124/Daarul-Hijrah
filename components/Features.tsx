import { Library, MessageSquare, Calendar, Mail } from "lucide-react";

const features = [
  {
    name: "Comprehensive Lecture Archives",
    description:
      "Access a vast library of recorded lectures to revisit lessons and deepen your understanding at any time.",
    icon: Library,
  },
  {
    name: "Interactive Q&A Forums",
    description:
      "Pose your questions to scholars and engage in thoughtful discussions with peers for clarified insights.",
    icon: MessageSquare,
  },
  {
    name: "Dynamic Event & Class Notifications",
    description:
      "Stay informed with timely reminders for upcoming lectures, workshops, and important announcements.",
    icon: Calendar,
  },
  {
    name: "Newsletter & Message Alerts",
    description:
      "Get instant notifications for new messages in your newsletter, keeping you updated on platform news.",
    icon: Mail,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            A Modern Madrasah <span className="text-accent">Experience</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Discover a robust learning ecosystem that integrates comprehensive lecture archives,
            interactive Q&A, and dynamic notifications for an enriched educational journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-green-100">
                  <feature.icon
                    className="h-8 w-8 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <dt className="text-xl font-bold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
