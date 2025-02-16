-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
                                        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    project_url VARCHAR(255) NOT NULL,
    tech_stack JSON NOT NULL
    );

-- Education Table
CREATE TABLE IF NOT EXISTS education (
                                         id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT
    );

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
                                        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(255) NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
