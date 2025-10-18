import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Large UI libraries
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover', '@radix-ui/react-select', '@radix-ui/react-tabs'],
          // Data fetching
          'query-vendor': ['@tanstack/react-query'],
          // Animations
          'motion-vendor': ['framer-motion'],
          // Forms and validation
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Date utilities
          'date-vendor': ['date-fns'],
          // Lottie animations
          'lottie-vendor': ['lottie-react'],
          // Admin pages
          'admin-pages': [
            './src/pages/admin/AdminDashboard',
            './src/pages/admin/Students',
            './src/pages/admin/Faculty',
            './src/pages/admin/Courses',
            './src/pages/admin/Attendance',
            './src/pages/admin/Exams',
            './src/pages/admin/Fees',
            './src/pages/admin/Reports',
            './src/pages/admin/Settings',
          ],
          // Faculty pages
          'faculty-pages': [
            './src/pages/faculty/FacultyDashboard',
            './src/pages/faculty/Courses',
            './src/pages/faculty/Attendance',
            './src/pages/faculty/Students',
            './src/pages/faculty/Marks',
            './src/pages/faculty/Profile',
          ],
          // Student pages
          'student-pages': [
            './src/pages/student/StudentDashboard',
            './src/pages/student/Profile',
            './src/pages/student/Attendance',
            './src/pages/student/Results',
            './src/pages/student/Fees',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
