
import { stats } from '../../data';

export default function Stats() {
    return (
        <section className="border-b border-[#e7edf4] bg-white dark:bg-[#101922] dark:border-gray-800">
            <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-20">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center">
                            <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
