.PHONY: init env start migrate

init: ## First-time project setup
	@make ascii
	@make env
	@make start
	@make migrate
	@make create-user

ascii:
	@echo " _____                                                  _____ "
	@echo "( ___ )                                                ( ___ )"
	@echo " |   |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|   | "
	@echo " |   |                 _     _                  _       |   | "
	@echo " |   |  _ __ ___  __ _(_)___| |_ _ __ ___    __| | ___  |   | "
	@echo " |   | | '__/ _ \/ _\` | / __| __| '__/ _ \  / _\` |/ _ \ |   | "
	@echo " |   | | | |  __/ (_| | \__ \ |_| | |  __/ | (_| |  __/ |   | "
	@echo " |   | |_|  \___|\__, |_|___/\__|_|_ \___|  \__,_|\___| |   | "
	@echo " |   |  ___  /_/ |___/_   _ _ __(_) |_ /_/              |   | "
	@echo " |   | / __|/ _ \/ __| | | | '__| | __/ _ \             |   | "
	@echo " |   | \__ \  __/ (__| |_| | |  | | ||  __/             |   | "
	@echo " |   | |___/\___|\___|\__,_|_|  |_|\__\___|             |   | "
	@echo " |___|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|___| "
	@echo "(_____)                                                (_____)" 

env:
	@if [ ! -f .env ]; then \
		echo "Creating .env from .env.sample..."; \
		cp .env.sample .env; \
		read -p "Enter POSTGRES_USERNAME: " POSTGRES_USERNAME_INPUT; \
		read -p "Enter POSTGRES_PASSWORD: " POSTGRES_PASSWORD_INPUT; \
		POSTGRES_HOST="172.17.0.1"; \
		POSTGRES_PORT="5434"; \
		sed -i '' -e "s/POSTGRES_HOST=.*/POSTGRES_HOST=$$POSTGRES_HOST/" .env || sed -i -e "s/POSTGRES_HOST=.*/POSTGRES_HOST=$$POSTGRES_HOST/" .env; \
		sed -i '' -e "s/POSTGRES_PORT=.*/POSTGRES_PORT=$$POSTGRES_PORT/" .env || sed -i -e "s/POSTGRES_PORT=.*/POSTGRES_PORT=$$POSTGRES_PORT/" .env; \
		sed -i '' -e "s/POSTGRES_USERNAME=.*/POSTGRES_USERNAME=$$POSTGRES_USERNAME_INPUT/" .env || sed -i -e "s/POSTGRES_USERNAME=.*/POSTGRES_USERNAME=$$POSTGRES_USERNAME_INPUT/" .env; \
		sed -i '' -e "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$POSTGRES_PASSWORD_INPUT/" .env || sed -i -e "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$POSTGRES_PASSWORD_INPUT/" .env; \
		grep -q '^JWT_SECRET=' .env || echo "JWT_SECRET=$$(openssl rand -hex 32)" >> .env; \
	else \
		echo ".env already exists. Skipping creation."; \
	fi

start:
	@echo "Launching Docker containers..."
	@docker-compose up -d --build

migrate:
	@echo "Running database migrations..."
	@docker-compose exec app npm run migration:run

create-user:
	@echo "Creating initial user (via CLI script)..."
	@docker-compose exec app npm run create-user

stop:
	@echo "Stop Docker containers..."
	@docker-compose down