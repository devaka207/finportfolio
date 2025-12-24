// Admin Panel JavaScript

// Simple password hashing function
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
}

// Password Management
function getStoredPasswordHash() {
    return localStorage.getItem('adminPasswordHash');
}

function setStoredPasswordHash(hash) {
    localStorage.setItem('adminPasswordHash', hash);
}

function isAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

function setAuthenticated(value) {
    if (value) {
        sessionStorage.setItem('adminAuthenticated', 'true');
    } else {
        sessionStorage.removeItem('adminAuthenticated');
    }
}

function checkPasswordSetup() {
    const passwordHash = getStoredPasswordHash();
    if (!passwordHash) {
        // Show setup form
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('setup-form').style.display = 'block';
        return false;
    }
    return true;
}

function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value;
    const errorDiv = document.getElementById('login-error');

    if (!password) {
        errorDiv.textContent = 'Please enter a password';
        return;
    }

    const storedHash = getStoredPasswordHash();
    const inputHash = hashPassword(password);

    if (inputHash === storedHash) {
        setAuthenticated(true);
        showAdminPanel();
        passwordInput.value = '';
    } else {
        errorDiv.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function setPassword() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorDiv = document.getElementById('setup-error');

    if (!newPassword || !confirmPassword) {
        errorDiv.textContent = 'Please fill in all fields';
        return;
    }

    if (newPassword.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters long';
        return;
    }

    if (newPassword !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        return;
    }

    const passwordHash = hashPassword(newPassword);
    setStoredPasswordHash(passwordHash);
    setAuthenticated(true);
    showAdminPanel();
}

function showAdminPanel() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-container').style.display = 'block';
    loadAdminData();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        setAuthenticated(false);
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-container').style.display = 'none';
        document.getElementById('password-input').value = '';
        document.getElementById('login-error').textContent = '';
        // Show login form (not setup form)
        if (getStoredPasswordHash()) {
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('setup-form').style.display = 'none';
        }
    }
}

function showChangePassword() {
    document.getElementById('password-modal').style.display = 'flex';
    document.getElementById('current-password').value = '';
    document.getElementById('new-password-change').value = '';
    document.getElementById('confirm-password-change').value = '';
    document.getElementById('password-error').textContent = '';
}

function closeChangePassword() {
    document.getElementById('password-modal').style.display = 'none';
}

function updatePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password-change').value;
    const confirmPassword = document.getElementById('confirm-password-change').value;
    const errorDiv = document.getElementById('password-error');

    if (!currentPassword || !newPassword || !confirmPassword) {
        errorDiv.textContent = 'Please fill in all fields';
        return;
    }

    // Verify current password
    const storedHash = getStoredPasswordHash();
    const currentHash = hashPassword(currentPassword);

    if (currentHash !== storedHash) {
        errorDiv.textContent = 'Current password is incorrect';
        return;
    }

    if (newPassword.length < 6) {
        errorDiv.textContent = 'New password must be at least 6 characters long';
        return;
    }

    if (newPassword !== confirmPassword) {
        errorDiv.textContent = 'New passwords do not match';
        return;
    }

    // Update password
    const newHash = hashPassword(newPassword);
    setStoredPasswordHash(newHash);

    closeChangePassword();

    // Show success message
    const message = document.getElementById('save-message');
    message.className = 'save-message success';
    message.textContent = '✓ Password updated successfully!';

    setTimeout(() => {
        message.className = 'save-message';
    }, 3000);
}

// Handle Enter key in password fields
document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated
    if (isAuthenticated()) {
        showAdminPanel();
        return;
    }

    // Check if password is set up
    checkPasswordSetup();

    // Add Enter key listeners
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('confirm-password').focus();
            }
        });
    }

    const confirmPasswordInput = document.getElementById('confirm-password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                setPassword();
            }
        });
    }

    // Modal Enter key listeners
    const currentPasswordInput = document.getElementById('current-password');
    if (currentPasswordInput) {
        currentPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('new-password-change').focus();
            }
        });
    }

    const newPasswordChangeInput = document.getElementById('new-password-change');
    if (newPasswordChangeInput) {
        newPasswordChangeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('confirm-password-change').focus();
            }
        });
    }

    const confirmPasswordChangeInput = document.getElementById('confirm-password-change');
    if (confirmPasswordChangeInput) {
        confirmPasswordChangeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                updatePassword();
            }
        });
    }

    // Close modal on overlay click
    const modalOverlay = document.getElementById('password-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeChangePassword();
            }
        });
    }
});

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

let experienceCounter = 0;
let educationCounter = 0;
let projectCounter = 0;

// Load and display data
function loadAdminData() {
    const data = loadData();

    // Load personal info
    document.getElementById('name').value = data.name;
    document.getElementById('phone').value = data.contact.phone;
    document.getElementById('email').value = data.contact.email;
    document.getElementById('linkedin').value = data.contact.linkedin;
    document.getElementById('github').value = data.contact.github;
    document.getElementById('description').value = data.description;

    // Load experience
    renderExperiences(data.experience);

    // Load education
    renderEducations(data.education);

    // Load projects
    renderProjects(data.projects);

    // Load skills
    document.getElementById('skills').value = data.skills.skills.join(', ');
    document.getElementById('languages').value = data.skills.languages.join(', ');
}

