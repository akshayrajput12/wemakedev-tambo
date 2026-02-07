import { motion } from 'framer-motion';

export default function AboutTeam() {
    const team = [
        { name: "Sarah Jenkins", role: "Founder & CEO", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOEsMdc3sdw4MMPRxt7BFbiq3aHBXjTbE-ZI8h9Um4L3xr2A737uAZMqFeCe-IhWT23AdYvDkY1N0LCLUs006Ge_EoF_YadFoseRe9r5YJnsWTqwUhRh5_IEYmNmQ6rU2HNxW7ojHiZzDJCs6xOuZWATrD4HotiM6JSZkYb5gYyUbnhJYSVFIAichhMN1Ufo5bpVvnlSZeHJoShah6UGsP282No8P9-UY_qtvdkk_IB7bTBsXzUrhWDaMbmMsiiKPlg7dav09hX5Z3" },
        { name: "David Chen", role: "Head of Operations", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqgARUbHhOKZO4xILTrldb02KEhOQivf2LmeWj21CkeAbyAVqKkFImGA8H0kUAxGXlCU6Q0JcbrgqfWtFVGe9GOcF0iv73OEuppVKCaJSNtT3J7Nn3aKoq9qZImwNbR6CzJgWr8tEFP4Zs6MANnj6ob-Hvb7Rpvij5Q21CO-w3_hxNBco8AG7BMbbBMFBB-71qWYz_t-hg7g4jHnWXJi82xT7tDHySGO9MtggGYiw0TuLJhkIu-BiFWsQ3ZgxJ_mkIxadPn_rLWM7k" },
        { name: "Emily Rodriguez", role: "Chief Marketing Officer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyMpXda7TA9l6UGOtK3p5eAmiNM_BWoo4VtxuUotRtHc2N3O4fro1es555AszOkAyaIXsyoAPQvhtI2iC80cJoGb-ROqRN0-fViUsjsAdDteLqw0eFSP--ugr5GGa-Tkz8IjS0X-LWy17i9x3Ye7oAHdMCoxkah9xOut3FDI_rjDVvYUOT-81Xzw7rKynSb87D_goZZ0fgzUdDTPMY50lzz0WlMRhqmL9gEpOzVAEl505jpzEZEuqMvhpBwDeK_iG3yoBkOLB9IPcB" },
        { name: "Marcus Johnson", role: "CTO", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRT6Oyl0I14FcQ8vV7ohjIrkqF8RNLVQf-yc5OpVsrXILfEMsxcsAonCQnX08U7etl_6GDeEcODUnzhOXw_78Kkbq60G6mTQvaXa4pSWLpbCfmrORPYmgDVU5oKzxDedGaxTPu3czPff7Ofcgcm-JPEp1Smp3mgf1xIly7gNAs9qpx---bPuVK8yXJzqJMMS-yQuaGmIZeedchL3Lixcm227QSNlIYR2uwcVr_LjYZC80sGi7vKwqLFDsAaXr-QXhYfRh66IKplfMB" }
    ];

    return (
        <section className="bg-white dark:bg-background-dark py-20 lg:py-28 text-slate-dark dark:text-white transition-colors duration-300">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-bold tracking-wide text-primary uppercase mb-2">The People Behind TCD</h2>
                    <h3 className="text-3xl font-bold sm:text-4xl">Meet our leadership</h3>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        A diverse team of experts committed to excellence in recruitment.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl">
                                <img
                                    alt={member.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={member.img}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-4">
                                    <div className="flex gap-4">
                                        <a href="#" className="text-white hover:text-blue-400 transition-colors">
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-slate-dark dark:text-white">{member.name}</h4>
                            <p className="text-sm font-medium text-primary">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
