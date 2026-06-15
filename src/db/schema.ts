import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').default('editor').notNull(), // super_admin, admin, editor
  isActive: boolean('is_active').default(true).notNull(),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// M2. Manajemen Spesies
export const species = pgTable('species', {
  id: serial('id').primaryKey(),
  commonName: text('common_name').notNull(),
  scientificName: text('scientific_name').notNull(),
  family: text('family').notNull(),
  order: text('order').default('Lepidoptera').notNull(),
  description: text('description'),
  characteristics: text('characteristics'),
  wingspan: text('wingspan'),
  dominantColors: jsonb('dominant_colors').default('[]').notNull(),
  hostPlants: jsonb('host_plants').default('[]').notNull(),
  pollinatedPlants: jsonb('pollinated_plants').default('[]').notNull(),
  ecosystemRole: text('ecosystem_role'),
  ecologyNotes: text('ecology_notes'),
  iucnStatus: text('iucn_status'),
  siteStatus: text('site_status'),
  activeMonths: jsonb('active_months').default('[]').notNull(),
  foundLocations: jsonb('found_locations').default('[]').notNull(),
  primaryPhotoUrl: text('primary_photo_url'),
  galleryUrls: jsonb('gallery_urls').default('[]').notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  // Public website fields (PRD v1.1.0)
  slug: text('slug'), // generated from commonName, enforced at app level
  featuredOnHome: boolean('featured_on_home').default(false).notNull(),
  homeOrder: integer('home_order').default(0).notNull(),
  discoveredAt: timestamp('discovered_at'),
  discoveredBy: text('discovered_by'),
  internalNotes: text('internal_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// M3. Manajemen Konten (Artikel)
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  category: text('category').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  content: text('content').notNull(),
  summary: text('summary'),
  tags: jsonb('tags').default('[]').notNull(),
  authorId: integer('author_id').references(() => accounts.id),
  status: text('status').default('draft').notNull(), // draft, review, active, archived
  publishedAt: timestamp('published_at'),
  scheduledAt: timestamp('scheduled_at'),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// M3b. Halaman Statis
export const staticPages = pgTable('static_pages', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(), // tentang-kami, cara-berkunjung, kontak, tiket
  content: text('content').notNull(),
  navOrder: integer('nav_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// M6. Pengaturan (key-value store)
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key').unique().notNull(),
  value: text('value'),
  group: text('group').default('umum').notNull(), // umum, seo, kiosk, backup
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Audit Log - Keamanan & Non-Fungsional
export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => accounts.id, { onDelete: 'set null' }),
  userName: text('user_name'),
  action: text('action').notNull(), // CREATE_ARTICLE, DELETE_SPECIES, LOGIN, etc.
  entity: text('entity'), // article, species, user, media, settings
  entityId: integer('entity_id'),
  detail: text('detail'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  url: text('url').notNull(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  width: integer('width'),
  height: integer('height'),
  // Metadata
  title: text('title'),
  altText: text('alt_text'),
  photographer: text('photographer'),
  category: text('category').default('Umum').notNull(), // Spesies, Kegiatan, Fasilitas Situs, Artefak, Umum
  tags: jsonb('tags').default('[]').notNull(),
  // Usage tracking (JSON arrays of ids)
  usedInArticles: jsonb('used_in_articles').default('[]').notNull(),
  usedInSpecies: jsonb('used_in_species').default('[]').notNull(),
  uploadedBy: integer('uploaded_by').references(() => accounts.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
