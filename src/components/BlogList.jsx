import BlogCard from './BlogCard';
import "./styles/breakpoints.css";
import './BlogList.css';

import blog1 from '../assets/blog/blog1.png';
import blog2 from '../assets/blog/blog2.png';
import blog3 from '../assets/blog/blog3.png';

const blogs = [
  {
    id: 1,
    title: 'HOW TO DETECT FAKE VENDORS’ SOCIAL LINKS',
    date: 'Dec 12, 2023',
    readTime: '8 mins read',
    image: blog1,
  },
  {
    id: 2,
    title: 'HOW FAKE ONLINE VENDORS OPERATE',
    date: 'Nov 12, 2023',
    readTime: '8 mins read',
    image: blog2,
  },
  {
    id: 3,
    title: 'HOW FAKE SPONSORED ADS ARE DETECTED',
    date: 'Nov 12, 2023',
    readTime: '8 mins read',
    image: blog3,
  },
];

export default function BlogList() {
  return (
    <section className="blog-list">
      <h2>Latest <span id='blue'>Blog Posts</span></h2>
      <p className="subtitle">
        Be kept abreast with the latest trends on fraud and scam protection
      </p>

      <div className="blogs">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <button className="view-all">View all Blog Posts</button>
    </section>
  );
}
