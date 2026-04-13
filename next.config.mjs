/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Supabase and other ESM modules that might cause resolution issues
  transpilePackages: ["@supabase/supabase-js", "@supabase/postgrest-js", "@supabase/auth-js", "@supabase/functions-js", "@supabase/realtime-js", "@supabase/storage-js"],
  reactStrictMode: true,
};

export default nextConfig;
