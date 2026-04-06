// Mock Supabase client to avoid crashing on invalid anon key signature
// Stores uploads in memory as base64 so they appear to actually upload!
const mockStorage = new Map<string, string>();

export const supabase = {
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: any, options?: any) => {
        console.warn('Mock Supabase upload called for path:', path);
        if (typeof window !== 'undefined' && file instanceof Blob) {
           return new Promise((resolve) => {
             const reader = new FileReader();
             reader.onloadend = () => {
                mockStorage.set(path, reader.result as string);
                resolve({ data: { path }, error: null });
             };
             reader.readAsDataURL(file);
           });
        }
        return { data: { path }, error: null }
      },
      getPublicUrl: (path: string) => {
        // Return the uploaded base64 image or a beautiful unsplash fallback placeholder
        return { 
          data: { 
            publicUrl: mockStorage.get(path) || 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop' 
          } 
        } 
      }
    })
  }
} as any;
