import { supabase } from '../supabaseClient';

// --- APPLICATIONS API ---

export async function uploadResume(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL (though bucket is private, we store the path usually, 
    // but if we want direct links we might need signed URLs. 
    // For this generic 'upload' let's return the key/path to store in DB).
    return filePath;
}

export async function submitApplication(applicationData: any) {
    const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function fetchApplications(filters?: any) {
    let query = supabase.from('applications').select(`
        *,
        jobs (title)
    `);

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('applied_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function fetchApplicationById(id: string) {
    const { data, error } = await supabase
        .from('applications')
        .select(`
            *,
            *,
            jobs (title, company_name, location, type, salary_range, description, is_featured, created_at),
            profiles (avatar_url)
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function updateApplicationStatus(id: string, status: string) {
    const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) throw error;
    return data;
}
