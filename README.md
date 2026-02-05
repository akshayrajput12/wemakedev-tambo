
# TCD MultiRecruit - Project Documentation

## **Overview**
TCD MultiRecruit is a comprehensive job recruitment platform designed to streamline the hiring process. It features a public-facing portal for job seekers to browse and apply for roles, and a robust admin dashboard for recruiters to manage job listings and applications.

---

## **Project Structure**

### **`src/` Directory**

#### **1. Components (`src/components/`)**
Reusable UI components organized by feature.

*   **`admin/`**: Components specific to the Admin Dashboard.
    *   `AdminSidebar.tsx`: The vertical navigation sidebar for the admin panel.
    *   `JobForm.tsx`: A shared form component for creating and editing job posts. Supports rich text inputs.
*   **`home/`**: Components for the Landing Page.
    *   `Hero.tsx`, `FeaturedJobs.tsx`, `Stats.tsx`, etc.
*   **`jobs/`**: Components for Job Listings.
    *   `JobCard.tsx`: Displays individual job summaries.
    *   `JobFilters.tsx`: Sidebar filters for job searching.
*   **`ui/`**: General purpose UI components.
    *   `RichTextEditor.tsx`: A simulated rich text editor (WYSIWYG) with a custom toolbar, matching the admin design requirements.
*   **`layout/`**:
    *   `Layout.tsx`: The main wrapper for public pages, including `Header` and `Footer`.
*   **`Header.tsx` & `Footer.tsx`**: Global navigation and footer.

#### **2. Data (`src/data/`)**
*   `jobs.ts`: Static data file serving as the "database" for job listings.
*   `applications.ts`: Mock data file for candidate applications used in the admin panel.

#### **3. Layouts (`src/layouts/`)**
*   `AdminLayout.tsx`: The layout wrapper for all `/admin` routes. It renders the `AdminSidebar` and a content area for admin pages. It does **not** include the public Header/Footer.

#### **4. Pages (`src/pages/`)**

**Public Pages:**
*   `HomePage.tsx`: The main landing page.
*   `JobsPage.tsx`: The searchable job board.
*   `JobDetailPage.tsx`: Detailed view of a specific job.
*   `JobApplyPage.tsx`: Application form for candidates.

**Admin Pages (`src/pages/admin/`):**
*   `AdminDashboardPage.tsx`: The main admin hub. Displays a list of jobs with management actions (Edit, Delete).
*   `AdminJobCreatePage.tsx`: Page to create a new job posting. Uses `JobForm`.
*   `AdminJobEditPage.tsx`: Page to edit an existing job. Uses `JobForm` pre-filled with data.
*   `AdminApplicationsPage.tsx`: A table view of all candidate applications with filtering capabilities.
*   `AdminApplicationReviewPage.tsx`: A detailed view for reviewing a specific candidate's application, including a mock PDF resume viewer and status management.

---

## **Workflows & Features**

### **1. Public Job Board**
*   **Browse**: Users can view featured jobs on the home page or browse the full list on `/jobs`.
*   **Filter**: Jobs can be filtered by type, level, and salary.
*   **Apply**: Users can click "Apply Now" to navigate to the application form (`/jobs/:slug/apply`), where they can submit their details and resume (mock submission).

### **2. Admin Dashboard (`/admin`)**
*   **Access**: Navigate to `/admin` to enter the portal.
*   **Job Management**:
    *   **List**: View all jobs with key metrics (Applicants, Status).
    *   **Create**: Click "Post New Job" to open the creation form.
    *   **Edit**: Click the "Edit" (pencil) icon on any job row.
*   **Application Tracking**:
    *   **List**: View all applications at `/admin/applications`.
    *   **Review**: Click "View Profile" to see candidate details, screening answers, and recruiter notes.
    *   **Status**: Change application status (e.g., from "New" to "Interview") directly from the review page.
*   **Rich Text Editing**: The job description fields use a custom-built, styled `RichTextEditor` component that provides a premium writing experience.

---

## **Technical Implementation Details**

*   **Routing**: Used `react-router-dom` with a split layout strategy. `PublicLayout` wraps public pages with the main website Header/Footer, while `AdminLayout` provides the dedicated admin sidebar interface.
*   **Styling**: Fully styled with `Tailwind CSS`, leveraging the `slate` color palette for a clean, professional look and supporting Dark Mode (`dark:` classes).
*   **Icons**: Integrated Google Material Symbols via CDN for consistent iconography across the platform.
*   **Forms**: React state-controlled forms are used for both job submission and creation/editing.

## **Running the Project**

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  **Open Browser**:
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

