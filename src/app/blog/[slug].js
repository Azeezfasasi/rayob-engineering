import { useRouter } from "next/router";
import Image from "next/image";

// Example blog data, can later come from API or CMS
const blogPosts = [
  {
    slug: "innovations-in-civil-engineering",
    title: "Innovations in Civil Engineering",
    category: "Civil",
    image: "/images/blog-civil.jpg",
    content: `
      <p>Exploring new technologies in civil engineering that are shaping modern infrastructure.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    `,
  },
  {
    slug: "sustainable-industrial-design",
    title: "Sustainable Industrial Design",
    category: "Industrial",
    image: "/images/blog-industrial.jpg",
    content: `
      <p>How sustainable practices in industrial projects reduce costs and environmental impact.</p>
    `,
  },
  // Add more posts here
];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return <p>Loading...</p>;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <p>Post not found</p>;

  return (
    <div className="container mx-auto px-6 lg:px-20 py-16">
      <div className="mb-8">
        <span className="text-sm text-blue-600 font-semibold uppercase">{post.category}</span>
        <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
      </div>

      <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow-md">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      <div
        className="text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
