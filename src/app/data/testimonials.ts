export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Since meeting with Web Balance around two years ago, we no longer think of them as our Web Developers, we think of them as our Business Partners. Web Balance have completely changed the way our Website, Social Media Campaigns and On-Line Marketing are presented. We now have a constant flow of traffic from all over the UK contacting us and the future is very exciting. This is without any doubt, down to them, they listened to us, made decisions based on what we wanted and then added their experience into the mix. It worked and continues to work and we cannot recommend them highly enough.",
    name: "Craig Fraser",
    title: "Director",
    company: "Granite Elite",
    featured: true,
  },
  {
    id: 2,
    quote: "I fully recommend Web Balance. Always helpful, things are never a problem, they know what they are doing and make a great job of doing it.",
    name: "CT Scott",
    title: "Owner",
    company: "CT Scott",
  },
  {
    id: 3,
    quote: "Thanks again to Web Balance. Great service and a quick turnaround too. Very happy with the new website. I wouldn't hesitate to recommend.",
    name: "Scott Kelly",
    title: "Owner",
    company: "KLY ELECTRICAL",
  },
  {
    id: 4,
    quote: "Web Balance helped us to create, develop and design our new company website. The experience was straightforward, well organised and the team was extremely helpful and generous with their time and knowledge to ensure I was happy with the finished product.",
    name: "Diane Stewart",
    title: "HR Director",
    company: "It's a People Business",
  },
  {
    id: 5,
    quote: "Web Balance were really helpful in getting my new website up and running. The whole process was very straightforward, and I am really happy with the final result. The professional and technical advice that I was given along the way was invaluable.",
    name: "Robert Trythall",
    title: "Client",
    company: "Robert Trythall",
  },
  {
    id: 6,
    quote: "A big thanks to the Web Balance team, I was having a few internet problems and one chat to Peter and it was all fixed in no time at all. Wealth of knowledge behind him and takes the time to explain everything and make it simple to understand.",
    name: "Colin Cross",
    title: "Managing Director",
    company: "Trusted Trades Group",
  },
  {
    id: 7,
    quote: "Having received excellent service the first time I worked with Web Balance, I immediately went back to them when I needed further support. I have no hesitation in recommending Web Balance for their technical capability, high level of customer service, and attention to detail.",
    name: "Dawn Brown",
    title: "Owner",
    company: "People Development Coaching LTD",
  },
];
