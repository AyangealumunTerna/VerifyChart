import './BlogCard.css';

export default function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <img src={blog.image} alt={blog.title} />

      <div className="blog-content">
        <p className="meta">
          {blog.date} • {blog.readTime}
        </p>

        <h3>{blog.title}</h3>

        <a href="#" className="read-more">
          Read More →
        </a>
      </div>
    </article>
  );
}
