import { useState } from "react";
import "./ResumeBuilder.css";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",
  technicalSkills: "",
  experiences: [
    {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  projects: [
    {
      name: "",
      technologies: "",
      link: "",
      description: "",
    },
  ],
  education: [
    {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
};

const steps = [
  "Personal Info",
  "Professional Summary",
  "Technical Skills",
  "Work Experience",
  "Projects",
  "Education",
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  if (!year || !month) return dateString;
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const formatDateRange = (start, end) => {
  if (!start && !end) return "";
  return [formatDate(start), formatDate(end)].filter(Boolean).join(" - ");
};

// --- Pure HTML/CSS Resume Template (Print Ready) ---
function ResumeTemplate({ data }) {
  const skills = data.technicalSkills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="resume-paper">
      {/* Header */}
      <div className="resume-header">
        <h1 className="resume-name">{data.fullName || "YOUR NAME"}</h1>
        
        <div className="resume-contact">
          {data.email && <span>{data.email}</span>}
          {data.email && (data.phone || data.location || data.linkedin || data.github) && <span className="separator">|</span>}
          
          {data.phone && <span>{data.phone}</span>}
          {data.phone && (data.location || data.linkedin || data.github) && <span className="separator">|</span>}
          
          {data.location && <span>{data.location}</span>}
          {data.location && (data.linkedin || data.github) && <span className="separator">|</span>}
          
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {data.linkedin && data.github && <span className="separator">|</span>}
          
          {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary.trim() && (
        <div className="resume-section">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="resume-paragraph">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="resume-skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="resume-skill-item">
                <span className="bullet">•</span> {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experiences.some((item) => item.company || item.position) && (
        <div className="resume-section">
          <h2 className="resume-section-title">Work Experience</h2>
          {data.experiences.map((item, index) => (
            <div key={index} className="resume-item">
              <div className="resume-item-header">
                <strong>{item.position}</strong>
                <span>{formatDateRange(item.startDate, item.endDate)}</span>
              </div>
              <div className="resume-item-subheader">
                <em>{item.company}</em>
                <span>{item.location}</span>
              </div>
              {item.description && (
                <p className="resume-item-desc">• {item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.some((item) => item.name || item.description) && (
        <div className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          {data.projects.map((item, index) => (
            <div key={index} className="resume-item">
              <div className="resume-item-header">
                <strong>{item.name}</strong>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="resume-link">
                    Link
                  </a>
                )}
              </div>
              {item.technologies && (
                <div className="resume-item-subheader">
                  <em>Tech Stack: {item.technologies}</em>
                </div>
              )}
              {item.description && (
                <p className="resume-item-desc">• {item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.some((item) => item.institution || item.degree) && (
        <div className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {data.education.map((item, index) => (
            <div key={index} className="resume-item">
              <div className="resume-item-header">
                <strong>
                  {item.degree} {item.field ? `in ${item.field}` : ""}
                </strong>
                <span>{formatDateRange(item.startDate, item.endDate)}</span>
              </div>
              <div className="resume-item-subheader">
                <em>{item.institution}</em>
              </div>
              {item.description && (
                <p className="resume-item-desc">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div className="rb-field">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}

function TextAreaField({ label, ...props }) {
  return (
    <div className="rb-field">
      <label>{label}</label>
      <textarea {...props} />
    </div>
  );
}

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (section, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handlePrint = () => {
    window.print();
  };

  // --- Form Renderers ---
  const renderPersonalInfo = () => (
    <div className="rb-form-grid">
      <Field label="Full Name" placeholder="e.g. John Doe" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
      <Field label="Email Address" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
      <Field label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
      <Field label="Location" placeholder="New York, NY" value={formData.location} onChange={(e) => updateField("location", e.target.value)} />
      <Field label="LinkedIn URL" type="url" placeholder="https://linkedin.com/in/yourname" value={formData.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} />
      <Field label="GitHub URL" type="url" placeholder="https://github.com/yourname" value={formData.github} onChange={(e) => updateField("github", e.target.value)} />
    </div>
  );

  const renderSummary = () => (
    <TextAreaField label="Professional Summary" rows={8} placeholder="Write a compelling professional summary..." value={formData.summary} onChange={(e) => updateField("summary", e.target.value)} />
  );

  const renderSkills = () => (
    <div className="rb-field">
      <label>Technical Skills</label>
      <textarea rows={5} placeholder="JavaScript, React, Node.js, Express.js, MongoDB..." value={formData.technicalSkills} onChange={(e) => updateField("technicalSkills", e.target.value)} />
      <span className="rb-helper">Separate each skill with a comma.</span>
    </div>
  );

  const renderExperience = () => (
    <div className="rb-dynamic-section">
      {formData.experiences.map((item, index) => (
        <div className="rb-entry-card" key={index}>
          <div className="rb-entry-heading">
            <h3>Experience {index + 1}</h3>
            {formData.experiences.length > 1 && (
              <button type="button" className="rb-remove-btn" onClick={() => removeArrayItem("experiences", index)}>Remove</button>
            )}
          </div>
          <div className="rb-form-grid">
            <Field label="Job Title" placeholder="Software Engineer" value={item.position} onChange={(e) => updateArrayField("experiences", index, "position", e.target.value)} />
            <Field label="Company" placeholder="Tech Corp" value={item.company} onChange={(e) => updateArrayField("experiences", index, "company", e.target.value)} />
            <Field label="Location" placeholder="City, State" value={item.location} onChange={(e) => updateArrayField("experiences", index, "location", e.target.value)} />
            <div className="rb-date-group">
              <Field label="Start Date" type="month" value={item.startDate} onChange={(e) => updateArrayField("experiences", index, "startDate", e.target.value)} />
              <Field label="End Date" type="month" value={item.endDate} onChange={(e) => updateArrayField("experiences", index, "endDate", e.target.value)} />
            </div>
          </div>
          <TextAreaField label="Responsibilities & Achievements" rows={4} placeholder="• Developed and maintained web applications..." value={item.description} onChange={(e) => updateArrayField("experiences", index, "description", e.target.value)} />
        </div>
      ))}
      <button type="button" className="rb-add-btn" onClick={() => addArrayItem("experiences", { company: "", position: "", location: "", startDate: "", endDate: "", description: "" })}>
        + Add Work Experience
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="rb-dynamic-section">
      {formData.projects.map((item, index) => (
        <div className="rb-entry-card" key={index}>
          <div className="rb-entry-heading">
            <h3>Project {index + 1}</h3>
            {formData.projects.length > 1 && (
              <button type="button" className="rb-remove-btn" onClick={() => removeArrayItem("projects", index)}>Remove</button>
            )}
          </div>
          <div className="rb-form-grid">
            <Field label="Project Name" placeholder="E-Commerce Platform" value={item.name} onChange={(e) => updateArrayField("projects", index, "name", e.target.value)} />
            <Field label="Technologies Used" placeholder="React, Node.js, PostgreSQL" value={item.technologies} onChange={(e) => updateArrayField("projects", index, "technologies", e.target.value)} />
            <div className="rb-full-width">
              <Field label="Project URL (Optional)" type="url" placeholder="https://github.com/..." value={item.link} onChange={(e) => updateArrayField("projects", index, "link", e.target.value)} />
            </div>
          </div>
          <TextAreaField label="Project Description" rows={3} placeholder="• Built a full-stack application..." value={item.description} onChange={(e) => updateArrayField("projects", index, "description", e.target.value)} />
        </div>
      ))}
      <button type="button" className="rb-add-btn" onClick={() => addArrayItem("projects", { name: "", technologies: "", link: "", description: "" })}>
        + Add Project
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="rb-dynamic-section">
      {formData.education.map((item, index) => (
        <div className="rb-entry-card" key={index}>
          <div className="rb-entry-heading">
            <h3>Education {index + 1}</h3>
            {formData.education.length > 1 && (
              <button type="button" className="rb-remove-btn" onClick={() => removeArrayItem("education", index)}>Remove</button>
            )}
          </div>
          <div className="rb-form-grid">
            <Field label="Institution" placeholder="University of Technology" value={item.institution} onChange={(e) => updateArrayField("education", index, "institution", e.target.value)} />
            <Field label="Degree" placeholder="B.Sc." value={item.degree} onChange={(e) => updateArrayField("education", index, "degree", e.target.value)} />
            <Field label="Field of Study" placeholder="Computer Science" value={item.field} onChange={(e) => updateArrayField("education", index, "field", e.target.value)} />
            <div className="rb-date-group">
              <Field label="Start Date" type="month" value={item.startDate} onChange={(e) => updateArrayField("education", index, "startDate", e.target.value)} />
              <Field label="End Date" type="month" value={item.endDate} onChange={(e) => updateArrayField("education", index, "endDate", e.target.value)} />
            </div>
          </div>
          <TextAreaField label="Additional Details (Optional)" rows={2} placeholder="GPA: 3.8/4.0, Dean's List..." value={item.description} onChange={(e) => updateArrayField("education", index, "description", e.target.value)} />
        </div>
      ))}
      <button type="button" className="rb-add-btn" onClick={() => addArrayItem("education", { institution: "", degree: "", field: "", startDate: "", endDate: "", description: "" })}>
        + Add Education
      </button>
    </div>
  );

  const stepContent = [renderPersonalInfo, renderSummary, renderSkills, renderExperience, renderProjects, renderEducation];

  if (isPreview) {
    return (
      <div className="rb-page rb-preview-page">
        <div className="rb-preview-toolbar">
          <div>
            <h1>Resume Preview</h1>
            <p>Review your resume. Click "Print / Save as PDF" to download.</p>
          </div>
          <div className="rb-preview-actions">
            <button type="button" className="rb-secondary-btn" onClick={() => setIsPreview(false)}>
              ← Back to Edit
            </button>
            <button type="button" className="rb-primary-btn" onClick={handlePrint}>
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>

        <div className="rb-pdf-container">
          {/* The resume template is rendered here */}
          <ResumeTemplate data={formData} />
        </div>
      </div>
    );
  }

  return (
    <div className="rb-page">
      <div className="rb-page-header">
        <div>
          <span className="rb-eyebrow">CAREER TOOLS</span>
          <h1>Resume Builder</h1>
          <p>Craft a professional, ATS-friendly resume in minutes.</p>
        </div>
      </div>

      <div className="rb-builder-card">
        <div className="rb-progress-section">
          <div className="rb-progress-top">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <strong>{progress}% Completed</strong>
          </div>
          <div className="rb-progress-track">
            <div className="rb-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="rb-step-indicators">
            {steps.map((step, index) => (
              <div key={step} className={`rb-step-indicator ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}>
                <span className="rb-step-number">{index < currentStep ? "✓" : index + 1}</span>
                <span className="rb-step-label">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rb-form-content">
          <div className="rb-section-heading">
            <span className="rb-section-count">STEP {currentStep + 1}</span>
            <h2>{steps[currentStep]}</h2>
            <p>
              {[
                "Enter your personal and contact information.",
                "Introduce yourself and highlight your professional strengths.",
                "Add the technical skills relevant to your career.",
                "Share your professional work history and achievements.",
                "Showcase projects that demonstrate your abilities.",
                "Add your academic background and qualifications.",
              ][currentStep]}
            </p>
          </div>
          {stepContent[currentStep]()}
        </div>

        <div className="rb-navigation">
          <button type="button" className="rb-secondary-btn" onClick={goPrevious} disabled={currentStep === 0}>
            ← Previous
          </button>
          <span className="rb-navigation-count">{currentStep + 1} / {steps.length}</span>
          {currentStep === steps.length - 1 ? (
            <button type="button" className="rb-primary-btn" onClick={() => setIsPreview(true)}>
              Preview Resume →
            </button>
          ) : (
            <button type="button" className="rb-primary-btn" onClick={goNext}>
              Next Step →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}