function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : defaultData;
}

// Experience functions
function renderExperiences(experiences) {
    const container = document.getElementById('experience-container');
    experienceCounter = 0;
    container.innerHTML = '';
    experiences.forEach((exp, index) => {
        addExperienceItem(exp, index);
    });
}

function addExperience() {
    addExperienceItem({
        title: '',
        company: '',
        location: '',
        period: '',
        description: []
    }, experienceCounter);
    experienceCounter++;
}

function addExperienceItem(exp, index) {
    const container = document.getElementById('experience-container');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-card';
    itemDiv.id = `exp-${index}`;

    itemDiv.innerHTML = `
        <div class="item-card-header">
            <span class="item-card-title">Experience ${index + 1}</span>
            <button class="btn-delete" onclick="removeExperience(${index})"><i class="fas fa-trash"></i> Delete</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="form-control exp-title" value="${exp.title || ''}" placeholder="e.g., Product Manager">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="form-control exp-company" value="${exp.company || ''}" placeholder="e.g., Company Name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="form-control exp-location" value="${exp.location || ''}" placeholder="e.g., Bengaluru, KA">
            </div>
            <div class="form-group">
                <label>Period</label>
                <input type="text" class="form-control exp-period" value="${exp.period || ''}" placeholder="e.g., Jan 2024 – Present">
            </div>
        </div>
        <div class="bullet-list">
            <label>Description Points</label>
            <div id="exp-bullets-${index}"></div>
            <button type="button" class="btn-add-bullet" onclick="addExperienceBullet(${index})"><i class="fas fa-plus"></i> Add Point</button>
        </div>
    `;

    container.appendChild(itemDiv);

    // Render bullets
    const bulletsContainer = document.getElementById(`exp-bullets-${index}`);
    if (exp.description && exp.description.length > 0) {
        exp.description.forEach((bullet, bulletIndex) => {
            addExperienceBulletItem(index, bulletIndex, bullet);
        });
    }
}

function addExperienceBullet(expIndex) {
    const bulletsContainer = document.getElementById(`exp-bullets-${expIndex}`);
    const bulletIndex = bulletsContainer.children.length;
    addExperienceBulletItem(expIndex, bulletIndex, '');
}

function addExperienceBulletItem(expIndex, bulletIndex, value) {
    const bulletsContainer = document.getElementById(`exp-bullets-${expIndex}`);
    const bulletDiv = document.createElement('div');
    bulletDiv.className = 'bullet-item';
    bulletDiv.innerHTML = `
        <input type="text" class="form-control exp-bullet" value="${value || ''}" placeholder="Enter description point">
        <button type="button" class="btn-remove-bullet" onclick="removeExperienceBullet(${expIndex}, ${bulletIndex})"><i class="fas fa-times"></i></button>
    `;
    bulletsContainer.appendChild(bulletDiv);
}

function removeExperienceBullet(expIndex, bulletIndex) {
    const bulletsContainer = document.getElementById(`exp-bullets-${expIndex}`);
    bulletsContainer.children[bulletIndex].remove();
    // Re-index remaining bullets
    Array.from(bulletsContainer.children).forEach((child, index) => {
        child.querySelector('.btn-remove-bullet').setAttribute('onclick', `removeExperienceBullet(${expIndex}, ${index})`);
    });
}

function removeExperience(index) {
    document.getElementById(`exp-${index}`).remove();
}

// Education functions
function renderEducations(educations) {
    const container = document.getElementById('education-container');
    educationCounter = 0;
    container.innerHTML = '';
    educations.forEach((edu, index) => {
        addEducationItem(edu, index);
    });
}

function addEducation() {
    addEducationItem({
        title: '',
        school: '',
        location: '',
        period: '',
        courses: ''
    }, educationCounter);
    educationCounter++;
}

function addEducationItem(edu, index) {
    const container = document.getElementById('education-container');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-card';
    itemDiv.id = `edu-${index}`;

    itemDiv.innerHTML = `
        <div class="item-card-header">
            <span class="item-card-title">Education ${index + 1}</span>
            <button class="btn-delete" onclick="removeEducation(${index})"><i class="fas fa-trash"></i> Delete</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Degree/Program</label>
                <input type="text" class="form-control edu-title" value="${edu.title || ''}" placeholder="e.g., B.E. Computer Science">
            </div>
            <div class="form-group">
                <label>School/Institution</label>
                <input type="text" class="form-control edu-school" value="${edu.school || ''}" placeholder="e.g., University Name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="form-control edu-location" value="${edu.location || ''}" placeholder="e.g., Bengaluru, KA">
            </div>
            <div class="form-group">
                <label>Period</label>
                <input type="text" class="form-control edu-period" value="${edu.period || ''}" placeholder="e.g., August 2022">
            </div>
        </div>
        <div class="form-group">
            <label>Relevant Courses (comma-separated)</label>
            <textarea class="form-control edu-courses" rows="3" placeholder="e.g., Course 1, Course 2, Course 3">${edu.courses || ''}</textarea>
        </div>
    `;

    container.appendChild(itemDiv);
}

