
import { successStories } from '../../data';

export default function Testimonials() {
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-100 text-blue-600';
            case 'green': return 'bg-green-100 text-green-600';
            case 'purple': return 'bg-purple-100 text-purple-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <section className="w-full bg-white py-16 lg:py-24 dark:bg-[#101922]">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-slate-dark dark:text-white sm:text-4xl">Success Stories</h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Hear from the candidates we've placed and the companies we've helped grow.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors dark:border-gray-700 dark:hover:bg-gray-800">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <button className="size-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:bg-primary/90 transition-colors dark:shadow-none">
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {successStories.map((story, index) => (
                        <div key={index} className="rounded-2xl bg-slate-50 p-8 dark:bg-[#1e293b]">
                            <div className="flex gap-1 text-amber-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-xl fill-current">star</span>
                                ))}
                            </div>
                            <blockquote className="text-lg font-medium text-slate-dark dark:text-white mb-6">
                                "{story.quote}"
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className={`size-12 rounded-full flex items-center justify-center font-bold text-xl ${getColorClasses(story.color)}`}>
                                    {story.initials}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-dark dark:text-white">{story.name}</div>
                                    <div className="text-sm text-gray-500">{story.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
