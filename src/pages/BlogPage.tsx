import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { BlogPost } from '../types';
import { Sparkles, Search, ArrowRight, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts, navigate } = useAgency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'AI & Engineering', 'Design Systems', 'Automation'];

  const filteredPosts = blogPosts.filter((post) => {
    if (!post.published) return false;
    if (selectedCat !== 'All' && post.category !== selectedCat) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6A2A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agency Intelligence & Technical Teardowns</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111318] tracking-tight">
          Engineering & Design Insights
        </h1>
        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          Architectural breakdowns of low-latency AI calling, zero-pill Swiss UI discipline, and high-concurrency event pipelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7E9ED]">
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F8FA] rounded-xl border border-[#E7E9ED]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-white text-[#111318] shadow-sm'
                  : 'text-[#737780] hover:text-[#111318]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#737780]" />
          <input
            type="text"
            placeholder="Search articles & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E7E9ED] bg-[#F7F8FA] focus:bg-white text-xs text-[#111318] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center text-xs text-[#737780] bg-[#F7F8FA] rounded-3xl">
          No articles match your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group bg-white rounded-3xl border border-[#E7E9ED] overflow-hidden hover:border-[#FF6A2A]/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#111318]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono text-white">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#737780]">
                    <span>{post.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-heading font-bold text-xl text-[#111318] group-hover:text-[#FF6A2A] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-[#737780] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E7E9ED] flex items-center justify-between text-xs font-semibold text-[#111318]">
                <div className="flex items-center gap-2 text-[#737780]">
                  <User className="w-3.5 h-3.5 text-[#FF6A2A]" />
                  <span>{post.author}</span>
                </div>
                <span className="text-[#FF6A2A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { blogPosts, navigate, addToast } = useAgency();

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <button
          onClick={() => navigate('/blog')}
          className="px-4 py-2 bg-[#111318] text-white rounded-xl text-xs"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Article link copied to clipboard', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#737780] hover:text-[#FF6A2A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles Archive</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6A2A]">
          <span className="uppercase tracking-wider">{post.category}</span>
          <span className="text-[#737780]">·</span>
          <span className="text-[#737780]">{post.readTime}</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111318] tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-4 border-y border-[#E7E9ED] py-3 text-xs text-[#737780]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#111318] text-[#FF6A2A] flex items-center justify-center font-bold font-heading">
              R
            </div>
            <div>
              <div className="font-bold text-[#111318]">{post.author}</div>
              <div className="text-[11px] text-[#737780]">{post.authorRole} · {post.publishedDate}</div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E9ED] hover:bg-[#F7F8FA] text-[#111318] font-medium"
          >
            <Share2 className="w-3.5 h-3.5 text-[#737780]" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-3xl overflow-hidden border border-[#E7E9ED] max-h-96">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Body */}
      <div className="prose prose-slate max-w-none text-base text-[#202124] leading-relaxed whitespace-pre-line space-y-4 font-sans">
        {post.content}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-[#E7E9ED] flex flex-wrap gap-2 text-xs">
        {post.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 rounded-lg bg-[#F7F8FA] border border-[#E7E9ED] font-mono text-[#737780]">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
