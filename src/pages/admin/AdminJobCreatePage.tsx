import { useNavigate } from 'react-router-dom';
import { createJob } from '../../lib/api/index';
import JobForm from '../../components/admin/JobForm';

export default function AdminJobCreatePage() {
    const navigate = useNavigate();

    const handleCreate = async (data: any) => {
        try {
            // Map form data to Supabase schema
            // Just basic mapping for now, assuming form data matches loosely
            const jobPayload = {
                ...data,
                // Ensure certain required fields or defaults
                slug: data.title.toLowerCase().replace(/ /g, '-') + '-' + Math.random().toString(36).substr(2, 5),
                status: 'draft', // Default to draft
                company_name: 'TechFlow Systems', // Hardcode default or add to form
                company_location: data.location || 'Remote',
                // Add other required fields with defaults if missing
            };

            await createJob(jobPayload);
            navigate('/admin');
        } catch (error) {
            console.error("Failed to create job", error);
            alert("Failed to create job");
        }
    };

    const handleCancel = () => {
        navigate('/admin');
    };

    return (
        <div className="flex justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
            <JobForm title="Create Job Posting" onSubmit={handleCreate} onCancel={handleCancel} />
        </div>
    );
}
