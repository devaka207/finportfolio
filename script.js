// Portfolio Data Management
const defaultData = {
    name: "Akshay Hegde",
    contact: {
        phone: "+91 9483280080",
        email: "akshayhegde19@gmail.com",
        linkedin: "linkedin.com/in/akshayhegde14",
        github: "Github"
    },
    description: "Product Manager with 3+ years of experience spearheading B2C fintech, B2B EV products. Proven track record in leading cross-functional teams to launch scalable innovative consumer products and API platforms at scale. Skilled in data-driven experimentation and leveraging LLMs/AI technologies to improve user acquisition and engagement.",
    experience: [
        {
            title: "Associate Product Manager",
            company: "Chara Technologies",
            location: "Bengaluru, KA",
            period: "Jan 2024 – Present",
            description: [
                "Led development of Cloud Analytics Platform for motors & controllers (Grafana + PrometheusDB); currently in user validation by 6 + OEM customers ,enabling real-time performance insights and reducing diagnostic turnaround time by 35%",
                "Managed cross-functional collaboration between hardware, firmware, and software teams to deliver integrated product experiences for cargo 3W and 2W OEMs . (VCU Less Architecture)",
                "Spearheaded customer acquisition (13 new + 1 major OEM) by aligning technical roadmap with business goals, improving revenue pipeline by 20% YoY"
            ]
        },
        {
            title: "Product Intern",
            company: "Sirma Business Consulting",
            location: "Bengaluru, KA",
            period: "Feb 2023 – Dec 2023",
            description: []
        },
        {
            title: "Product Intern",
            company: "Niro.money",
            location: "Bengaluru, KA",
            period: "Aug 2022 – Jan 2023",
            description: []
        }
    ],
    education: [
        {
            title: "Executive Fintech Programme",
            school: "IIM Bangalore",
            location: "Bengaluru, KA",
            period: "October 2025",
            courses: "Corporate Finance, Regulation, Lending, Insurance, Wealth Management, New Age Business Models, Sales 101, Marketing, Unit Economics, Compliance"
        },
        {
            title: "Product Management Launchpad",
            school: "Upraised",
            location: "Bengaluru, KA",
            period: "March 2025",
            courses: "Product Lifecycle, UX Basics, Data and Decision Making, Market Research, Detail Oriented, User stories, Product Presentation, GTM Strategy, Product Vision and Strategy, Problem-Solving, Customer-Centric Approach"
        },
        {
            title: "B.E. Telecommunication",
            school: "Dayanand Sagar College Of Engineering",
            location: "Bengaluru, KA",
            period: "August 2022",
            courses: "Electronics,Software Development,Presentations, Coding Clubs, Basics of Entrepreneurship and Management, Public Speaking, Leadership"
        }
    ],
    projects: [
        {
            title: "Slice Case Study",
            role: "",
            description: "Slice began by disrupting credit access for young Indians with its popular card, achieving Unicorn status. Following major RBI regulatory hurdles, the company strategically pivoted and merged with a small finance bank to gain a full banking license, securing long-term operational resilience and future expansion."
        },
        {
            title: "Code4Scranton",
            role: "Member",
            description: "Member of a regional nonprofit organization dedicated to creating mobile apps and websites for underfunded community organizations. Worked for 9 registered nonprofits."
        },
        {
            title: "Personal Finance App",
            role: "Personal Projects",
            description: "Published app on Google Play with 500+ installations to date."
        }
    ],
    skills: {
        skills: ["JIRA", "Notion", "Figma", "SQL", "Excel", "Python", "Power BI", "Cross-Functional Team Management", "Project Management"],
        languages: ["English (Fluent)", "Hindi (Fluent)", "Kannada (native)"]
    }
};

// Load data from localStorage or use default
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : defaultData;
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
}

// Render portfolio
function renderPortfolio() {
    const data = loadData();
    
    // Update name
    document.querySelector('.hero-name').textContent = data.name;
    
    // Update contact info
    const contactHTML = `
        <span><i class="fas fa-phone"></i> ${data.contact.phone}</span>
        <span><i class="fas fa-envelope"></i> ${data.contact.email}</span>
        <span><i class="fab fa-linkedin"></i> ${data.contact.linkedin}</span>
        <span><i class="fab fa-github"></i> ${data.contact.github}</span>
    `;
    document.querySelector('.contact-info').innerHTML = contactHTML;
    
    // Update description
    document.querySelector('.hero-description').textContent = data.description;
    
    // Render experience
    const experienceHTML = data.experience.map(exp => `
        <div class="experience-item">
            <div class="experience-header">
                <div>
                    <div class="experience-title">${exp.title}</div>
                    <div class="experience-company">${exp.company}</div>
                </div>
                <div class="experience-meta">
                    <div>${exp.location}</div>
                    <div>${exp.period}</div>
                </div>
            </div>
            ${exp.description.length > 0 ? `
                <div class="experience-description">
                    <ul>
                        ${exp.description.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
    document.querySelector('.experience-list').innerHTML = experienceHTML;
    
    // Render education
    const educationHTML = data.education.map(edu => `
        <div class="education-item">
            <div class="education-title">${edu.title}</div>
            <div class="education-school">${edu.school}</div>
            <div class="education-meta">${edu.location} | ${edu.period}</div>
            <div class="education-courses">
                <h4>Relevant Courses:</h4>
                <p>${edu.courses}</p>
            </div>
        </div>
    `).join('');
    document.querySelector('.education-list').innerHTML = educationHTML;
    
    // Render projects
    const projectsHTML = data.projects.map(project => `
        <div class="project-item">
            <div class="project-title">${project.title}</div>
            ${project.role ? `<div class="project-role">${project.role}</div>` : ''}
            <div class="project-description">${project.description}</div>
        </div>
    `).join('');
    document.querySelector('.projects-grid').innerHTML = projectsHTML;
    
    // Render skills
    const skillsHTML = `
        <div class="skills-section">
            <h3>Skills</h3>
            <div class="skills-list">
                ${data.skills.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        <div class="skills-section">
            <h3>Languages</h3>
            <div class="skills-list">
                ${data.skills.languages.map(lang => `<span class="skill-tag language-tag">${lang}</span>`).join('')}
            </div>
        </div>
    `;
    document.querySelector('.skills-content').innerHTML = skillsHTML;
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
