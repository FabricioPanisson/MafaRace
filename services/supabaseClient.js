import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tecjzyiwwhkewoxmojdq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2p6eWl3d2hrZXdveG1vamRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NjkxODQsImV4cCI6MjA0NzU0NTE4NH0.TKPj9Hh7mHTLCfqiIT36WM0vOFDDpL9sGhiskFN3q88';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});