function removeEducation(index) {
    document.getElementById(`edu-${index}`).remove();
}

// Project functions
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    projectCounter = 0;
    container.innerHTML = '';
    projects.forEach((project, index) => {
        addProjectItem(project, index);
    });
}

function addProject() {
    addProjectItem({
        title: '',
        role: '',
        description: ''
    }, projectCounter);
    projectCounter++;
}

function addProjectItem(project, index) {
    const container = document.getElementById('projects-container');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-card';
    itemDiv.id = `proj-${index}`;

    itemDiv.innerHTML = `
        <div class="item-card-header">
            <span class="item-card-title">Project ${index + 1}</span>
            <button class="btn-delete" onclick="removeProject(${index})"><i class="fas fa-trash"></i> Delete</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" class="form-control proj-title" value="${project.title || ''}" placeholder="e.g., Project Name">
            </div>
            <div class="form-group">
                <label>Role (optional)</label>
                <input type="text" class="form-control proj-role" value="${project.role || ''}" placeholder="e.g., Developer, Member">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control proj-description" rows="4" placeholder="Project description...">${project.description || ''}</textarea>
        </div>
    `;

    container.appendChild(itemDiv);
}

function removeProject(index) {
    document.getElementById(`proj-${index}`).remove();
}

// Save function
function savePortfolio() {
    const data = {
        name: document.getElementById('name').value,
        contact: {
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value
        },
        description: document.getElementById('description').value,
        experience: collectExperiences(),
        education: collectEducations(),
        projects: collectProjects(),
        skills: {
            skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s),
            languages: document.getElementById('languages').value.split(',').map(s => s.trim()).filter(s => s)
        }
    };

    try {
        // Save to localStorage
        localStorage.setItem('portfolioData', JSON.stringify(data));

        // Store timestamp for change detection
        localStorage.setItem('portfolioLastSaveTime', Date.now().toString());

        // Verify the save was successful
        const savedData = localStorage.getItem('portfolioData');
        const isSuccess = savedData !== null;

        // Console logging for debugging
        console.log('✓ Portfolio data saved to localStorage');
        console.log('Data structure:', data);
        console.log('localStorage key: portfolioData');
        console.log('Saved successfully:', isSuccess);

        const message = document.getElementById('save-message');
        message.className = 'save-message success';
        message.textContent = '✓ Portfolio saved successfully! Open the portfolio page to see changes.';

        setTimeout(() => {
            message.className = 'save-message';
        }, 5000);
    } catch (error) {
        console.error('✗ Error saving portfolio data:', error);

        const message = document.getElementById('save-message');
        message.className = 'save-message error';
        message.textContent = '✗ Error saving portfolio. Check console for details.';

        setTimeout(() => {
            message.className = 'save-message';
        }, 5000);
    }
}

function collectExperiences() {
    const experiences = [];
    const expCards = document.querySelectorAll('[id^="exp-"]');

    expCards.forEach((card, index) => {
        const bullets = Array.from(card.querySelectorAll('.exp-bullet')).map(input => input.value.trim()).filter(v => v);

        experiences.push({
            title: card.querySelector('.exp-title').value,
            company: card.querySelector('.exp-company').value,
            location: card.querySelector('.exp-location').value,
            period: card.querySelector('.exp-period').value,
            description: bullets
        });
    });

    return experiences;
}

function collectEducations() {
    const educations = [];
    const eduCards = document.querySelectorAll('[id^="edu-"]');

    eduCards.forEach(card => {
        educations.push({
            title: card.querySelector('.edu-title').value,
            school: card.querySelector('.edu-school').value,
            location: card.querySelector('.edu-location').value,
            period: card.querySelector('.edu-period').value,
            courses: card.querySelector('.edu-courses').value
        });
    });

    return educations;
}

function collectProjects() {
    const projects = [];
    const projCards = document.querySelectorAll('[id^="proj-"]');

    projCards.forEach(card => {
        projects.push({
            title: card.querySelector('.proj-title').value,
            role: card.querySelector('.proj-role').value,
            description: card.querySelector('.proj-description').value
        });
    });

    return projects;
}

function resetPortfolio() {
    if (confirm('Are you sure you want to reset to default data? This will overwrite all current changes.')) {
        localStorage.removeItem('portfolioData');
        loadAdminData();

        const message = document.getElementById('save-message');
        message.className = 'save-message success';
        message.textContent = '✓ Portfolio reset to default!';

        setTimeout(() => {
            message.className = 'save-message';
        }, 3000);
    }
}

// Note: Admin panel initialization is handled in the password check section above
