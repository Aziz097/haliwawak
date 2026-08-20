CREATE INDEX "articles_status_published_at_idx" ON "articles" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "species_published_home_order_idx" ON "species" USING btree ("is_published","home_order");--> statement-breakpoint
CREATE INDEX "species_slug_idx" ON "species" USING btree ("slug");