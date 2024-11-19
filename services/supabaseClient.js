
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tecjzyiwwhkewoxmojdq.supabase.co'; // Substitua pela sua URL do Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2p6eWl3d2hrZXdveG1vamRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NjkxODQsImV4cCI6MjA0NzU0NTE4NH0.TKPj9Hh7mHTLCfqiIT36WM0vOFDDpL9sGhiskFN3q88'; // Substitua pela sua chave anônima

export const supabase = createClient(supabaseUrl, supabaseAnonKey);