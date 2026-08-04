import React, { useState } from 'react';
import { BlogPost, AgentSpec, ServicePlan } from '../../types';
import { Plus, Edit2, Trash2, Eye, FileText, Check, Sparkles, X } from 'lucide-react';

interface ContentEditorProps {
  posts: BlogPost[];
  agents: AgentSpec[];
  services: ServicePlan[];
  onCreatePost: (post: Partial<BlogPost>) => void;
  onUpdatePost: (id: number, post: Partial<BlogPost>) => void;
  onDeletePost: (id: number) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  posts,
  agents,
  services,
  onCreatePost,
  onUpdatePost,
  onDeletePost
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'agents' | 'services'>('posts');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [postFormData, setPostFormData] = useState({
    title: '',
    slug: '',
    category: 'ENGINEERING',
    excerpt: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read'
  });

  const handleOpenAddPost = () => {
    setEditingPost(null);
    setPostFormData({
      title: '',
      slug: '',
      category: 'ENGINEERING',
      excerpt: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      readTime: '5 min read'
    });
    setIsPostModalOpen(true);
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      readTime: post.readTime
    });
    setIsPostModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = postFormData.slug || postFormData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    if (editingPost) {
      onUpdatePost(editingPost.id, { ...postFormData, slug: generatedSlug });
    } else {
      onCreatePost({ ...postFormData, slug: generatedSlug });
    }
    setIsPostModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* CMS Mode Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
            Content & Entity CMS
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish blog articles, configure SDLC agent specs, and update pricing services.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'posts'
                ? 'bg-[#00D4FF] text-[#0A192F]'
                : 'bg-slate-100 dark:bg-[#112240] text-slate-600 dark:text-slate-400'
            }`}
          >
            Blog Articles ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'agents'
                ? 'bg-[#00D4FF] text-[#0A192F]'
                : 'bg-slate-100 dark:bg-[#112240] text-slate-600 dark:text-slate-400'
            }`}
          >
            SDLC Agents ({agents.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'services'
                ? 'bg-[#00D4FF] text-[#0A192F]'
                : 'bg-slate-100 dark:bg-[#112240] text-slate-600 dark:text-slate-400'
            }`}
          >
            Service Plans ({services.length})
          </button>
        </div>
      </div>

      {/* Blog Articles Management */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleOpenAddPost}
              className="px-4 py-2 rounded-lg bg-[#00D4FF] hover:bg-[#33DDFF] text-[#0A192F] font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{post.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] font-mono">{post.author}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditPost(post)}
                      className="p-1 text-slate-400 hover:text-[#00D4FF]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SDLC Agents Overview in CMS */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((ag) => (
            <div key={ag.id} className="bg-white dark:bg-[#112240] p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{ag.name}</h4>
                <span className="text-xs font-mono text-[#00D4FF] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {ag.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{ag.description}</p>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                Capabilities: {ag.capabilities.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Services Overview in CMS */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((srv) => (
            <div key={srv.id} className="bg-white dark:bg-[#112240] p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{srv.title}</h4>
                <span className="font-bold text-[#00D4FF]">{srv.price}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{srv.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0A192F] border border-slate-800 text-white rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-sans">
                {editingPost ? 'Edit Article' : 'Publish New Article'}
              </h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={postFormData.title}
                  onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                  className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Category</label>
                  <select
                    value={postFormData.category}
                    onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                    className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="ENGINEERING">ENGINEERING</option>
                    <option value="SECURITY">SECURITY</option>
                    <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
                    <option value="RESEARCH">RESEARCH</option>
                    <option value="CASE STUDY">CASE STUDY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Image URL</label>
                  <input
                    type="text"
                    value={postFormData.imageUrl}
                    onChange={(e) => setPostFormData({ ...postFormData, imageUrl: e.target.value })}
                    className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={postFormData.excerpt}
                  onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                  className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF] resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Markdown Article Content</label>
                <textarea
                  rows={6}
                  required
                  value={postFormData.content}
                  onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                  className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF] font-mono resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#00D4FF] text-[#0A192F] font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
