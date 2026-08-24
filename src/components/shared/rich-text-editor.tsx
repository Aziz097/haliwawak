'use client';

import { useState, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImagePlus,
  Upload,
  LinkIcon,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'max-w-[400px] h-auto rounded-[1rem]',
        },
      }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
  });

  const insertImage = useCallback(
    (src: string) => {
      if (!editor || !src) return;
      editor.chain().focus().setImage({ src }).run();
      setShowImageModal(false);
      setImageUrl('');
    },
    [editor],
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        insertImage(data.url);
      } catch (err) {
        console.error('Image upload failed:', err);
      } finally {
        setUploading(false);
      }
    },
    [insertImage],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
      e.target.value = '';
    },
    [handleFileUpload],
  );

  if (!editor) return null;

  const ToolButton = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-[1rem] transition-colors ${active ? 'bg-kiosk-orange-600 text-white' : 'text-kiosk-ink-muted hover:bg-kiosk-orange-50'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-kiosk-orange-100 rounded-[1.618rem] overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 border-b border-kiosk-orange-100 bg-kiosk-bg">
        <ToolButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <Bold className="w-4 h-4" />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <Italic className="w-4 h-4" />
        </ToolButton>
        <span className="w-px h-6 bg-kiosk-orange-100 mx-1 self-center" />
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="w-4 h-4" />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 className="w-4 h-4" />
        </ToolButton>
        <span className="w-px h-6 bg-kiosk-orange-100 mx-1 self-center" />
        <ToolButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <List className="w-4 h-4" />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          <Quote className="w-4 h-4" />
        </ToolButton>
        <span className="w-px h-6 bg-kiosk-orange-100 mx-1 self-center" />
        <div className="relative">
          <ToolButton onClick={() => setShowImageModal(!showImageModal)} active={showImageModal}>
            <ImagePlus className="w-4 h-4" />
          </ToolButton>
          {showImageModal && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-[1.618rem] border border-kiosk-orange-100 shadow-lg w-72 p-3">
              <div className="flex gap-1 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm rounded-[1rem] transition-colors ${activeTab === 'upload' ? 'bg-kiosk-orange-600 text-white' : 'text-kiosk-ink-muted hover:bg-kiosk-orange-50'}`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('url')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm rounded-[1rem] transition-colors ${activeTab === 'url' ? 'bg-kiosk-orange-600 text-white' : 'text-kiosk-ink-muted hover:bg-kiosk-orange-50'}`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  Insert URL
                </button>
              </div>
              {activeTab === 'upload' ? (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-3 py-2 text-sm border-2 border-dashed border-kiosk-orange-200 rounded-[1rem] text-kiosk-ink-muted hover:border-kiosk-orange-600 hover:text-kiosk-orange-600 hover:bg-kiosk-orange-50 transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Click to select an image'}
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm bg-kiosk-bg border border-kiosk-orange-100 rounded-[1rem] text-kiosk-ink focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-all placeholder:text-kiosk-ink-muted"
                    onKeyDown={(e) => e.key === 'Enter' && insertImage(imageUrl)}
                  />
                  <button
                    type="button"
                    onClick={() => insertImage(imageUrl)}
                    disabled={!imageUrl}
                    className="px-3 py-1.5 text-sm bg-kiosk-orange-600 hover:bg-kiosk-orange-700 text-white rounded-[1rem] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Insert
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>
        <span className="w-px h-6 bg-kiosk-orange-100 mx-1 self-center" />
        <ToolButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </ToolButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
