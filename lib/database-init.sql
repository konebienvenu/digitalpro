-- =================================================================
-- SCRIPT D'INITIALISATION DE LA BASE DE DONNÉES DIGITALPROLEARNING
-- =================================================================
-- Utilisez ce fichier pour initialiser votre base de données MySQL
-- Commande : mysql -u root -p < lib/database-init.sql

-- Création de la base de données
DROP DATABASE IF EXISTS digitalprolearning;
CREATE DATABASE digitalprolearning CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE digitalprolearning;

-- =================================================================
-- TABLE UTILISATEURS
-- =================================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    organization_type VARCHAR(50) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_created_at (created_at)
);

-- =================================================================
-- TABLE COMMANDES
-- =================================================================
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    organization_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NULL,
    site_type VARCHAR(50) NOT NULL,
    objectives TEXT NOT NULL,
    additional_info TEXT NULL,
    logo_url VARCHAR(500) NULL,
    status ENUM('pending', 'in-progress', 'completed', 'cancelled') DEFAULT 'pending',
    auto_progress_date DATETIME NULL,
    estimated_completion DATETIME NULL,
    monthly_price DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_site_type (site_type),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
);

-- =================================================================
-- TABLE SESSIONS UTILISATEURS
-- =================================================================
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(500) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- =================================================================
-- TABLE LOGS D'ACTIVITÉ
-- =================================================================
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id INT NULL,
    details JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource_type (resource_type),
    INDEX idx_created_at (created_at)
);

-- =================================================================
-- TABLE MESSAGES DE CONTACT
-- =================================================================
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- =================================================================
-- DONNÉES DE TEST (OPTIONNEL)
-- =================================================================

-- Insertion d'un administrateur par défaut
-- Mot de passe : admin123 (haché avec bcrypt)
INSERT INTO users (email, password_hash, first_name, last_name, organization_type, role, email_verified) 
VALUES (
    'admin@digitalprolearning.com', 
    '$2b$10$rBEQlKJH1nF8QgH6pVHdBeRLzGgGD8yOBwZQVF3pXfXrZMFGPqK2u', 
    'Admin', 
    'Système', 
    'education', 
    'admin', 
    TRUE
);

-- Insertion d'un utilisateur de test
-- Mot de passe : user123 (haché avec bcrypt)
INSERT INTO users (email, password_hash, first_name, last_name, organization_type, role, email_verified) 
VALUES (
    'test@example.com', 
    '$2b$10$rBEQlKJH1nF8QgH6pVHdBeRLzGgGD8yOBwZQVF3pXfXrZMFGPqK2u', 
    'Utilisateur', 
    'Test', 
    'business', 
    'user', 
    TRUE
);

-- Insertion de commandes de test
INSERT INTO orders (user_id, organization_name, contact_name, email, phone, site_type, objectives, status, monthly_price) 
VALUES 
(
    2, 
    'Entreprise Test', 
    'Jean Dupont', 
    'jean@test.com', 
    '+33123456789', 
    'corporate', 
    'Créer un site vitrine pour présenter nos services et attirer de nouveaux clients.',
    'pending',
    150.00
),
(
    2, 
    'Boutique en Ligne', 
    'Marie Martin', 
    'marie@boutique.com', 
    '+33987654321', 
    'ecommerce', 
    'Développer une boutique en ligne complète avec système de paiement et gestion des stocks.',
    'in-progress',
    299.00
),
(
    NULL, 
    'Association Caritative', 
    'Pierre Durand', 
    'pierre@association.org', 
    '+33555666777', 
    'portfolio', 
    'Site pour présenter nos actions et collecter des dons.',
    'completed',
    75.00
);

-- =================================================================
-- PROCÉDURES STOCKÉES UTILES
-- =================================================================

-- Procédure pour nettoyer les sessions expirées
DELIMITER //
CREATE PROCEDURE CleanExpiredSessions()
BEGIN
    DELETE FROM user_sessions WHERE expires_at < NOW();
END //
DELIMITER ;

-- Procédure pour obtenir les statistiques des commandes
DELIMITER //
CREATE PROCEDURE GetOrderStatistics()
BEGIN
    SELECT 
        COUNT(*) as total_orders,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as in_progress_orders,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_orders,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_orders,
        AVG(monthly_price) as average_price,
        SUM(monthly_price) as total_revenue
    FROM orders;
END //
DELIMITER ;

-- =================================================================
-- ÉVÉNEMENTS AUTOMATIQUES
-- =================================================================

-- Événement pour nettoyer automatiquement les sessions expirées
SET GLOBAL event_scheduler = ON;

CREATE EVENT clean_expired_sessions
ON SCHEDULE EVERY 1 HOUR
DO
    CALL CleanExpiredSessions();

-- =================================================================
-- VUES UTILES
-- =================================================================

-- Vue pour les commandes avec informations utilisateur
CREATE VIEW orders_with_users AS
SELECT 
    o.*,
    u.first_name as user_first_name,
    u.last_name as user_last_name,
    u.email as user_email
FROM orders o
LEFT JOIN users u ON o.user_id = u.id;

-- Vue pour les statistiques mensuelles
CREATE VIEW monthly_statistics AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as order_count,
    SUM(monthly_price) as revenue,
    AVG(monthly_price) as avg_price
FROM orders 
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- =================================================================
-- TRIGGERS
-- =================================================================

-- Trigger pour mettre à jour automatiquement le champ updated_at
DELIMITER //
CREATE TRIGGER update_orders_timestamp
    BEFORE UPDATE ON orders
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- =================================================================
-- PERMISSIONS ET SÉCURITÉ
-- =================================================================

-- Création d'un utilisateur spécifique pour l'application (optionnel)
-- Décommentez les lignes suivantes si vous voulez créer un utilisateur dédié
/*
CREATE USER 'digitalprolearning'@'localhost' IDENTIFIED BY 'votre_mot_de_passe_securise';
GRANT SELECT, INSERT, UPDATE, DELETE ON digitalprolearning.* TO 'digitalprolearning'@'localhost';
FLUSH PRIVILEGES;
*/

-- =================================================================
-- INFORMATIONS DE CONNEXION
-- =================================================================
/*
Variables d'environnement à configurer dans votre projet :

DB_HOST=localhost
DB_USER=root (ou digitalprolearning si vous avez créé l'utilisateur dédié)
DB_PASSWORD=votre_mot_de_passe
DB_NAME=digitalprolearning
DB_PORT=3306

Comptes de test créés :
- Admin : admin@digitalprolearning.com / admin123
- User : test@example.com / user123
*/

SELECT 'Base de données digitalprolearning initialisée avec succès !' as message;