// Mock Supabase client to avoid crashing on invalid anon key signature
export const supabase = {
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: any, options?: any) => {
        console.warn('Mock Supabase upload called for path:', path)
        return { data: { path }, error: null }
      },
      getPublicUrl: (path: string) => {
        return { data: { publicUrl: '/placeholder-avatar.jpg' } } 
      }
    })
  }
} as any;
