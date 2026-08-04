import React from 'react';
import { BlogPost } from '../../types';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag } from 'lucide-react';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-500 hover:text-[#00D4FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights & Innovation</span>
        </button>

        {/* Post Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-[#00D4FF] text-xs font-mono font-bold uppercase">
              {post.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] dark:text-white font-sans leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <User className="w-4 h-4 text-[#00D4FF]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-4 h-4 text-slate-400" />
              {post.date}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg h-80 sm:h-96">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Post Content */}
        <div className="bg-white dark:bg-[#112240] rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 font-sans text-base leading-relaxed">
          <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed italic border-l-4 border-[#00D4FF] pl-4 bg-slate-50 dark:bg-[#0A192F]/60 py-2">
            {post.excerpt}
          </p>

          <div className="space-y-4 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </section>
  );
};
