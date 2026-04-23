-- PROFESSIONAL SECURITY POLICY LAYER FOR CONNECT+
-- Resolves Supabase Security Advisor warnings regarding RLS and missing policies.

-- 1. ENABLE RLS ON ALL CORE TABLES
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Experience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Education" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Skill" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Comment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Reaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Repost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Connection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Follow" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JobApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ConversationParticipant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FeaturedItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Certification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VolunteerExperience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Honor" ENABLE ROW LEVEL SECURITY;

-- 2. USER PROFILE POLICIES
-- Anyone can view profiles, only owners can update.
CREATE POLICY "Public profiles are viewable by everyone" ON "User" FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON "User" FOR UPDATE USING (auth.uid()::text = id);

-- 3. PROFESSIONAL CONTENT POLICIES (Experience, Education, etc.)
-- Viewable by all, editable only by the owner.
CREATE POLICY "Experience viewable by everyone" ON "Experience" FOR SELECT USING (true);
CREATE POLICY "Users can manage their own experiences" ON "Experience" FOR ALL USING (auth.uid()::text = "userId");

CREATE POLICY "Education viewable by everyone" ON "Education" FOR SELECT USING (true);
CREATE POLICY "Users can manage their own education" ON "Education" FOR ALL USING (auth.uid()::text = "userId");

CREATE POLICY "Skills viewable by everyone" ON "Skill" FOR SELECT USING (true);
CREATE POLICY "Users can manage their own skills" ON "Skill" FOR ALL USING (auth.uid()::text = "userId");

-- 4. SOCIAL FEED POLICIES (Posts, Comments, Reactions)
CREATE POLICY "Posts viewable by everyone" ON "Post" FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON "Post" FOR INSERT WITH CHECK (auth.uid()::text = "authorId");
CREATE POLICY "Users can update/delete their own posts" ON "Post" FOR ALL USING (auth.uid()::text = "authorId");

CREATE POLICY "Comments viewable by everyone" ON "Comment" FOR SELECT USING (true);
CREATE POLICY "Users can manage their own comments" ON "Comment" FOR ALL USING (auth.uid()::text = "authorId");

CREATE POLICY "Reactions viewable by everyone" ON "Reaction" FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reactions" ON "Reaction" FOR ALL USING (auth.uid()::text = "userId");

-- 5. NOTIFICATION POLICIES
-- Only the recipient can see their notifications.
CREATE POLICY "Users can view their own notifications" ON "Notification" FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Users can update their own notifications" ON "Notification" FOR UPDATE USING (auth.uid()::text = "userId");

-- 6. CONNECTION & FOLLOW POLICIES
CREATE POLICY "Connections viewable by involved parties" ON "Connection" FOR SELECT USING (auth.uid()::text = "requesterId" OR auth.uid()::text = "addresseeId");
CREATE POLICY "Users can manage their own connections" ON "Connection" FOR ALL USING (auth.uid()::text = "requesterId");

-- 7. JOB & RECRUITMENT POLICIES
CREATE POLICY "Jobs viewable by everyone" ON "Job" FOR SELECT USING (true);
CREATE POLICY "Recruiters can manage their own jobs" ON "Job" FOR ALL USING (auth.uid()::text = "postedById");

CREATE POLICY "Applicants can view their own applications" ON "JobApplication" FOR SELECT USING (auth.uid()::text = "applicantId");
CREATE POLICY "Posters can view applications for their jobs" ON "JobApplication" FOR SELECT USING (
  EXISTS (SELECT 1 FROM "Job" WHERE "Job".id = "jobId" AND "Job"."postedById" = auth.uid()::text)
);
