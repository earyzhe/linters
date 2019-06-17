CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
	message VARCHAR(255),
	user_id INTEGER REFERENCES users(id) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

	