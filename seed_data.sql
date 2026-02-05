
-- Insert Jobs
INSERT INTO public.jobs (
    id, slug, title, company_name, company_industry, company_size, 
    company_description, company_location, logo_url, banner_url,
    location, type, salary_range, status, 
    description, responsibilities, requirements, benefits,
    is_featured, level, deadline, job_code, posted_at, tags
) VALUES 
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'senior-ux-designer-techflow', 'Senior UX Designer', 'TechFlow Systems', 'FinTech', '500-1000 employees',
    'TechFlow is a leading financial technology company dedicated to simplifying banking for everyone. We build intuitive tools that empower millions to manage their money better.',
    'Bengaluru HQ', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpLmQZY0hnWVfqyGpHTPAf9algKwcXeUZJprNIiyUrd0OKlW41vW31kRWryFiOEeP0QKO9Xk7T5zM2Df3tFzBCNpXAYDUash2y56sb629oOgpCXdUKrhxTPvduv8ZPqttUTlm_ghyl2WGeQDK972kFcOWAIrK751O9sgEm7_SJZb5NYkV8Sq62ApgKctc-t9YWAJf64AGUPSOROszP2LK0Fso0qT7Xyr6L4F3KdTNb06n_lpQZYWZW6rHbZ9y80SZPdMK3-KHEWD3',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCtMrBXduUbS7YzcKytNyHlHVY0ntq6dkQEfpqKGxUStLp5_vvVh6Psnb-LPB41IBEFandOnAhD6w1nt9_YI5kskx9WsjZ1igscmYL1eQ62amUVEIJL0h1T4ls4tgSgyY1SyCjjQt_ZTIF6jaLYRVhSExvN9k3NTHFECPTChpGSaIEyCqtO2u0d7MYKKR9Idt_lNCBivXcEytGBGeAoudLrn7qRWxeg1H3-RjrDm5Dt98krR3aGua5sa9xzz8hYhMVm_t3cuVxwWi8q',
    'Bengaluru, India (Hybrid)', 'Full-time', '₹18L - ₹25L', 'open',
    '<p>We are looking for a Senior UX Designer to join our product design team. You will be responsible for defining the user experience for our core product suite. You will work closely with product managers and engineers to deliver high-quality designs that solve real user problems. The ideal candidate has a strong portfolio demonstrating end-to-end design process, from research to prototyping.</p>',
    '<ul><li>Lead design projects across the entire product lifecycle and multiple product launches.</li><li>Set the vision for the user experience and create the space for others to collaborate.</li><li>Produce multiple concepts and prototypes; knowing when to apply pixel-perfect attention to detail, and when to make low-fi sketches and prototypes.</li><li>Partner closely with engineering, product, and business folks to find elegant but practical solutions to design challenges.</li></ul>',
    '<ul><li>5+ years of experience in Product Design, UX Design, or Interaction Design.</li><li>A portfolio of work that contains examples of Interaction (UX) Design and Visual Systems Development.</li><li>Proficiency with Figma, Sketch, or Adobe XD.</li><li>Experience working with design systems and contributing to them.</li></ul>',
    '<ul><li>Full Healthcare</li><li>Competitive Salary</li><li>Unlimited PTO</li><li>Learning Budget</li></ul>',
    true, 'Senior Level', '2024-06-30', '#UXD-2409', NOW(), ARRAY['Design', 'Figma', 'UI/UX']
),
(
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'frontend-developer-creative-pulse', 'Frontend Developer', 'Creative Pulse', 'Design Agency', '50-200 employees',
    'Creative Pulse is a digital design agency that helps brands tell their stories through web and mobile experiences.',
    'Remote Distributed',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7tRGp0VRijfuNKDmzP75KmG5Ejfbl4Qg-McDEh_WSs0V-_YZxj3Th3mQY4DsolJZ_mETVM2-leCUsuSzwxR7LsW2asWZGGCgxbBW8vsif4xeeulUrtF9gWASeRtmxHqBals8iHw9oyHKyxy0g1ci0ZrGzSIXFlozXhgSJZvctTD01U-FArjYBA9xIBhmyDjk0Ryb1H_rY-qFwSn1imeqesqvtSgD3x1JE5_UooM1ayk1DCQ8F4ajPhCAdW5MLfgwqaXnc0Ul80gf',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7tRGp0VRijfuNKDmzP75KmG5Ejfbl4Qg-McDEh_WSs0V-_YZxj3Th3mQY4DsolJZ_mETVM2-leCUsuSzwxR7LsW2asWZGGCgxbBW8vsif4xeeulUrtF9gWASeRtmxHqBals8iHw9oyHKyxy0g1ci0ZrGzSIXFlozXhgSJZvctTD01U-FArjYBA9xIBhmyDjk0Ryb1H_rY-qFwSn1imeqesqvtSgD3x1JE5_UooM1ayk1DCQ8F4ajPhCAdW5MLfgwqaXnc0Ul80gf',
    'Remote', 'Contract', '₹12L - ₹18L', 'open',
    '<p>We are seeking a talented Frontend Developer to join our team on a contract basis. You will be building responsive, high-performance user interfaces using React and Tailwind CSS. You should have a keen eye for design and be passionate about creating seamless user experiences.</p>',
    '<ul><li>Develop new user-facing features using React.js.</li><li>Build reusable components and front-end libraries for future use.</li><li>Translate designs and wireframes into high quality code.</li><li>Optimize components for maximum performance across a vast array of web-capable devices and browsers.</li></ul>',
    '<ul><li>3+ years of experience with React.js and modern JavaScript workflows.</li><li>Strong proficiency in CSS and familiarity with Tailwind CSS.</li><li>Experience with common front-end development tools such as Babel, Webpack, NPM, etc.</li><li>Familiarity with code versioning tools such as Git.</li></ul>',
    '<ul><li>Flexible Hours</li><li>Remote Work</li><li>Performance Bonus</li></ul>',
    true, 'Mid Level', '2024-07-15', '#FED-2410', NOW(), ARRAY['React', 'Tailwind']
),
(
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'marketing-manager-growth-masters', 'Marketing Manager', 'Growth Masters', 'Marketing Technology', '200-500 employees',
    'Growth Masters provides AI-powered marketing tools to help businesses scale faster and more efficiently.',
    'Mumbai HQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuANVjcFCzFJEW5JsH7fcOHzeinNRMQxiyUW6uydzcrhyeizJ3zqzdB4Tn6HioUbcO0qWYmQPfdhLV8jVZt_z5tghjf6ZdjJim-6on01bzAWB13TPu_QlhxiQhcJ4nImbH2pUH6Kne_aCR5JzRXODEUVu9bqgWOtPD-Drhy_RgUJAfTCknV5ZgsdOSAFOiRxic1f7z4BDc7sWEgdDa9HQrCiioTZqmAlbyZ4TMhYtC6q4YfLsGBTgBZ2MWmuC-3xY8kti7XNTILbgoNg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuANVjcFCzFJEW5JsH7fcOHzeinNRMQxiyUW6uydzcrhyeizJ3zqzdB4Tn6HioUbcO0qWYmQPfdhLV8jVZt_z5tghjf6ZdjJim-6on01bzAWB13TPu_QlhxiQhcJ4nImbH2pUH6Kne_aCR5JzRXODEUVu9bqgWOtPD-Drhy_RgUJAfTCknV5ZgsdOSAFOiRxic1f7z4BDc7sWEgdDa9HQrCiioTZqmAlbyZ4TMhYtC6q4YfLsGBTgBZ2MWmuC-3xY8kti7XNTILbgoNg',
    'Mumbai, India', 'Full-time', '₹15L - ₹22L', 'open',
    '<p>Growth Masters is looking for a data-driven Marketing Manager to lead our growth initiatives. You will be responsible for developing and executing marketing strategies that drive user acquisition and retention. You will analyze market trends and user behavior to identify new opportunities for growth.</p>',
    '<ul><li>Develop and execute comprehensive marketing strategies.</li><li>Manage and optimize paid acquisition campaigns across multiple channels.</li><li>Analyze data to measure the effectiveness of marketing campaigns.</li><li>Collaborate with content and design teams to create compelling marketing assets.</li></ul>',
    '<ul><li>4+ years of experience in digital marketing or growth marketing.</li><li>Proven track record of managing successful marketing campaigns.</li><li>Stong analytical skills and proficiency with marketing analytics tools.</li><li>Excellent communication and project management skills.</li></ul>',
    '<ul><li>Health & Dental</li><li>401k Matching</li><li>Gym Stylpend</li><li>Annual Retreats</li></ul>',
    true, 'Mid-Senior Level', '2024-08-01', '#MKT-2411', NOW(), ARRAY['Marketing', 'SEO', 'Strategy']
),
(
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'product-manager-cloud-sync', 'Product Manager', 'Cloud Sync', 'SaaS', '100-300 employees',
    'Cloud Sync builds the next generation of cloud collaboration tools.',
    'San Francisco, USA', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCX42Xq86KkM8-tqNfQo_7nK7xY2eG8pQjR5zXwV4yH3B6kL9mN2vP1cO4jD7gS3lW8yF6hI5aT9uE0rK2oM5nJ8bV3xZ1qC4d7fL9pM6sR5wT2yH8vB1nK3jG6fD9hA2s',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCX42Xq86KkM8-tqNfQo_7nK7xY2eG8pQjR5zXwV4yH3B6kL9mN2vP1cO4jD7gS3lW8yF6hI5aT9uE0rK2oM5nJ8bV3xZ1qC4d7fL9pM6sR5wT2yH8vB1nK3jG6fD9hA2s',
    'San Francisco (Remote)', 'Full-time', '₹30L - ₹45L', 'open',
    '<p>We are looking for a Product Manager to lead our core product team.</p>',
    '<ul><li>Define product strategy and roadmap.</li><li>Work with engineering and design to deliver features.</li></ul>',
    '<ul><li>5+ years of PM experience.</li><li>Experience in SaaS.</li></ul>',
    '<ul><li>Equity</li><li>Health</li></ul>',
    true, 'Senior Level', '2024-09-01', '#PM-2412', NOW(), ARRAY['Product', 'SaaS', 'Strategy']
),
(
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'full-stack-engineer-blockchain-labs', 'Full Stack Engineer', 'Blockchain Labs', 'Crypto', '50-100 employees',
    'Blockchain Labs is pioneering decentralized finance solutions.',
    'Singapore',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD890123KjLnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKl',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD890123KjLnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKl',
    'Singapore (On-site)', 'Full-time', '₹25L - ₹40L', 'open',
    '<p>Join us to build the future of finance.</p>',
    '<ul><li>Build smart contracts and web interfaces.</li></ul>',
    '<ul><li>Experience with Solidity and React.</li></ul>',
    '<ul><li>Crypto bonuses</li></ul>',
    true, 'Mid Level', '2024-08-15', '#ENG-2413', NOW(), ARRAY['Blockchain', 'Full Stack', 'Solidity']
);

-- Note: We generally don't insert mock applications linked to random profiles as it might violate FK constraints if those profiles don't exist.
-- However, for guest applications where user_id IS NULL, we can insert:

INSERT INTO public.applications (
    job_id, candidate_name, candidate_email, candidate_location, experience_summary, resume_url, status, applied_at, expected_salary
) VALUES 
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Sarah Jenkins', 'sarah.j@example.com', 'London, UK', '6 Years', 
    'https://via.placeholder.com/150', 'review', NOW() - INTERVAL '2 days', '₹20L'
),
(
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Michael Chen', 'm.chen@example.com', 'New York, USA', '3 Years',
    'https://via.placeholder.com/150', 'interview', NOW() - INTERVAL '1 day', '₹15L'
);
