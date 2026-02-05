import { supabase } from '../supabaseClient';
// import type { Job } from '../types/jobs';

// --- JOBS API ---

export async function fetchJobs() {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open') // Public only sees open jobs
        .order('posted_at', { ascending: false });

    if (error) throw error;

    // Transform to match front-end Job interface if necessary, 
    // but the DB schema is designed to be close. 
    // We might need to map 'company_name' to the nested structure if we keep the old Interface.
    // For now, let's just return raw data and update components to generic types.
    return data;
}

export async function fetchJobBySlug(slug: string) {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('slug', slug)
        .single();
    if (error) throw error;
    return data;
}

// Admin Jobs
export async function fetchAllJobsAdmin() {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function createJob(jobData: any) {
    const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateJob(id: string, jobData: any) {
    const { data, error } = await supabase
        .from('jobs')
        .update(jobData)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}
