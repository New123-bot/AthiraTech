import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { Search, ChevronLeft, ChevronRight, BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';

interface BlogGridProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = ['ALL', 'ENGINEERING', 'SECURITY', 'INFRASTRUCTURE', 'RESEARCH', 'CASE STUDY'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0] || posts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching Screenshot 4 */}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A192F] dark:text-white font-sans tracking-tight">
            Insights & Innovation
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Explore the latest advancements in enterprise AI, machine learning architectures, and intelligent system integration from the Athira AI Team.
          </p>
        </div>

        {/* Controls: Search and Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0A192F] dark:bg-[#00D4FF] text-white dark:text-[#0A192F] shadow-sm'
                    : 'bg-white dark:bg-[#112240] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00D4FF]"
            />
          </div>
        </div>

        {/* Featured Post Banner */}
        {featuredPost && (
          <div
            onClick={() => onSelectPost(featuredPost)}
            className="group cursor-pointer bg-white dark:bg-[#112240] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:border-cyan-500/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden relative">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#0A192F]/80 backdrop-blur-md border border-cyan-500/30 text-[#00D4FF] text-xs font-mono font-bold px-3 py-1 rounded-md">
                FEATURED INSIGHT
              </span>
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span className="text-[#00D4FF] font-bold">{featuredPost.category}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans group-hover:text-[#00D4FF] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{featuredPost.author}</span>
                <span className="text-xs font-bold text-[#00D4FF] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Regular Blog Grid matching Screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group cursor-pointer bg-white dark:bg-[#112240]/80 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 right-3 bg-[#0A192F]/80 backdrop-blur-md text-[#00D4FF] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans group-hover:text-[#00D4FF] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                <span>{post.author}</span>
                <span className="text-[#00D4FF] group-hover:translate-x-1 transition-transform">Read →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls matching Screenshot 4 */}
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#0A192F] dark:bg-[#00D4FF] text-white dark:text-[#0A192F] font-mono text-xs font-bold flex items-center justify-center">
            1
          </button>
          <button className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
            2
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
