import { useEffect, useState } from 'react';
import JobForm from '../../components/admin/JobForm';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchJobBySlug, updateJob } from '../../lib/api/index';

export default function AdminJobEditPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [job, setJob] = useState<any>(null);
    // const [loading, setLoading] = useState(true); // Loading state if needed for specific UI loaders

    useEffect(() => {
        async function loadJob() {
            if (!slug) return;
            try {
                const data = await fetchJobBySlug(slug);
                setJob(data);
            } catch (err) {
                console.error("Error fetching job", err);
            } finally {
                // setLoading(false);
            }
        }
        loadJob();
    }, [slug]);

    const handleUpdate = async (data: any) => {
        if (!job) return;
        try {
            await updateJob(job.id, data);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to update", err);
            alert("Failed to save changes");
        }
    };

    const handleCancel = () => {
        navigate('/admin');
    };

    if (!job) return <div>Job not found</div>;

    return (
        <div className="flex justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
            <JobForm title="Edit Job Posting" initialData={job} onSubmit={handleUpdate} onCancel={handleCancel} />
        </div>
    );
}
