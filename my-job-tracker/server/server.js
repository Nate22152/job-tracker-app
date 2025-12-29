import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import jobRoutes from './jobRoutes.js';
import bcrypt from 'bcrypt';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);


// Registeration
app.post('/register', async (req, res) => {
    const { username, email, password, fname } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        
        const { data, error } = await supabase
        .from('employees')
        .insert([{ username, email, password: hashedPassword, fname }])
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
    }
    catch (err) {
        res.status(500).json({error: "Server error during registration" });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
        .from('employees')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    if (error || !user){
        return res.status(401).json({ error: "Invalid credentials" });
    } 
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

// --- JOB ROUTES ---
app.use('/jobs', jobRoutes);

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live on port ${PORT}`);
});