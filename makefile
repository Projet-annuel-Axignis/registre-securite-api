.PHONY: init env start migrate

init: ## First-time project setup
	@make ascii
	@make env
	@make start
	@make migrate

ascii:
	@echo " _____                                                           _____ "
	@echo "( ___ )                                                         ( ___ )"
	@echo " |   |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|   | "
	@echo " |   |   ____                                                    |   | "
	@echo " |   |  | __ )  __ _ ___  ___                                    |   | "
	@echo " |   |  |  _ \ / _\` / __|/ _ \                                   |   | "
	@echo " |   |  | |_) | (_| \__ \  __/                                   |   | "
	@echo " |   |  |____/ \__,_|___/\___|                              _    |   | "
	@echo " |   |    /_/  __ _ _   _(_)_ __   ___ _ __ ___   ___ _ __ | |_  |   | "
	@echo " |   |   / _ \/ _\` | | | | | '_ \ / _ \ '_ \` _ \ / _ \ '_ \| __| |   | "
	@echo " |   |  |  __/ (_| | |_| | | |_) |  __/ | | | | |  __/ | | | |_  |   | "
	@echo " |   |   \___|\__, |\__,_|_| .__/ \___|_| |_| |_|\___|_| |_|\__| |   | "
	@echo " |   |  | |_ ___ |_|_| |__ |_|__ (_) __ _ _   _  ___             |   | "
	@echo " |   |  | __/ _ \/ __| '_ \| '_ \| |/ _\` | | | |/ _ \            |   | "
	@echo " |   |  | ||  __/ (__| | | | | | | | (_| | |_| |  __/            |   | "
	@echo " |   |   \__\___|\___|_| |_|_| |_|_|\__, |\__,_|\___|            |   | "
	@echo " |   |                                 |_|                       |   | "
	@echo " |___|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|___| "
	@echo "(_____)                                                         (_____)"

env:
	@if [ ! -f .env ]; then \
		echo "Creating .env from .env.sample..."; \
		cp .env.sample .env; \
		sed -i '' -e 's/POSTGRES_HOST=.*/POSTGRES_HOST=172.17.0.1/' .env || sed -i -e 's/POSTGRES_HOST=.*/POSTGRES_HOST=172.17.0.1/' .env; \
		sed -i '' -e 's/POSTGRES_PORT=.*/POSTGRES_PORT=5433/' .env || sed -i -e 's/POSTGRES_PORT=.*/POSTGRES_PORT=5433/' .env; \
		read -p "Enter POSTGRES_USER: " POSTGRES_USER_INPUT; \
		read -p "Enter POSTGRES_PASSWORD: " POSTGRES_PASSWORD_INPUT; \
		sed -i '' -e "s/POSTGRES_USER=.*/POSTGRES_USER=$$POSTGRES_USER_INPUT/" .env || sed -i -e "s/POSTGRES_USER=.*/POSTGRES_USER=$$POSTGRES_USER_INPUT/" .env; \
		sed -i '' -e "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$POSTGRES_PASSWORD_INPUT/" .env || sed -i -e "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$POSTGRES_PASSWORD_INPUT/" .env; \
	else \
		echo ".env already exists. Skipping creation."; \
	fi

start:
	@echo "Launching Docker containers..."
	@docker-compose up -d --build

migrate:
	@echo "Running database migrations..."
	@docker-compose exec app npm run migration:run

stop:
	@echo "Stop Docker containers..."
	@docker-compose down