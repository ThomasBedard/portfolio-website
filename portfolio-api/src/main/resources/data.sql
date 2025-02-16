-- Insert Projects Data
INSERT INTO projects (title, description, image_url, project_url, tech_stack) VALUES
('Pet Clinic Management System',
 'A comprehensive pet clinic management system allowing veterinarians to schedule appointments, track pet records, and manage billing.',
 '/images/pet_clinic.jpg',
 'https://github.com/ThomasBedard/petclinic',
 '["React", "Tailwind CSS", "Node.js", "PostgreSQL"]'),

('CCLEAN Service Hub',
 'An industrial cleaning company web app for managing services, employee schedules, and customer appointments.',
 '/images/cclean.jpg',
 'https://github.com/ThomasBedard/ccleaninc',
 '["Java", "Spring Boot", "MySQL", "Docker"]'),

('NeoScan AI - Brain MRI Classifier',
 'An AI-powered application that classifies brain MRI images to detect potential tumors using deep learning.',
 '/images/brain_mri.jpg',
 'https://github.com/ThomasBedard/NeoScan',
 '["Python", "TensorFlow", "FastAPI", "PostgreSQL"]');

-- Insert Education Data
INSERT INTO education (institution, degree, field_of_study, start_date, end_date, description) VALUES
('Champlain College',
 'Bachelor of Science',
 'Software Development',
 '2020-09-01',
 '2024-06-15',
 'Extensive coursework in web development, databases, AI, and cloud computing.'),

('MIT',
 'Professional Certificate',
 'Machine Learning & AI',
 '2023-01-10',
 '2023-06-30',
 'Completed an advanced certification in artificial intelligence, focusing on deep learning models and real-world applications.');

-- Insert Comments Data
INSERT INTO comments (user_id, comment_text) VALUES
('auth0|user123', 'The pet clinic app has a clean UI and excellent functionality.'),
('auth0|user456', 'The CCLEAN project is a great example of a well-structured enterprise application.'),
('auth0|user789', 'NeoScan AI is a fantastic AI application. The accuracy is impressive!');