import express from 'express';
import { supabase } from './server.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    const { employeeId } = req.query;
    if (!employeeId) return res.status(400).json({ error: "Missing employeeId" });

    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

router.post('/', async (req, res) => {
    const { employee_id, company_name, job_title, status, notes } = req.body;

    const { data, error } = await supabase
        .from('jobs')
        .insert([{ employee_id, company_name, job_title, status, notes }])
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const { data, error } = await supabase
        .from('jobs')
        .update({ status, notes })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
``
    const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Job application deleted" });
});

export default router;