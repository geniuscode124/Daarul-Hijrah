const testimonials = [
  {
    body: "The Foundations of Fiqh course was exactly what I needed. The instructor was knowledgeable and the platform is so easy to use. Highly recommended!",
    author: {
      name: "Aisha R.",
      role: "Student, Level 1",
    },
  },
  {
    body: "I've tried other platforms, but Daarul-Hijrah stands out for its authentic content and supportive community. The live streams are fantastic.",
    author: {
      name: "Omar K.",
      role: "Student, Level 2",
    },
  },
  {
    body: "As someone with a busy schedule, the pre-recorded lectures have been a blessing. I can learn at my own pace without compromising on quality.",
    author: {
      name: "Fatima Z.",
      role: "Working Professional",
    },
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Loved by Learners <span className="text-accent">Worldwide</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Read what our students have to say about their experience on the Daarul-Hijrah platform.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author.name}
              className="flex flex-col justify-between bg-gray-50 p-8 rounded-2xl ring-1 ring-gray-200"
            >
              <blockquote className="text-lg italic leading-8 text-gray-900 border-l-4 border-accent pl-4 mb-6">
                "{testimonial.body}"
              </blockquote>
              <div className="flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </p>
                  <p className="text-muted-foreground">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
