import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yryozeyqdkkjgfjimejo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW96ZXlxZGtramdmamltZWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMzI3NTMsImV4cCI6MjA0OTkwODc1M30.0xyWz1M5fERoT6ue4Y_9JYC-a4ST9vn5JA9BwYQdR4w';

export const supabase = createClient(supabaseUrl, supabaseKey);