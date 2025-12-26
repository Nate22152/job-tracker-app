import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import jobRoutes from './jobRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase (Use your actual URL and Key from Supabase settings)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// --- AUTH ROUTES (Simplified) ---

// Register: Create new Employee
app.post('/register', async (req, res) => {
    const { username, email, password, fname } = req.body;
    const { data, error } = await supabase
        .from('employees')
        .insert([{ username, email, password, fname }])
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Login: Verify Employee
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('email', email)
        .eq('password', password) // In production, use bcrypt.compare
        .single();

    if (error || !data) return res.status(401).json({ error: "Invalid credentials" });
    res.json(data);
});

// --- JOB ROUTES ---
app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));