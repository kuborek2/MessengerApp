CREATE TYPE messanger_app.user_status AS ENUM ('online', 'offline', 'away');

DROP TABLE IF EXISTS messanger_app.user;
CREATE TABLE messanger_app.user(
    user_name VARCHAR(30) PRIMARY KEY NOT NULL UNIQUE,
    status messanger_app.user_status NOT NULL
);

DROP TABLE IF EXISTS messanger_app.message;
CREATE TABLE messanger_app.message(
    message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    sender VARCHAR(30) NOT NULL,
    receiver VARCHAR(30),
    content text NOT NULL,
    message_date timestamp,
    CONSTRAINT fk_sender
        FOREIGN KEY (sender)
            REFERENCES messanger_app.user(user_name),
	CONSTRAINT fk_receiver
        FOREIGN KEY (receiver)
            REFERENCES messanger_app.user(user_name)
);